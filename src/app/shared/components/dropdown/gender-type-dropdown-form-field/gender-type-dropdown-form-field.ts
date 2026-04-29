import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-gender-type-dropdown-form-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './gender-type-dropdown-form-field.html',
  styleUrl: './gender-type-dropdown-form-field.scss',
})
export class GenderTypeDropdownFormField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  public genderOptions: { name: string; id: string }[] = [];

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }

  ngOnInit() {
    this.genderOptions = [
      { name: 'Masculino', id: 'male' },
      { name: 'Femenino', id: 'female' },
    ];
  }
}
