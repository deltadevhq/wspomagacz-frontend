import { computed, inject, Injectable, signal } from '@angular/core';
import {
    AuthService,
    CreateUserCredentials,
} from '../shared/data-access/auth.service';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type RegisterStatus = 'pending' | 'creating' | 'success' | 'error';

interface RegisterState {
    status: RegisterStatus;
}

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private authService = inject(AuthService);

    // sources
    error$ = new Subject<any>();
    createUser$ = new Subject<CreateUserCredentials>();

    userCreated$ = this.createUser$.pipe(
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
            .subscribe(() =>
                this.state.update((state) => ({ ...state, status: 'success' })),
            );

        this.createUser$.pipe(takeUntilDestroyed()).subscribe(() =>
            this.state.update((state) => ({
                ...state,
                status: 'creating',
            })),
        );

        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(() =>
                this.state.update((state) => ({ ...state, status: 'error' })),
            );
    }
}
