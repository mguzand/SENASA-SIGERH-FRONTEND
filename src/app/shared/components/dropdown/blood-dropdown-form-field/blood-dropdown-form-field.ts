import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-blood-dropdown-form-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './blood-dropdown-form-field.html',
  styleUrl: './blood-dropdown-form-field.scss',
})
export class BloodDropdownFormField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  public bloodOptions: { name: string; id: string }[] = [];

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }

  ngOnInit() {
    this.bloodOptions = [
      { name: 'A+', id: 'A+' },
      { name: 'A-', id: 'A-' },
      { name: 'B+', id: 'B+' },
      { name: 'B-', id: 'B-' },
      { name: 'AB+', id: 'AB+' },
      { name: 'AB-', id: 'AB-' },
      { name: 'O+', id: 'O+' },
      { name: 'O-', id: 'O-' },
    ];
  }
}
