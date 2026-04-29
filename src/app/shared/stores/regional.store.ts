import { Injectable, computed, inject, signal } from '@angular/core';
import { regionalInterface } from '../interfaces/regional.interface';
import { organizationalUnitService } from '../services/organizational-unit.service';

@Injectable({ providedIn: 'root' })
export class RegionalStore {
  private organizationalUnitService = inject(organizationalUnitService);

  // STATE
  private _regionals = signal<regionalInterface[]>([]);
  private _loading = signal(false);
  private _loaded = signal(false);
  private _error = signal<any>(null);

  // SELECTORS
  regionals = computed(() => this._regionals());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // ACTION
  load() {
    if (this._loaded()) return;

    this._loading.set(true);

    this.organizationalUnitService.getAllRegionals().subscribe({
      next: (data) => {
        this._regionals.set(data);
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
