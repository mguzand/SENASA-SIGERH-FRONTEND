import { Component, Renderer2 } from '@angular/core';

import { UserButton } from '../user-button/user-button';
import { LayoutService } from '../../services/layout.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-sidebar',
  imports: [Menu, UserButton, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  sidebarOpen = false;
  overlayMenuOpenSubscription: Subscription;
  menuOutsideClickListener: any;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
  ) {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
        if (this.isOutsideClicked(event)) {
          this.hideMenu();
        }
      });
    });
  }

  isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');
    const eventTarget = event.target as Node;

    return !(
      sidebarEl?.isSameNode(eventTarget) ||
      sidebarEl?.contains(eventTarget) ||
      topbarEl?.isSameNode(eventTarget) ||
      topbarEl?.contains(eventTarget)
    );
  }

  hideMenu() {
    this.layoutService.layoutState.update((prev) => ({
      ...prev,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' ',
      );
    }
  }

  get containerClass() {
    const isStatic = this.layoutService.layoutConfig().menuMode === 'static';
    const isOverlay = this.layoutService.layoutConfig().menuMode === 'overlay';

    return {
      // modos Prime
      'layout-overlay': isOverlay,
      'layout-static': isStatic,

      // DESKTOP static → oculto
      '!-translate-x-full !fixed':
        isStatic && this.layoutService.layoutState().staticMenuDesktopInactive,

      // MOBILE static → visible
      'translate-x-0': this.layoutService.layoutState().staticMenuMobileActive,

      // MOBILE static → oculto
      '-translate-x-full md:translate-x-0':
        !this.layoutService.layoutState().staticMenuMobileActive,

      // overlay activo
      'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
