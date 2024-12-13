import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, filter, retry, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Muscle } from '../models/Muscle';

const MuscleRoutes = {
  Default: `${environment.baseUrl}muscles`,
  Id: (id: number) => `${environment.baseUrl}muscles/${id}`,
} as const;

interface MuscleState {
  muscles: Muscle[];
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);
  private http = inject(HttpClient);

  // sources
  muscles$ = this.getMuscles().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );

  error$ = new Subject<string>();
  logout$ = this.authUser$.pipe(filter((user) => !user));

  // state
  private state = signal<MuscleState>({
    muscles: [],
    error: null,
  });

  // selectors
  muscles = computed(() => this.state().muscles);
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    this.muscles$.subscribe((muscles) =>
      this.state.update((state) => ({
        ...state,
        muscles: muscles,
      })),
    );

    this.error$.subscribe((error) =>
      this.state.update((state) => ({
        ...state,
        error,
      })),
    );

    this.logout$.subscribe(() =>
      this.state.update((state) => ({ ...state, muscles: [] })),
    );
  }

  /**
   * Sends a GET request to the server to get all equipment.
   */
  getMuscles() {
    return this.http.get<Muscle[]>(MuscleRoutes.Default).pipe(
      catchError((error) => {
        this.error$.next(`Error ${error.status}: ${error.statusText}. ${error.error}.`);
        return EMPTY;
      }),
    );
  }
}
