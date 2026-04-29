import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-marital-status-dropdown-form-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './marital-status-dropdown-form-field.html',
  styleUrl: './marital-status-dropdown-form-field.scss',
})
export class MaritalStatusDropdownFormField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  public maritalStatusOptions: { name: string; id: string }[] = [];

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }

  ngOnInit() {
    this.maritalStatusOptions = [
      { name: 'Casado(a)', id: 'married' },
      { name: 'Soltero(a)', id: 'single' },
      { name: 'Divorciado(a)', id: 'divorced' },
      { name: 'Union Libre', id: 'free_union' },
      { name: 'Viudo(a)', id: 'widowed' },
    ];
  }
}
