import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, filter, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exercise, ExerciseStats, ExerciseType } from '../models/Exercise';
import { toObservable } from '@angular/core/rxjs-interop';
import { Muscle } from '../models/Muscle';
import { Equipment } from '../models/Equipment';

const ExerciseRoutes = {
  Default: `${environment.baseUrl}exercises`,
  Id: (id: number) => `${environment.baseUrl}exercises/${id}`,
} as const;

interface ExerciseState {
  exercises: Exercise[];
  error: string | null;
}

interface PostExercise {
  name: string;
  equipment: Equipment[];
  muscles: Muscle[];
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  // sources
  exercises$ = new Subject<Exercise>();
  add$ = new Subject<PostExercise>();
  delete$ = new Subject<number>();
  error$ = new Subject<string>();
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);
  logout$ = this.authUser$.pipe(filter((user) => !user));
  private http = inject(HttpClient);
  // state
  private state = signal<ExerciseState>({
    exercises: [],
    error: null,
  });

  // selectors
  exercises = computed(() => this.state().exercises);
  error = computed(() => this.state().error);

  constructor() {
    this.exercises$.subscribe((exercise) => {
      this.state.update((state) => ({
        ...state,
        activities: state.exercises.find((e) => e.exercise_id === exercise.exercise_id && e.exercise_type === e.exercise_type) ?
          state.exercises.map((e) => e.exercise_id === e.exercise_id && e.exercise_type === e.exercise_type ? exercise : e) : [...state.exercises, exercise],
      }));
    });

    this.add$.subscribe((exercise) => {
      this.postExercise(exercise).subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          exercises: [...state.exercises, response],
        }));
      });
    });

    this.delete$.subscribe((id) => {
      this.deleteExerciseById(id).subscribe(() => {
        this.state.update((state) => ({
          ...state,
          exercises: state.exercises.filter((exercise) => exercise.exercise_id !== id && exercise.exercise_type === ExerciseType.Custom),
        }));
      });
    });

    this.error$.subscribe((error) =>
      this.state.update((state) => ({
        ...state,
        error,
      })),
    );

    this.logout$.subscribe(() =>
      this.state.update((state) => ({ ...state, exercises: [] })),
    );
  }

  /**
   * Sends a GET request to the server to get all exercises.
   * @param offset
   * @param limit
   * @param name
   * @param type - The type of the exercises to get. See {@link ExerciseType}. Defaults to {@link ExerciseType.All}.
   */
  getExercises(offset?: number, limit?: number, name?: string, type?: ExerciseType) {
    let url = ExerciseRoutes.Default;

    const params = new URLSearchParams();

    if (offset) params.append('offset', offset.toString());
    if (limit) params.append('limit', limit.toString());
    if (name) params.append('name', name);
    if (type) params.append('type', type);

    url += `?${params.toString()}`;

    return this.http.get<Exercise[]>(url).pipe(
      tap((exercises) => exercises.forEach((exercise) => this.exercises$.next(exercise))),
      catchError((error) => {
        this.error$.next(`Error ${error.status}: ${error.statusText}. ${error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a POST request to the server to create an exercise.
   * @param exercise - The exercise to create.
   *
   * @remarks This is used to create a custom exercise tied to the user.
   */
  postExercise(exercise: PostExercise) {
    return this.http.post<Exercise>(ExerciseRoutes.Default, exercise).pipe(
      catchError((error) => {
        this.error$.next(`Error ${error.status}: ${error.statusText}. ${error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a GET request to the server to get an exercise by its ID.
   * @param id - The ID of the exercise to get.
   */
  getExerciseById(id: number) {
    return this.http.get<Exercise>(ExerciseRoutes.Id(id)).pipe(
      catchError((error) => {
        this.error$.next(`Error ${error.status}: ${error.statusText}. ${error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a DELETE request to the server to delete an exercise by its ID.
   * @param id - The ID of the exercise to delete.
   *
   * @remarks This is used to delete a custom exercise created by the user.
   */
  deleteExerciseById(id: number) {
    return this.http.delete(ExerciseRoutes.Id(id)).pipe(
      catchError((error) => {
        this.error$.next(`Error ${error.status}: ${error.statusText}. ${error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a GET request to the server to get the stats of an exercise by its ID.
   * @param id - The ID of the exercise to get the stats for.
   */
  getExerciseStats(id: number) {
    return this.authUser$.pipe(switchMap(
      (user) => user ?
        this.http.get<ExerciseStats>(`${environment.baseUrl}users/${user.id}/exercises/${id}/stats`).pipe(
          catchError((error) => {
            this.error$.next(`Error ${error.status}: ${error.statusText}. ${error.error}.`);
            return EMPTY;
          }),
        ) : EMPTY,
    ));
  }
}
