import { Component } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { FormEmployeeCreate } from '../../components/form-employee-create/form-employee-create';

@Component({
  selector: 'app-create-employee-page',
  imports: [SectionHeader, FormEmployeeCreate],
  templateUrl: './create-employee-page.html',
  styleUrl: './create-employee-page.scss',
})
export class CreateEmployeePage {}
