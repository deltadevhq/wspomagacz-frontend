import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService, CreateUserCredentials } from '../shared/data-access/auth.service';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastController } from '@ionic/angular/standalone';

export type RegisterStatus = 'pending' | 'creating' | 'success' | 'error';

interface RegisterState {
  status: RegisterStatus;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // sources
  error$ = new Subject<any>();
  register$ = new Subject<CreateUserCredentials>();

  private authService = inject(AuthService);
  private toastController = inject(ToastController);

  userCreated$ = this.register$.pipe(
    switchMap((credentials) =>
      this.authService.register(credentials).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        }),
      ),
    ),
  );

  // state
  private state = signal<RegisterState>({
    status: 'pending',
  });

  // selectors
  status = computed(() => this.state().status);

  constructor() {
    // reducers
    this.userCreated$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
          this.state.update((state) => ({ ...state, status: 'success' }));
        },
      );

    this.register$.pipe(takeUntilDestroyed()).subscribe(() =>
      this.state.update((state) => ({
        ...state,
        status: 'creating',
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
      message: `Wystąpił problem przy tworzeniu użytkownika!`,
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
      message: `Pomyślnie utworzono użytkownika!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle',
    });

    await toast.present();
  }
}
