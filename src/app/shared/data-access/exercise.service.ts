import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
    catchError,
    exhaustMap,
    filter,
    map,
    Observable,
    of,
    retry,
    Subject,
    tap,
} from 'rxjs';
import { Exercise, Workout } from '../models/Workout';
import { environment } from '../../../environments/environment';

export type ExerciseType = 'standard' | 'custom' | 'all';

interface ExerciseState {
    exercises: Exercise[];
    error: string | null;
}

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    private authService = inject(AuthService);
    private http = inject(HttpClient);
    private authUser$ = toObservable(this.authService.user);

    exercises$ = this.getExercises().pipe(
        retry({
            delay: () => this.authUser$.pipe(filter((user) => !!user)),
        }),
        tap((exercises) => {
            console.log('Got exercises', exercises);
        }),
    );

    add$ = new Subject<Exercise>();
    delete$ = new Subject<number>();
    error$ = new Subject<string>();
    logout$ = this.authUser$.pipe(filter((user) => !user));

    // state
    private state = signal<ExerciseState>({
        exercises: [],
        error: null,
    });

    // selectors
    exercises = computed(() => this.state().exercises);
    error = computed(() => this.state().error);

    constructor() {
        // reducers
        this.exercises$.pipe(takeUntilDestroyed()).subscribe((exercises) =>
            this.state.update((state) => ({
                ...state,
                exercises,
            })),
        );

        this.add$
            .pipe(
                takeUntilDestroyed(),
                exhaustMap((exercise) => this.postExercise(exercise)),
            )
            .subscribe({
                error: (err) => {
                    console.log(err);
                    this.error$.next('Failed to add workout');
                },
            });

        this.delete$
            .pipe(
                takeUntilDestroyed(),
                exhaustMap((exercise) => this.deleteExerciseById(exercise)),
            )
            .subscribe({
                error: (err) => {
                    console.log(err);
                    this.error$.next('Failed to add workout');
                },
            });

        this.logout$
            .pipe(takeUntilDestroyed())
            .subscribe(() =>
                this.state.update((state) => ({ ...state, workouts: [] })),
            );

        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe((error) =>
                this.state.update((state) => ({ ...state, error })),
            );
    }

    getExercises(type?: ExerciseType): Observable<Exercise[]> {
        if (!this.authService.user()) {
            this.error$.next('User not authenticated');
            return of([]);
        }

        let url = `${environment.baseUrl}exercises?user_id=${this.authService.user()?.id}`;

        if (type) {
            url += `&type=${type}`;
        }

        return this.http.get(url).pipe(
            map((exercises: any) => exercises as Exercise[]),
            catchError(({ error }) => {
                this.error$.next(`Failed to get exercises: ${error}`);
                return of([]);
            }),
        );
    }

    postExercise(exercise: Exercise) {
        return this.http
            .post(`${environment.baseUrl}/exercises`, exercise)
            .pipe(
                tap((response) => {
                    console.log('Posted workout', response);
                }),
            );
    }

    getExerciseById(id: number) {
        if (!this.authService.user()) {
            this.error$.next('User not authenticated');
            return of([]);
        }

        return this.http.get(`${environment.baseUrl}exercises/${id}`).pipe(
            map((exercise: any) => exercise as Workout),
            tap((exercise) => {
                console.log('Got workouts', exercise);
            }),
            catchError((error) => {
                this.error$.next(`Failed to get workout: ${error}`);
                return of([]);
            }),
        );
    }

    deleteExerciseById(id: number) {
        return this.http.delete(`${environment.baseUrl}/exercises/${id}`).pipe(
            tap((response) => {
                console.log('Deleted exercise', response);
            }),
            catchError((error) => {
                this.error$.next(`Failed to delete exercise: ${error}`);
                return of([]);
            }),
        );
    }
}
