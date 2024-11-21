import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular/standalone';
import { AuthService, Credentials } from '../../shared/data-access/auth.service';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // sources
  error$ = new Subject<any>();
  login$ = new Subject<Credentials>();

  private authService = inject(AuthService);
  private toastController = inject(ToastController);

  userAuthenticated$ = this.login$.pipe(
    switchMap((credentials) =>
      this.authService.login(credentials).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        }),
      ),
    ),
  );

  // state
  private state = signal<LoginState>({
    status: 'pending',
  });

  // selectors
  status = computed(() => this.state().status);

  constructor() {
    // reducers
    this.userAuthenticated$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
          this.state.update((state) => ({ ...state, status: 'success' }));
        },
      );

    this.login$.pipe(takeUntilDestroyed()).subscribe(() =>
      this.state.update((state) => ({
        ...state,
        status: 'authenticating',
      })),
    );

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
          this.state.update((state) => ({ ...state, status: 'error' }));
          this.presentErrorToast();
        },
      );
  }

  /**
   * Used to present a Toast with error message when {@link error$} emits a value.
   */
  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: `Nieprawidłowa nazwa użytkownika lub hasło!`,
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
      message: `Pomyślnie zalogowano!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle',
    });

    await toast.present();
  }
}
