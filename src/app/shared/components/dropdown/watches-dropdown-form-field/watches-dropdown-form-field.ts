import { Component, inject, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { watchesInterface } from '../../../interfaces/watches.interface';
import { WatchesStore } from '../../../stores/watches.store';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-watches-dropdown-form-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './watches-dropdown-form-field.html',
  styleUrl: './watches-dropdown-form-field.scss',
})
export class WatchesDropdownFormField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  private store = inject(WatchesStore);
  watches: Signal<watchesInterface[]> = this.store.watches;
  loading = this.store.loading;

  ngOnInit() {
    this.store.load();
  }

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }
}
