import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../shared/services/loading.service';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  private _loadingService = inject(LoadingService);
  private _authService = inject(AuthService);
  // private _toastService = inject(ToastService)
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this._loadingService.onDisplayLoading();
    const { remember, ...loginData } = this.loginForm.value;

    this._authService
      .login({
        ...loginData,
      })
      .pipe(finalize(() => this._loadingService.onHideLoading()))
      .subscribe({
        next: (res: any) => {
          if (remember) localStorage.setItem('username', loginData.username);
          localStorage.setItem('token', res.token);
          this._router.navigateByUrl('/');
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          const detail =
            error.status === 0
              ? 'No se puede realizar la conexión al servidor'
              : error.error?.message || error.message;

          this.messageService.add({ severity: 'error', summary: 'Error', detail, life: 9000 });
        },
      });
  }

  initForm() {
    const rememberUserName = localStorage.getItem('username');

    this.loginForm = this._fb.group({
      username: [rememberUserName || '', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: !!rememberUserName,
    });
  }

  changeEyeIcon() {
    this.showPassword = !this.showPassword;
  }
}
