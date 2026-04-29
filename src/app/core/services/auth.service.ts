import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Profile, User } from '../interfaces/profile.interface';
import { LoginPayload } from '../interfaces/login-payload.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { environment } from '../../environments/environment';
import { responseUserComponents } from '../interfaces/user-components.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(new User(''));

  private userComponentsSubject = new BehaviorSubject<responseUserComponents[]>([]);
  userComponents$ = this.userComponentsSubject.asObservable();

  public profile$ = new BehaviorSubject<Profile>({
    username: '',
    email: '',
    employees: {
      id: '',
      rtn: '',
      names: '',
      surname: '',
      email: '',
      phone: '',
    },
    menu: [],
  });

  constructor(private _http: HttpClient) {}

  //////////////////////////////////////////////////////////////////////
  ///////  Obtener informacion del Perfil y rol con menu Asignad  //////
  //////////////////////////////////////////////////////////////////////
  async getProfile(): Promise<responseUserComponents[]> {
    const user = this.getCurrentUser();
    if (!user) return [];

    const res = await firstValueFrom(
      this._http.get<responseUserComponents[]>(`${environment.api}/rol-user`),
    );

    this.userComponentsSubject.next(res);
    return res;
  }

  isValidToken() {
    if (!this.token) return false;
    const token_ = this.parseJWT(this.token!);
    const expFromToken = token_.exp;
    const newDate = new Date();
    const dateFromExp = new Date(expFromToken * 1000);
    return dateFromExp.getTime() > newDate.getTime() || false;
  }

  get token() {
    return localStorage.getItem('token');
  }

  public getCurrentUser(): User {
    const token = localStorage.getItem('token');
    if (token) {
      this.user$.next(new User(this.parseJWT(token)));
    }

    return this.user$.value;
  }

  parseJWT(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload: any = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }

  login(loginPayload: LoginPayload) {
    return this._http.post<LoginResponse>(`${environment.api}/auth/login`, loginPayload);
  }

  changePassword(body: any) {
    return this._http.patch(`${environment.api}/auth/change-password`, body);
  }
}
