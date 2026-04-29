import { MenuItem } from 'primeng/api';
export interface EmployeeProfile {
  id: string;
  rtn: string;
  names: string;
  surname: string;
  email: string;
  phone: string;
}

export interface Profile {
  username: string;
  email: string;
  employees: EmployeeProfile;
  menu?: MenuItem[];
}

export class User {
  private _employee_id: string = '';
  private _rtn: string = '';
  private _names: string = '';
  private _surname: string = '';
  private _username: string = '';
  private _email: string = '';
  private _phone: string = '';

  constructor(data?: any) {
    if (data) {
      this._username = data.username || '';
      this._email = data.email || '';
      this._employee_id = data.employees?.id || '';
      this._rtn = data.employees?.rtn || '';
      this._names = data.employees?.names || '';
      this._surname = data.employees?.surname || '';
      this._phone = data.employees?.phone || '';
    }
  }

  get employee_id(): string {
    return this._employee_id;
  }
  set employee_id(value: string) {
    this._employee_id = value;
  }

  get rtn(): string {
    return this._rtn;
  }
  set rtn(value: string) {
    this._rtn = value;
  }

  get names(): string {
    return this._names;
  }
  set names(value: string) {
    this._names = value;
  }

  get surname(): string {
    return this._surname;
  }
  set surname(value: string) {
    this._surname = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }

  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
  }
}
