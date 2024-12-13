import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, filter, retry, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Equipment } from '../models/Equipment';

const EquipmentRoutes = {
  Default: `${environment.baseUrl}equipment`,
  Id: (id: number) => `${environment.baseUrl}equipment/${id}`,
} as const;

interface EquipmentState {
  equipment: Equipment[];
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);
  private http = inject(HttpClient);

  // sources
  equipment$ = this.getEquipment().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );

  error$ = new Subject<string>();
  logout$ = this.authUser$.pipe(filter((user) => !user));

  // state
  private state = signal<EquipmentState>({
    equipment: [],
    error: null,
  });

  // selectors
  equipment = computed(() => this.state().equipment);
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    this.equipment$.subscribe((eq) =>
      this.state.update((state) => ({
        ...state,
        equipment: eq,
      })),
    );

    this.error$.subscribe((error) =>
      this.state.update((state) => ({
        ...state,
        error,
      })),
    );

    this.logout$.subscribe(() =>
      this.state.update((state) => ({ ...state, equipment: [] })),
    );
  }

  /**
   * Sends a GET request to the server to get all equipment.
   */
  getEquipment() {
    return this.http.get<Equipment[]>(EquipmentRoutes.Default).pipe(
      catchError((error) => {
        this.error$.next(`Error ${error.status}: ${error.statusText}. ${error.error}.`);
        return EMPTY;
      }),
    );
  }
}
