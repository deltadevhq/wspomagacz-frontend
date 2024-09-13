import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserGender, UserStatus, UserWeight } from '../models/User';
import { BehaviorSubject, concatMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

export interface UserResponse {
    user: {
        id: number;
        username: string;
        display_name: string;
        email: string;
        birthday: string;
        exp: number;
        level: number;
        height: number;
        status: string;
        gender: string;
        weights: UserWeight[];
        last_logged_at: string;
        modified_at: string;
        created_at: string;
    };
}

export type AuthUser = User | null;

interface AuthState {
    user: AuthUser;
}

export type Credentials = {
    username: string;
    password: string;
};

export type NewAccount = {
    username: string;
    displayName: string;
    email: string;
    password: string;
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);

    // sources
    private user$ = new BehaviorSubject<AuthUser>(null);

    // state
    private state = signal<AuthState>({
        user: null,
    });

    user = computed(() => this.state().user);

    constructor() {
        this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
            this.state.update((state) => ({
                ...state,
                user,
            }));
        });

        this.getUser().subscribe();
    }

    login(credentials: Credentials) {
        return this.http
            .post(`${environment.baseUrl}auth/login`, credentials)
            .pipe(concatMap(() => this.getUser()));
    }

    getUser() {
        return this.http
            .get<UserResponse>(`${environment.baseUrl}auth/user`)
            .pipe(
                tap(({ user }) => {
                    this.user$.next(this.parseUser(user));
                }),
            );
    }

    logout() {
        return this.http.post(`${environment.baseUrl}auth/logout`, {}).pipe(
            tap(() => {
                this.user$.next(null);
            }),
        );
    }

    register(newAccount: NewAccount) {
        return this.http
            .post<UserResponse>(
                `${environment.baseUrl}auth/register`,
                newAccount,
            )
            .pipe(
                tap(({ user }) => {
                    this.user$.next(this.parseUser(user));
                }),
            );
    }

    private parseUser(user: UserResponse['user']): User {
        const {
            birthday,
            modified_at,
            last_logged_at,
            created_at,
            gender,
            status,
            ...rest
        } = user;

        return {
            birthday: new Date(birthday),
            created_at: new Date(created_at),
            modified_at: new Date(modified_at),
            last_logged_at: new Date(last_logged_at),
            gender: UserGender[gender as keyof typeof UserGender],
            status: UserStatus[status as keyof typeof UserStatus],
            ...rest,
        };
    }
}
