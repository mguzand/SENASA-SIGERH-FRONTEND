import { Injectable, signal, computed, inject } from '@angular/core';
import { organizationalUnitService } from '../services/organizational-unit.service';
import { schedulesInterface } from '../interfaces/schedules.interface';

@Injectable({ providedIn: 'root' })
export class SchedulesStore {
  private organizationalUnitService = inject(organizationalUnitService);

  // STATE
  private _schedules = signal<schedulesInterface[]>([]);
  private _loading = signal(false);
  private _loaded = signal(false);
  private _error = signal<any>(null);

  // SELECTORS
  schedules = computed(() => this._schedules());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // ACTION
  load() {
    if (this._loaded()) return; // ⛔ cache (no refetch)

    this._loading.set(true);

    this.organizationalUnitService.getAllSchedules().subscribe({
      next: (data) => {
        this._schedules.set(data);
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
