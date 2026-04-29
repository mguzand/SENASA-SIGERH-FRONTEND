import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-status-employees-dropdown-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './status-employees-dropdown-field.html',
  styleUrl: './status-employees-dropdown-field.scss',
})
export class StatusEmployeesDropdownField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  public statusOptions: { name: string; id: string }[] = [];

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }

  ngOnInit() {
    this.statusOptions = [
      { name: 'Activo', id: 'active' },
      { name: 'Inactivo', id: 'inactive' },
      { name: 'Suspendido', id: 'suspended' },
      { name: 'En vacaciones', id: 'vacation' },
      { name: 'En incapacidad', id: 'disability' },
    ];
  }
}
