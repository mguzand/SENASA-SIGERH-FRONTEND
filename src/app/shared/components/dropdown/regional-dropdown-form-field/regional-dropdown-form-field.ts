import { Component, inject, Input, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegionalStore } from '../../../stores/regional.store';
import { regionalInterface } from '../../../interfaces/regional.interface';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-regional-dropdown-form-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './regional-dropdown-form-field.html',
  styleUrl: './regional-dropdown-form-field.scss',
})
export class RegionalDropdownFormField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;

  private store = inject(RegionalStore);
  regions: Signal<regionalInterface[]> = this.store.regionals;
  loading = this.store.loading;

  ngOnInit() {
    this.store.load();
  }

  isInvalid() {
    return this.control?.invalid && (this.control.touched || this.formSubmitted);
  }
}
