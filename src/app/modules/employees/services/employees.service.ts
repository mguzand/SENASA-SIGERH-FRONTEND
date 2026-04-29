import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePersonValidate } from '../interfaces/employee-document-form';
import { environment } from '../../../environments/environment';
import { sendEmployeeInterface } from '../interfaces/send-employee.interface';

export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private _http = inject(HttpClient);

  verifyStatus(identidad: string): Observable<ResponsePersonValidate> {
    return this._http.get<ResponsePersonValidate>(
      `${environment.api}/employees/status/${identidad}`,
    );
  }

  createPolicy(dataClient: sendEmployeeInterface) {
    return this._http.post(`${environment.api}/employees`, dataClient);
  }
}
