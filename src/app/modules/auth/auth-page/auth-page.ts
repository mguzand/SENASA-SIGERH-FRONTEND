import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-page',
  imports: [NgxSpinnerModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
  public loginForm!: FormGroup;
  public showPassword: boolean = false;

  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  // private _loadingService = inject(LoadingService)
  // private _authService = inject(AuthService)
  // private _toastService = inject(ToastService)
  private messageService = inject(MessageService);

  onSubmit() {}

  changeEyeIcon() {
    this.showPassword = !this.showPassword;
  }
}
