import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser, AuthUserResponse, transformAuthUser } from '../models/User';
import { BehaviorSubject, catchError, concatMap, EMPTY, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

interface AuthState {
  user: AuthUser | null;
}

export type Credentials = {
  username: string;
  password: string;
};

export type CreateUserCredentials = {
  username: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // sources
  private user$ = new BehaviorSubject<AuthUser | null>(null);

  // state
  private state = signal<AuthState>({
    user: null,
  });

  user = computed(() => this.state().user);

  constructor() {
    this.user$
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.state.update((state) => ({
          ...state,
          user,
        }));
      });

    this.getUser().subscribe();
  }

  /**
   * Login the user.
   * @param credentials - The user credentials.
   */
  login(credentials: Credentials) {
    return this.http
      .post(`${environment.baseUrl}auth/login`, credentials)
      .pipe(concatMap(() => this.getUser()));
  }

  /**
   * Get the current user.
   */
  getUser() {
    return this.http
      .get<AuthUserResponse>(`${environment.baseUrl}auth/user`)
      .pipe(
        tap((user) => this.user$.next(transformAuthUser(user))),
        catchError(() => {
          this.user$.next(null);
          return EMPTY;
        }),
      );
  }

  /**
   * Logout the current user.
   */
  logout() {
    return this.http.post(`${environment.baseUrl}auth/logout`, {}).pipe(
      tap(() => this.user$.next(null)),
      catchError(() => EMPTY),
    );
  }

  /**
   * Register a new user.
   * @param user - The user to register.
   */
  register(user: CreateUserCredentials) {
    return this.http
      .post(`${environment.baseUrl}auth/register`, user)
      .pipe(
        concatMap(() =>
          this.login({
            username: user.username,
            password: user.password,
          } as Credentials),
        ),
        catchError(() => EMPTY),
      );
  }
}
