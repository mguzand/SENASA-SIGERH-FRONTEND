import { Component, inject, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SchedulesStore } from '../../../stores/schedules.store';
import { schedulesInterface } from '../../../interfaces/schedules.interface';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-schedules-dropdown-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './schedules-dropdown-field.html',
  styleUrl: './schedules-dropdown-field.scss',
})
export class SchedulesDropdownField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  private store = inject(SchedulesStore);
  schedules: Signal<schedulesInterface[]> = this.store.schedules;
  loading = this.store.loading;

  ngOnInit() {
    this.store.load();
  }

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }
}
