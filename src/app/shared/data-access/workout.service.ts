import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, EMPTY, exhaustMap, filter, map, Observable, retry, Subject, tap } from 'rxjs';
import { transformResponseToWorkout, Workout, WorkoutRequest, WorkoutResponse, WorkoutStatus } from '../models/Workout';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { WorkoutDetailsComponent } from '../../workout-details/workout-details.component';

const WorkoutRoutes = {
  Default: `${environment.baseUrl}workouts`,
  Id: (id: number) => `${environment.baseUrl}workouts/${id}`,
  Start: (id: number) => `${environment.baseUrl}workouts/${id}/start`,
  Finish: (id: number) => `${environment.baseUrl}workouts/${id}/finish`,
} as const;

interface WorkoutState {
  workouts: Workout[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private modalController = inject(ModalController);
  private toastController = inject(ToastController);
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);
  private http = inject(HttpClient);

  // sources
  workouts$ = this.getWorkouts().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );

  put$ = new Subject<WorkoutRequest>();
  delete$ = new Subject<number>();

  start$ = new Subject<number>();
  finish$ = new Subject<number>();

  error$ = new Subject<string | null>();

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
    this.workouts$
      .pipe(takeUntilDestroyed())
      .subscribe((workouts) =>
        this.state.update((state) => ({
          ...state,
          workouts,
        })),
      );

    this.put$
      .pipe(
        exhaustMap((workout) => this.putWorkout(workout)),
        takeUntilDestroyed(),
      )
      .subscribe((response) =>
        this.state.update((state) => ({
          ...state,
          workouts: state.workouts.find((workout) => workout.id === response.id) ? state.workouts.map((workout) => workout.id === response.id ? response : workout) : [...state.workouts, response],
        })),
      );

    this.delete$
      .pipe(
        exhaustMap((id) => this.deleteWorkoutById(id)),
        takeUntilDestroyed(),
      ).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        workouts: state.workouts.filter((workout) => workout.id !== id),
      })),
    );

    this.start$
      .pipe(
        exhaustMap((id) => this.startWorkout(id)),
        takeUntilDestroyed(),
      ).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        workouts: state.workouts.map((workout) => workout.id === id ? { ...workout, status: 'in_progress' } : workout),
      })),
    );


    this.finish$
      .pipe(
        exhaustMap((id) => this.finishWorkout(id)),
        takeUntilDestroyed(),
      ).subscribe((id) => {
        this.state.update((state) => ({
          ...state,
          workouts: state.workouts.map((workout) => workout.id === id ? { ...workout, status: 'completed' } : workout),
        }));
        this.openWorkoutDetailsModal(this.workouts().find((workout) => workout.id === id));
      },
    );

    this.logout$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, workouts: [] })));

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error) => {
        this.state.update((state) => ({ ...state, error }));
        if (error !== null) this.presentErrorToast();
      });
  }

  /**
   * Sends a GET request to the server to get all workouts.
   * @param status - The status of the workouts to get.
   */
  getWorkouts(status?: WorkoutStatus): Observable<Workout[]> {
    // Append the user ID and status, if provided, to the URL
    let url = `${WorkoutRoutes.Default}?user_id=${this.authService.user()?.id}${status ? `&status=${status}` : ''}`;

    return this.http.get<WorkoutResponse[]>(url).pipe(
      map((workouts) => workouts.map((workout) => transformResponseToWorkout(workout))),
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a PUT request to the server to create or update a workout.
   * @param workout - The workout to create or update.
   */
  putWorkout(workout: WorkoutRequest) {
    if (!workout.id) {
      const { id, ...rest } = workout;
      workout = rest;
    }

    // Fallback errors if the request is somehow invalid at this point
    if (!workout.name.match(/^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:\s[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/)) {
      this.error$.next('Nazwa treningu może zawierać tylko litery, cyfry i pojedyńcze spacje!');
      return EMPTY;
    }

    if (workout.exercises.some((exercise) => !exercise.exercise.exercise_name.match(/^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:\s[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/))) {
      this.error$.next('Nazwa ćwiczenia może zawierać tylko litery, cyfry i pojedyńcze spacje!');
      return EMPTY;
    }

    if (workout.exercises.some((exercise) => exercise.sets.some((set) => isNaN(set.reps) || isNaN(set.weight)))) {
      this.error$.next('Wartości serii muszą być liczbami!');
      return EMPTY;
    }

    if (workout.exercises.some((exercise) => exercise.sets.some((set) => set.reps <= 0 || set.weight < 0))) {
      this.error$.next('Wartości serii muszą być większe od 0!');
      return EMPTY;
    }
    
    if (workout.exercises.some((exercise) => exercise.sets.some((set) => set.reps === 0))) {
      this.error$.next('Seria nie może mieć 0 powtórzeń!');
      return EMPTY;
    }

    return this.http.put<WorkoutResponse>(WorkoutRoutes.Default, workout).pipe(
      map(transformResponseToWorkout),
      tap(() => this.error$.next(null)),
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a GET request to the server to get a workout by its ID.
   * @param id - The ID of the workout to get.
   */
  getWorkoutById(id: number) {
    return this.http.get<WorkoutResponse>(WorkoutRoutes.Id(id)).pipe(
      map(transformResponseToWorkout),
      tap(() => this.error$.next(null)),
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a DELETE request to the server to delete a workout by its ID.
   * @param id - The ID of the workout to delete.
   */
  deleteWorkoutById(id: number) {
    return this.http.delete(WorkoutRoutes.Id(id)).pipe(
      map(() => id),
      tap(() => this.error$.next(null)),
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a POST request to the server to start a workout by its ID.
   * @param id - The ID of the workout to start.
   */
  startWorkout(id: number) {
    return this.http.post(WorkoutRoutes.Start(id), {}).pipe(
      map(() => id),
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Sends a POST request to the server to finish a workout by its ID.
   * @param id - The ID of the workout to finish.
   */
  finishWorkout(id: number) {
    return this.http.post(WorkoutRoutes.Finish(id), {}).pipe(
      map(() => id),
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Opens the {@link WorkoutDetailsComponent} modal with the given workout.
   * @param workout - The workout to display in the modal.
   */
  async openWorkoutDetailsModal(workout?: Workout) {
    if (!workout) return;

    const modal = await this.modalController.create({
      component: WorkoutDetailsComponent,
      componentProps: { workout },
    });

    return await modal.present();
  }

  /**
   * Used to present a Toast with error message when {@link error$} emits a value.
   */
  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: `Wystąpił problem przy zapisywaniu treningu!`,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
      icon: 'alert-circle',
    });

    await toast.present();
  }

  /**
   * Used to present a Toast with success message when {@link error$} emits null.
   */
  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: `Pomyślnie zapisano trening!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle',
    });

    await toast.present();
  }
}
