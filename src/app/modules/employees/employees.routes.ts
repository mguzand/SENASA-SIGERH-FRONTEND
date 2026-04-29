import { Route } from '@angular/router';

export const employeesRoute: Route[] = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full',
  },
  {
    path: 'create/new-register',
    loadComponent: () =>
      import('./pages/create-employee-page/create-employee-page').then((c) => c.CreateEmployeePage),
    title: 'SIGERH - Nuevo Empleado',
  },
  {
    path: 'manage',
    loadComponent: () =>
      import('./pages/manage-employee-page/manage-employee-page').then((c) => c.ManageEmployeePage),
    title: 'SIGERH - Gestión de Empleados',
  },
];
