import { Injectable, computed, inject, signal } from '@angular/core';
import { modalitiesInterface } from '../interfaces/modalities.interface';
import { organizationalUnitService } from '../services/organizational-unit.service';

@Injectable({ providedIn: 'root' })
export class ModalitiesStore {
  private organizationalUnitService = inject(organizationalUnitService);

  // STATE
  private _modalities = signal<modalitiesInterface[]>([]);
  private _loading = signal(false);
  private _loaded = signal(false);
  private _error = signal<any>(null);

  // SELECTORS
  modalities = computed(() => this._modalities());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // ACTION
  load() {
    if (this._loaded()) return;

    this._loading.set(true);

    this.organizationalUnitService.getAllModalities().subscribe({
      next: (data) => {
        this._modalities.set(data);
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
