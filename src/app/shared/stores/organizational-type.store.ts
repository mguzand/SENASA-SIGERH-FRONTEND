import { Injectable, signal, computed, inject } from '@angular/core';
import { organizationalUnitTypes } from '../interfaces/organizational-unit-types.interface';
import { organizationalUnitService } from '../services/organizational-unit.service';

@Injectable({ providedIn: 'root' })
export class OrganizationalUnitTypeStore {
  private organizationalUnitService = inject(organizationalUnitService);

  // STATE
  private _organizationalUnit = signal<organizationalUnitTypes[]>([]);
  private _loading = signal(false);
  private _loaded = signal(false);
  private _error = signal<any>(null);

  // SELECTORS
  organizationalUnitTypes = computed(() => this._organizationalUnit());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // ACTION
  load() {
    if (this._loaded()) return; // ⛔ cache (no refetch)

    this._loading.set(true);

    this.organizationalUnitService.getOrganizationalUnitTypes().subscribe({
      next: (data) => {
        this._organizationalUnit.set(data);
        this._loaded.set(true);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err);
        this._loading.set(false);
      },
    });
  }
}
