import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-academic-history-form',
  imports: [CommonModule, ReactiveFormsModule, SelectModule],
  templateUrl: './academic-history-form.html',
  styleUrl: './academic-history-form.scss',
})
export class AcademicHistoryForm {
  @Input({ required: true }) parentForm!: FormGroup;

  private fb = inject(FormBuilder);

  levels = [
    { name: 'Primaria', value: 'primaria' },
    { name: 'Secundaria', value: 'secundaria' },
    { name: 'Bachillerato', value: 'bachillerato' },
    { name: 'Técnico', value: 'tecnico' },
    { name: 'Licenciatura', value: 'licenciatura' },
    { name: 'Ingeniería', value: 'ingenieria' },
    { name: 'Maestría', value: 'maestria' },
    { name: 'Doctorado', value: 'doctorado' },
    { name: 'Diplomado', value: 'diplomado' },
    { name: 'Curso', value: 'curso' },
  ];

  get academicHistory(): FormArray {
    return this.parentForm.get('academicHistory') as FormArray;
  }

  addStudy() {
    const currentYear = new Date().getFullYear();

    this.academicHistory.push(
      this.fb.group({
        level: [null, Validators.required],
        institution: ['', Validators.required],
        career: [''],
        title: [''],
        startYear: [currentYear, Validators.required],
        endYear: [currentYear],
        inProgress: [false],
        notes: [''],
      }),
    );
  }

  removeStudy(index: number) {
    this.academicHistory.removeAt(index);
  }

  onInProgressChange(index: number) {
    const group = this.academicHistory.at(index) as FormGroup;
    const inProgress = group.get('inProgress')?.value;

    if (inProgress) {
      group.get('endYear')?.setValue(null);
      group.get('endYear')?.disable();
    } else {
      group.get('endYear')?.enable();
      group.get('endYear')?.setValue(new Date().getFullYear());
    }
  }

  getHeader(index: number): string {
    const group = this.academicHistory.at(index) as FormGroup;

    const level = group.get('level')?.value?.name || 'Nuevo estudio';
    const start = group.get('startYear')?.value || new Date().getFullYear();
    const inProgress = group.get('inProgress')?.value;
    const end = inProgress ? 'Actual' : group.get('endYear')?.value || start;

    return `${level} · ${start} — ${end}`;
  }
}
