import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../data-access/auth.service';

export const isAuthenticatedGuard = (): CanActivateFn => {
    return () => {
        const router = inject(Router);
        const authService = inject(AuthService);

        if (authService.user()) {
            return true;
        }

        return router.parseUrl('/welcome');
    };
};