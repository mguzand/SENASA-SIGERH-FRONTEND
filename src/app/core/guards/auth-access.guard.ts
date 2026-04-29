import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
 
import { map, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAccessGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requiredComponent = route.data['component']; // ejemplo: "Usuarios"

     return this.authService.userComponents$.pipe(
      filter(userComponents => userComponents.length > 0), // 👈 espera a que cargue
      take(1),
      map(userComponents => {
        const requiredComponent = route.data['component'];
        const hasAccess = userComponents.some(
          c => c.components.description === requiredComponent
        );

        if (hasAccess) return true;

        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
