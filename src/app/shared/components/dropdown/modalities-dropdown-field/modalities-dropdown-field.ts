import { Component, inject, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalitiesStore } from '../../../stores/modalities.store';
import { modalitiesInterface } from '../../../interfaces/modalities.interface';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-modalities-dropdown-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './modalities-dropdown-field.html',
  styleUrl: './modalities-dropdown-field.scss',
})
export class ModalitiesDropdownField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  private store = inject(ModalitiesStore);
  modalities: Signal<modalitiesInterface[]> = this.store.modalities;
  loading = this.store.loading;

  ngOnInit() {
    this.store.load();
  }

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }
}
