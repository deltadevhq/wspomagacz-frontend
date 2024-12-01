import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { catchError, EMPTY, filter, retry } from 'rxjs';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';

const LeaderboardsRoutes = {
  Exp: `${environment.baseUrl}friends/leaderboards/exp`,
  Weight: `${environment.baseUrl}friends/leaderboards/weight`,
};

export interface WeightLeaderboardEntry {
  rank: number;
  user: User;
  total_weight_lifted: number;
}

export interface ExpLeaderboardEntry {
  rank: number;
  user: User;
  total_exp: number;
}

interface LeaderboardState {
  expLeaderboard: ExpLeaderboardEntry[] | null;
  weightLeaderboard: WeightLeaderboardEntry[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class LeaderboardsService {
  private http = inject(HttpClient);

  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);

  expLeaderboard$ = this.getLeaderboardExp().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );

  weightLeaderboard$ = this.getLeaderboardWeight().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );

  logout$ = this.authUser$.pipe(filter((user) => !user));

  // state
  private state = signal<LeaderboardState>({
    expLeaderboard: null,
    weightLeaderboard: null,
  });

  // selectors
  expLeaderboard = computed(() => this.state().expLeaderboard);
  weightLeaderboard = computed(() => this.state().weightLeaderboard);

  constructor() {
    this.expLeaderboard$.subscribe((expLeaderboard) => {
      this.state.update((state) => ({
        ...state,
        expLeaderboard,
      }));
    });

    this.weightLeaderboard$.subscribe((weightLeaderboard) => {
      this.state.update((state) => ({
        ...state,
        weightLeaderboard,
      }));
    });

    this.logout$.subscribe(() => {
      this.state.update(() => ({
        expLeaderboard: null,
        weightLeaderboard: null,
      }));
    });
  }

  getLeaderboardExp() {
    return this.http.get<ExpLeaderboardEntry[]>(LeaderboardsRoutes.Exp).pipe(
      catchError((error) => {
          console.error('Error getting leaderboard exp', error);
          return EMPTY;
        },
      ));
  }

  getLeaderboardWeight() {
    return this.http.get<WeightLeaderboardEntry[]>(LeaderboardsRoutes.Weight).pipe(
      catchError((error) => {
          console.error('Error getting leaderboard weight', error);
          return EMPTY;
        },
      ));
  }
}
