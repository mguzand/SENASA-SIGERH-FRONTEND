import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Sidebar, Topbar, CommonModule, ToastModule, NgxSpinnerModule],
  templateUrl: './app.layout.html',
  styleUrls: [],
})
export class AppLayout {}
