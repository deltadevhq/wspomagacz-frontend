import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { exhaustMap, filter, map, of, retry, Subject, tap } from 'rxjs';
import { Workout } from '../models/Workout';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface WorkoutState {
    workouts: Workout[];
    error: string | null;
}

@Injectable({
    providedIn: 'root',
})
export class WorkoutService {
    private authService = inject(AuthService);
    private http = inject(HttpClient);
    private authUser$ = toObservable(this.authService.user);

    workouts$ = this.getWorkouts().pipe(
        // restart stream when user reauthenticates
        retry({
            delay: () => this.authUser$.pipe(filter((user) => !!user)),
        }),
    );
    add$ = new Subject<Workout>();
    error$ = new Subject<string>();
    logout$ = this.authUser$.pipe(filter((user) => !user));

    // state
    private state = signal<WorkoutState>({
        workouts: [],
        error: null,
    });

    // selectors
    workouts = computed(() => this.state().workouts);
    error = computed(() => this.state().error);

    constructor() {
        // reducers
        this.workouts$.pipe(takeUntilDestroyed()).subscribe((workouts) =>
            this.state.update((state) => ({
                ...state,
                workouts,
            })),
        );

        this.add$
            .pipe(
                takeUntilDestroyed(),
                exhaustMap((workout) => this.postWorkout(workout)),
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

    private getWorkouts() {
        if (!this.authService.user()) {
            this.error$.next('User not authenticated');
            return of([]);
        }

        return this.http
            .get(
                `${environment.baseUrl}/users/${this.authService.user()?.id}/workouts`,
            )
            .pipe(
                map((response: any) => response.workouts),
                tap((response) => {
                    console.log('Got workouts', response);
                }),
            );
    }

    private postWorkout(workout: Workout) {
        return this.http.post(`${environment.baseUrl}/workouts`, workout).pipe(
            tap((response) => {
                console.log('Posted workout', response);
            }),
        );
    }

    private patchWorkout(workout: Workout) {
        return this.http
            .patch(`${environment.baseUrl}/workouts/${workout.id}`, workout)
            .pipe(
                tap((response) => {
                    console.log('Patched workout', response);
                }),
            );
    }
}
