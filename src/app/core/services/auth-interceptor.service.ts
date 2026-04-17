import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Rutas a las que no quieres enviar token
  const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  let authReq = req;

  if (token && !isAuthRequest) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');

        router.navigate(['/login'], {
          queryParams: { sessionExpired: true },
        });
      }

      return throwError(() => error);
    }),
  );
};
