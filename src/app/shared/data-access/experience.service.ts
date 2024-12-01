import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, EMPTY, filter, retry, Subject } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';

const ExperienceRoutes = {
  Level: (experience: number) => `${environment.baseUrl}experience/level-by-xp?xp=${experience}`,
  XP: (level: number) => `${environment.baseUrl}experience/xp-by-level?level=${level}`,
} as const;

export interface LevelResponse {
  level: number;
  xp: number;
  progress: number;
  missing_xp: number;
}

export interface ExperienceResponse {
  level: number;
  xp: number;
}

interface ExperienceState {
  userLevel: LevelResponse | null,
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);
  private http = inject(HttpClient);

  level$ = this.getLevelByExperience(this.authService.user()?.exp).pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
      resetOnSuccess: true,
    }),
  );

  error$ = new Subject<string>();

  state = signal<ExperienceState>({
    userLevel: null,
    error: null,
  });

  level = computed(() => this.state().userLevel);
  error = computed(() => this.state().error);

  constructor() {
    this.level$.pipe(takeUntilDestroyed()).subscribe((level) => {
      this.state.update((state) => ({
        ...state,
        userLevel: level,
      }));
    });

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) => {
      this.state.update((state) => ({
        ...state,
        error,
      }));
    });
  }

  /**
   * Get the level by given experience.
   * @param experience - The experience.
   */
  getLevelByExperience(experience: number = 0) {
    return this.http.get<LevelResponse>(ExperienceRoutes.Level(experience)).pipe(
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Get the experience by given level.
   * @param level - The level.
   */
  getExperienceByLevel(level: number) {
    return this.http.get<ExperienceResponse>(ExperienceRoutes.XP(level)).pipe(
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }
}
