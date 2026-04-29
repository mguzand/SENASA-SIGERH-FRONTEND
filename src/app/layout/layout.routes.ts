import { Routes } from '@angular/router';
import { AppLayout } from './app.layout';

export const layoutRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('../modules/dashboard/dashboard').then((c) => c.Dashboard),
        title: 'SISTEMA DE GESTIÓN DE RECURSOS HUMANOS - INICIO',
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('../modules/employees/employees.routes').then((m) => m.employeesRoute),
      },
    ],
  },
];
