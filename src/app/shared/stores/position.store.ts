import { Injectable, signal, computed, inject } from '@angular/core';
import { organizationalUnitService } from '../services/organizational-unit.service';
import { PositionInterface } from '../interfaces/position.interface';

@Injectable({ providedIn: 'root' })
export class PositionStore {
  private organizationalUnitService = inject(organizationalUnitService);

  // STATE
  private _position = signal<PositionInterface[]>([]);
  private _loading = signal(false);
  private _loaded = signal(false);
  private _error = signal<any>(null);

  // SELECTORS
  position = computed(() => this._position());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // ACTION
  load() {
    if (this._loaded()) return; // ⛔ cache (no refetch)

    this._loading.set(true);

    this.organizationalUnitService.getAllPositions().subscribe({
      next: (data) => {
        this._position.set(data);
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
