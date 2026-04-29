import { Component, inject, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { organizationalUnit } from '../../../interfaces/organizational-unit.interface';
import { organizationalUnitService } from '../../../services/organizational-unit.service';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-area-dropdown-form-field',
  imports: [Select, CommonModule, ReactiveFormsModule, MessageModule],
  templateUrl: './area-dropdown-form-field.html',
  styleUrl: './area-dropdown-form-field.scss',
})
export class AreaDropdownFormField {
  @Input({ required: true }) control: FormControl = new FormControl();
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() formSubmitted = false;
  @Input() isRequired = false;

  private _organizationalUnitTypes = signal<string | null>(null);

  @Input() set organizationalUnits(value: string | null) {
    this._organizationalUnitTypes.set(value);
    this.loadOrganizationalUnit(value);
  }

  organizationalUnit = signal<organizationalUnit[]>([]);
  private organizationalUnitService = inject(organizationalUnitService);

  private loadOrganizationalUnit(organizationalUnits: string | null) {
    if (!organizationalUnits) {
      this.organizationalUnit.set([]);
      return;
    }

    this.organizationalUnitService.getOrganizationalUnits(organizationalUnits).subscribe({
      next: (data) => {
        this.organizationalUnit.set(data);
      },
      error: (err) => {
        console.error('Error loading organizational units:', err);
        this.organizationalUnit.set([]);
      },
    });
  }

  isInvalid() {
    return this.control.invalid && (this.control.touched || this.formSubmitted);
  }
}
