import { Component, inject, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PositionInterface } from '../../../interfaces/position.interface';
import { PositionStore } from '../../../stores/position.store';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-position-dropdown-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './position-dropdown-field.html',
  styleUrl: './position-dropdown-field.scss',
})
export class PositionDropdownField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  private store = inject(PositionStore);
  positions: Signal<PositionInterface[]> = this.store.position;
  loading = this.store.loading;

  ngOnInit() {
    this.store.load();
  }

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }
}
