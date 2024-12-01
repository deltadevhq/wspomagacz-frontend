import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, map, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastController } from '@ionic/angular/standalone';
import { transformUserAchievement, UserAchievement, UserAchievementResponse } from '../models/UserAchievement';

const WorkoutRoutes = {
  Default: (id: number) => `${environment.baseUrl}users/${id}/achievements`,
  Id: (user_id: number, achievement_id: number) => `${environment.baseUrl}users/${user_id}/achievements/${achievement_id}`,
} as const;

interface AchievementState {
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  error$ = new Subject<string | null>();
  private toastController = inject(ToastController);
  private http = inject(HttpClient);

  // state
  private state = signal<AchievementState>({
    error: null,
  });

  // selectors
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error) => {
        this.state.update((state) => ({ ...state, error }));
        if (error !== null) this.presentErrorToast();
      });
  }

  /**
   * Sends a GET request to the server to get all user achievements.
   */
  getAchievements(userId: number): Observable<UserAchievement[]> {
    return this.http.get<UserAchievementResponse[]>(WorkoutRoutes.Default(userId)).pipe(
      map((workouts) => workouts.map((workout) => transformUserAchievement(workout))),
      catchError((err) => {
        this.error$.next(`Error ${err.status}: ${err.statusText}. ${err.error.error}.`);
        return EMPTY;
      }),
    );
  }

  /**
   * Used to present a Toast with error message when {@link error$} emits a value.
   */
  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: `${this.error()}`,
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
