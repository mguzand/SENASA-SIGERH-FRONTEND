import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { menuitem } from '../../../core/helpers/menu.helper';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menuitem } from '../menuitem/menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule, 
    Menuitem, 
    RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  model: MenuItem[] = [];

  constructor( private _authService: AuthService){}

  ngOnInit(){
    this.model = menuitem; 
    
    


  }

}
