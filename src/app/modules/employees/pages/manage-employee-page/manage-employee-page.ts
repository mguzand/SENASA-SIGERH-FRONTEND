import { Component } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { ManageEmployeesList } from '../../components/manage-employees-list/manage-employees-list';

@Component({
  selector: 'app-manage-employee-page',
  imports: [SectionHeader, ManageEmployeesList],
  templateUrl: './manage-employee-page.html',
  styleUrl: './manage-employee-page.scss',
})
export class ManageEmployeePage {}
