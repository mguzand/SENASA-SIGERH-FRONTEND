import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingService } from '../../../../shared/services/loading.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { GenderTypeDropdownFormField } from '../../../../shared/components/dropdown/gender-type-dropdown-form-field/gender-type-dropdown-form-field';
import { MaritalStatusDropdownFormField } from '../../../../shared/components/dropdown/marital-status-dropdown-form-field/marital-status-dropdown-form-field';
import { TextareaModule } from 'primeng/textarea';
import { AreaDropdownFormField } from '../../../../shared/components/dropdown/area-dropdown-form-field/area-dropdown-form-field';
import { UnitTypesDropdownFormField } from '../../../../shared/components/dropdown/unit-types-dropdown-form-field/unit-types-dropdown-form-field';
import { PositionDropdownField } from '../../../../shared/components/dropdown/position-dropdown-field/position-dropdown-field';
import { StatusEmployeesDropdownField } from '../../../../shared/components/dropdown/status-employees-dropdown-field/status-employees-dropdown-field';
import { SchedulesDropdownField } from '../../../../shared/components/dropdown/schedules-dropdown-field/schedules-dropdown-field';
import { ModalitiesDropdownField } from '../../../../shared/components/dropdown/modalities-dropdown-field/modalities-dropdown-field';
import { AcademicHistoryForm } from '../academic-history-form/academic-history-form';
import { EmployeeDocumentForm } from '../../interfaces/employee-document-form';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { finalize } from 'rxjs';
import { Notification } from '../../../../shared/components/notification/notification';
import { BloodDropdownFormField } from '../../../../shared/components/dropdown/blood-dropdown-form-field/blood-dropdown-form-field';
import { RegionalDropdownFormField } from '../../../../shared/components/dropdown/regional-dropdown-form-field/regional-dropdown-form-field';
import { ToastService } from '../../../../shared/services/toast.service';

type DocumentType = 'cv' | 'criminal_record' | 'general';

@Component({
  selector: 'app-form-employee-create',
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    ButtonModule,
    InputMaskModule,
    DatePickerModule,
    GenderTypeDropdownFormField,
    MaritalStatusDropdownFormField,
    TextareaModule,
    AreaDropdownFormField,
    UnitTypesDropdownFormField,
    PositionDropdownField,
    StatusEmployeesDropdownField,
    InputNumberModule,
    SchedulesDropdownField,
    ModalitiesDropdownField,
    AcademicHistoryForm,
    FormsModule,
    RegionalDropdownFormField,
    BloodDropdownFormField,
  ],
  templateUrl: './form-employee-create.html',
  styleUrl: './form-employee-create.scss',
})
export class FormEmployeeCreate {
  form: FormGroup;
  formSubmitted = false;
  public selectedOrganizationalUnit!: string;

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private _toastService = inject(ToastService);
  private _loadingService = inject(LoadingService);
  private _dialogService = inject(DialogService);
  private _employeesService = inject(EmployeesService);

  documentTypes = [
    {
      type: 'cv' as DocumentType,
      label: 'Currículum Vitae',
      description: 'PDF, DOC, DOCX',
      icon: 'pi pi-id-card',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
    },
    {
      type: 'criminal_record' as DocumentType,
      label: 'Antecedentes Penales',
      description: 'Lleva fecha de vencimiento',
      icon: 'pi pi-shield',
      bg: 'bg-orange-50',
      text: 'text-orange-500',
    },
    {
      type: 'general' as DocumentType,
      label: 'Documentos Generales',
      description: 'Cualquier otro documento',
      icon: 'pi pi-file',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
    },
  ];

  documents: EmployeeDocumentForm[] = [];
  selectedDocumentType: DocumentType | null = null;

  constructor() {
    this.form = new FormGroup({});
  }

  onSearchUserByDni() {
    const pattern = new RegExp('^([0-9]){13,13}$');
    let identity: string = this.form?.get('dni')?.value;
    if (pattern.test(identity)) {
      this._loadingService.onDisplayLoading();
      this._employeesService
        .verifyStatus(identity)
        .pipe(
          finalize(() => {
            this._loadingService.onHideLoading();
          }),
        )
        .subscribe({
          next: (res) => {
            const { person, rnp, InternalRNP } = res;
            if (res.person) {
              this.openNotification({
                type: 1,
                person,
              });
            } else if (InternalRNP) {
              const formData = {
                firstName: InternalRNP.primerNombre || '',
                middleName: InternalRNP.segundoNombre || '',
                lastName: InternalRNP.primerApellido || '',
                secondLastName: InternalRNP.segundoApellido || '',
                birth_date: InternalRNP.fechaNacimiento
                  ? new Date(InternalRNP.fechaNacimiento)
                  : null,
                gender: InternalRNP.codigoSexo === 1 ? 'male' : 'female',
              };

              this.form.patchValue({
                ...formData,
              });
            } else if (rnp) {
              const nombres = (rnp?.Nombres || '').trim().split(/\s+/).filter(Boolean);

              const formData = {
                firstName: nombres[0] || '',
                middleName: nombres.slice(1).join(' ') || '',
                lastName: rnp.PrimerApellido || '',
                secondLastName: rnp.SegundoApellido || '',
                birth_date: rnp.FechaDeNacimiento ? new Date(rnp.FechaDeNacimiento) : null,
                marital_status: this.titleCase(rnp.DescrEstadoCivil),
                gender: rnp.Sexo === 'M' ? 'male' : 'female',
              };

              this.form.patchValue({
                ...formData,
              });
            }
          },
        });
    }
  }

  titleCase(value: string): string {
    const data = [
      { name: 'Casado(a)', id: 'married' },
      { name: 'Soltero(a)', id: 'single' },
      { name: 'Union Libre', id: 'divorced' },
      { name: 'Viudo(a)', id: 'widowed' },
    ];

    const dataCase = value
      .toLowerCase()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return data.find((m) => m.name === dataCase)?.id || '';
  }

  openNotification(data: any) {
    this._dialogService.open(Notification, {
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      contentStyle: {
        'min-width': '400px',
        overflow: 'auto',
      },
      showHeader: false,
      closable: true,

      styleClass: 'col458',
      baseZIndex: 10,
      data,
      focusOnShow: false,
    });
  }

  selectDocumentType(type: DocumentType, fileInput: HTMLInputElement) {
    if (this.isDocumentTypeDisabled(type)) return;

    this.selectedDocumentType = type;
    fileInput.value = '';
    fileInput.click();
  }

  onDocumentSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || !this.selectedDocumentType) return;

    const selectedType = this.documentTypes.find((item) => item.type === this.selectedDocumentType);

    this.documents.unshift({
      id: crypto.randomUUID(),
      type: this.selectedDocumentType,
      label: selectedType?.label ?? 'Documento',
      file,
      fileName: file.name,
      sizeLabel: this.formatFileSize(file.size),
      expirationDate: null,
      notes: '',
      saved: false,
    });

    this.selectedDocumentType = null;
  }

  hasDocumentType(type: DocumentType): boolean {
    return this.documents.some((doc) => doc.type === type);
  }

  isDocumentTypeDisabled(type: DocumentType): boolean {
    return type === 'cv' || type === 'criminal_record' ? this.hasDocumentType(type) : false;
  }

  formatFileSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  removeDocument(id: string) {
    this.documents = this.documents.filter((doc) => doc.id !== id);
  }

  documentIcon(type: DocumentType): string {
    if (type === 'criminal_record') return 'pi pi-shield';
    if (type === 'cv') return 'pi pi-id-card';
    return 'pi pi-file';
  }

  documentBorder(type: DocumentType): string {
    if (type === 'criminal_record') return 'border-l-4 border-l-emerald-500';
    if (type === 'cv') return 'border-l-4 border-l-slate-500';
    return 'border-l-4 border-l-blue-500';
  }

  validateDocuments(): boolean {
    const invalidCriminalRecord = this.documents.some(
      (doc) => doc.type === 'criminal_record' && !doc.expirationDate,
    );

    return !invalidCriminalRecord;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      rtn: ['', [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [null, [Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      secondLastName: [null, [Validators.minLength(2)]],
      gender: [null, [Validators.required]],
      biometric_id: [null],
      marital_status: [null, [Validators.required]],
      type_blood: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      birth_place: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      schedule_id: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      regional_id: [null, [Validators.required]],
      status: ['active', [Validators.required]],
      //watches_id: [null, [Validators.required]],

      //! Información Laboral /////////////////////////////
      no_organizational_type: [null, [Validators.required]],
      area_id: [null, [Validators.required]],
      nominal_position: [null, [Validators.required]],
      functional_position: [null, [Validators.required]],
      start_date: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      modality_id: [null, [Validators.required]],

      //! Datos académicos ///////////////////////////////
      academicHistory: this.fb.array([]),

      //! Datos de contacto en caso de emergencia ////////
      emergency_contact_name: [null, [Validators.required]],
      emergency_contact_relationship: [null, [Validators.required]],
      emergency_contact_phone: [null, [Validators.required]],
    });

    this.form.get('no_organizational_type')?.valueChanges.subscribe((value) => {
      this.selectedOrganizationalUnit = value;
      this.form.get('area_id')?.reset();
    });
  }

  isRequired(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control || !control.validator) return false;

    const validator = control.validator({} as FormControl);
    return validator?.['required'] ?? false;
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._loadingService.onDisplayLoading();

    const payload = {
      ...this.form.getRawValue(),
      documents: await this.prepareDocuments(),
    };

    this._employeesService
      .createPolicy(payload)
      .pipe(finalize(() => this._loadingService.onHideLoading()))
      .subscribe({
        next: (_) => {
          this._toastService.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Empleado creado correctamente',
          });
          this.form.reset({
            currency: this.form.get('status')?.value,
          });
          this.documents = [];
        },
        error: (error) => {
          const detail =
            error.status === 0
              ? 'No se puede realizar la conexión al servidor'
              : error.error?.message || error.message;

          this._toastService.show({
            severity: 'error',
            summary: 'Error',
            detail,
          });
        },
      });
  }

  async prepareDocuments() {
    return Promise.all(
      this.documents.map(async (doc) => {
        const base64 = await this.toBase64(doc.file);
        const extension = doc.file.name.split('.').pop()?.toLowerCase() ?? '';

        return {
          documentTypeKey: doc.type,
          originalName: doc.file.name,
          name: doc.file.name,
          extension,
          mimeType: doc.file.type,
          size: doc.file.size,
          base64,
          expirationDate: doc.expirationDate,
          notes: doc.notes,
        };
      }),
    );
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // solo base64 limpio
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
