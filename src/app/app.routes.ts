import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
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
    path: 'tabs',
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
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage),
      },
      { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
      { path: '**', redirectTo: 'tabs/home' },
    ],
  },
  { path: '**', redirectTo: '/welcome' },
  {
    path: 'ranking',
    loadComponent: () => import('./ranking/ranking.page').then(m => m.RankingPage),
  },
];
