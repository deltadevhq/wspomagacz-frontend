import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'welcome',
        pathMatch: 'full',
        loadComponent: () =>
            import('./welcome/welcome.component').then(
                (m) => m.WelcomeComponent,
            ),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./register/register.component').then(
                (m) => m.RegisterComponent,
            ),
    },
    {
        path: '',
        loadComponent: () =>
            import('./tabs/tabs.component').then((m) => m.TabsComponent),
        canActivate: [isAuthenticatedGuard()], // Ensure user IS authenticated
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import('./home/home.component').then(
                        (m) => m.HomeComponent,
                    ),
            },
            {
                path: 'workouts',
                loadComponent: () =>
                    import('./workouts/workouts.component').then(
                        (m) => m.WorkoutsComponent,
                    ),
                children: [
                    {
                        path: ':id',
                        loadComponent: () =>
                            import(
                                './workout-details/workout-details.component'
                            ).then((m) => m.WorkoutDetailsComponent),
                    },
                ],
            },
            {
                path: 'ranking',
                loadComponent: () =>
                    import('./ranking/ranking.component').then(
                        (m) => m.RankingComponent,
                    ),
            },
            {
                path: 'users',
                children: [
                    {
                        path: ':id',
                        loadComponent: () =>
                            import(
                                './user-details/user-details.component'
                            ).then((m) => m.UserDetailsComponent),
                    },
                ],
            },
            { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default to home
            { path: '**', redirectTo: 'home' }, // Redirect any unknown route to home
        ],
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Redirect any unknown route to welcome page
    { path: '**', redirectTo: 'welcome' }, // Redirect any unknown route to welcome page
];
