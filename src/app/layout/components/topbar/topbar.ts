import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Menu, MenuModule } from 'primeng/menu';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/interfaces/profile.interface';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OverlayModule } from 'primeng/overlay';
import { destroyPrimeOverlays } from '../../../core/helpers/overlay-cleaner';

@Component({
  selector: 'app-topbar',
  imports: [MenuModule, AvatarModule, CommonModule, OverlayModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  @ViewChild('menu') menu!: Menu;
  menuVisible = false;
  user!: User;
  constructor(
    private _router: Router,
    public layoutService: LayoutService,
    private _authService: AuthService,
  ) {
    this.user = _authService.getCurrentUser();
    console.log(this.user);
  }

  // Items para el menú del avatar
  public items: MenuItem[] = [
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      //routerLink: '/profile/setting',
      iconClass: 'p-1',
      command: () => {
        this.menu.hide();
      },
    },
    {
      label: '<b class="m-0 text-red-600">Cerrar sesión</b>',
      escape: false,
      icon: 'pi pi-sign-out',
      iconClass: 'text-red-600 p-1',
      command: (event) => {
        destroyPrimeOverlays();
        setTimeout(() => this._router.navigateByUrl('/auth/login'));
      },
    },
  ];

  openMenu(event: Event) {
    event.stopPropagation();

    if (this.menu.overlayVisible) {
      this.menu.hide();
    } else {
      this.menu.show(event);
    }
  }

  get firstName() {
    return this.user.names.split(' ')[0];
  }

  get surname() {
    return this.user.surname.split(' ')[0];
  }

  get initialLetter() {
    return `${this.firstName[0] ?? ''}${this.surname[0] ?? ''}`;
  }
}
