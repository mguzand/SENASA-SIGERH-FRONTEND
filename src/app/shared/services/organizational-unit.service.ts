import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { organizationalUnitTypes } from '../interfaces/organizational-unit-types.interface';
import { organizationalUnit } from '../interfaces/organizational-unit.interface';
import { modalitiesInterface } from '../interfaces/modalities.interface';
import { PositionInterface } from '../interfaces/position.interface';
import { regionalInterface } from '../interfaces/regional.interface';
import { schedulesInterface } from '../interfaces/schedules.interface';
import { watchesInterface } from '../interfaces/watches.interface';

@Injectable({
  providedIn: 'root',
})
export class organizationalUnitService {
  constructor(private _http: HttpClient) {}

  getOrganizationalUnitTypes() {
    return this._http.get<organizationalUnitTypes[]>(
      `${environment.api}/department/organizational-unit-types`,
    );
  }

  getOrganizationalUnits(organizationalUnitTypes: string) {
    return this._http.get<organizationalUnit[]>(
      `${environment.api}/department/organizational-units?unit_type=${organizationalUnitTypes}`,
    );
  }

  getAllPositions() {
    return this._http.get<PositionInterface[]>(`${environment.api}/position`);
  }

  getAllSchedules() {
    return this._http.get<schedulesInterface[]>(`${environment.api}/schedules`);
  }

  getAllModalities() {
    return this._http.get<modalitiesInterface[]>(
      `${environment.api}/employment-modalities`,
    );
  }

  getAllWatches() {
    return this._http.get<watchesInterface[]>(`${environment.api}/watches`);
  }

  getAllRegionals() {
    return this._http.get<regionalInterface[]>(`${environment.api}/regional`);
  }
}
