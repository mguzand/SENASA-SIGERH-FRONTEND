import { Routes } from '@angular/router';
import { AuthPage } from './modules/auth/auth-page/auth-page';
import { AuthLayoutComponent } from './core/auth/auth-layout.component';
import { layoutRoutes } from './layout/layout.routes';
import { LoggedinGuard } from './core/guards/loggedin.guard';

export const routes: Routes = [
  {
    path: '',
    children: layoutRoutes,
    canActivate: [LoggedinGuard],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        title: 'SIGERH - Login',
        loadComponent: () => import('./modules/auth/auth-page/auth-page').then((c) => c.AuthPage),
      },
    ],
  },
];
