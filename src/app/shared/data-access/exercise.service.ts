import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, filter, retry, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exercise, ExerciseType } from '../models/Exercise';
import { toObservable } from '@angular/core/rxjs-interop';

const ExerciseRoutes = {
  Default: `${environment.baseUrl}exercises`,
  Id: (id: number) => `${environment.baseUrl}exercises/${id}`,
} as const;

interface ExerciseState {
  exercises: Exercise[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);
  private http = inject(HttpClient);

  // sources
  exercises$ = this.getExercises().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
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
    this.exercises$.subscribe((exercises) =>
      this.state.update((state) => ({
        ...state,
        exercises,
      })),
    );

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
   * @param type - The type of the exercises to get. See {@link ExerciseType}. Defaults to {@link ExerciseType.All}.
   */
  getExercises(type?: ExerciseType) {
    let url = `${ExerciseRoutes.Default}?user_id=${this.authService.user()?.id}${type ? `&type=${type}` : ''}`;

    return this.http.get<Exercise[]>(url).pipe(
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
  postExercise(exercise: Exercise) {
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
}
