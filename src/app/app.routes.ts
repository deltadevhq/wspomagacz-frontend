import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then(m => m.WelcomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage),
  },
  {
    path: '',
    component: TabsComponent,
    canActivate: [isAuthenticatedGuard()],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
      },
      {
        path: 'workouts',
        loadComponent: () => import('./workouts/workouts.page').then(m => m.WorkoutsPage),
      },
      {
        path: 'discover',
        loadComponent: () => import('./discover/discover.page').then(m => m.DiscoverPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: 'profile/:id',
        loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'welcome' },
];
