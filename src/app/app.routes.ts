import { Routes } from '@angular/router';
import { AuthPage } from './modules/auth/auth-page/auth-page';
import { AuthLayoutComponent } from './core/auth/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        title: 'SIGERH SENASA- Login',
        loadComponent: () => import('./modules/auth/auth-page/auth-page').then((c) => c.AuthPage),
      },
    ],
  },
];
