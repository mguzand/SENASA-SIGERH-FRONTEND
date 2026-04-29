import { Injectable, computed, inject, signal } from '@angular/core';
import { organizationalUnitService } from '../services/organizational-unit.service';
import { watchesInterface } from '../interfaces/watches.interface';

@Injectable({ providedIn: 'root' })
export class WatchesStore {
  private organizationalUnitService = inject(organizationalUnitService);

  // STATE
  private _watches = signal<watchesInterface[]>([]);
  private _loading = signal(false);
  private _loaded = signal(false);
  private _error = signal<any>(null);

  // SELECTORS
  watches = computed(() => this._watches());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // ACTION
  load() {
    if (this._loaded()) return;

    this._loading.set(true);

    this.organizationalUnitService.getAllWatches().subscribe({
      next: (data) => {
        this._watches.set(data);
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
