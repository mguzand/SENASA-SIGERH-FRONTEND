import { Component, inject, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { organizationalUnitTypes } from '../../../interfaces/organizational-unit-types.interface';
import { OrganizationalUnitTypeStore } from '../../../stores/organizational-type.store';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-unit-types-dropdown-form-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './unit-types-dropdown-form-field.html',
  styleUrl: './unit-types-dropdown-form-field.scss',
})
export class UnitTypesDropdownFormField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  private store = inject(OrganizationalUnitTypeStore);
  organizationalUnitTypes: Signal<organizationalUnitTypes[]> = this.store.organizationalUnitTypes;
  loading = this.store.loading;

  ngOnInit() {
    this.store.load();
  }

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }
}
