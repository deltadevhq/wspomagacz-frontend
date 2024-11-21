import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser, AuthUserResponse, transformAuthUser } from '../models/User';
import { BehaviorSubject, catchError, concatMap, EMPTY, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

interface AuthState {
  user: AuthUser | null;
}

interface UpdateUserRequest {
  display_name?: string;
  gender?: string;
  birthday?: string;
  weight?: number;
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

const AuthenticationRoutes = {
  Login: `${environment.baseUrl}auth/login`,
  Register: `${environment.baseUrl}auth/register`,
  User: `${environment.baseUrl}auth/user`,
  Logout: `${environment.baseUrl}auth/logout`,
  Avatar: `${environment.baseUrl}auth/user/avatar`,
} as const;


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
      .post(AuthenticationRoutes.Login, credentials)
      .pipe(concatMap(() => this.getUser()));
  }

  /**
   * Get the current user.
   */
  getUser() {
    return this.http
      .get<AuthUserResponse>(AuthenticationRoutes.User)
      .pipe(
        map(transformAuthUser),
        tap((user) => this.user$.next(user)),
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
    return this.http.get(AuthenticationRoutes.Logout).pipe(
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
      .post(AuthenticationRoutes.Register, user)
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

  /**
   * Update the logged-in user.
   * @param data - The data to update.
   */
  updateUser(data: UpdateUserRequest) {
    return this.http
      .patch<AuthUserResponse>(AuthenticationRoutes.User, data)
      .pipe(
        map(transformAuthUser),
        tap((user) => this.user$.next(user)),
        catchError(() => EMPTY),
      );
  }

  updateAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.http.patch(AuthenticationRoutes.Avatar, formData).pipe(
      tap(() => this.getUser().subscribe()),
      catchError(() => EMPTY),
    );
  }
}
