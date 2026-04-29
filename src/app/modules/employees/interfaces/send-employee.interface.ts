export interface sendEmployeeInterface {
  dni: string;
  rtn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  gender: string;
  biometric_id: string;
  marital_status: string;
  type_blood: string;
  birth_date: string;
  birth_place: string;
  address: string;
  schedule_id: string;
  email: string;
  phone: string;
  regional_id: string;
  status: string;
  no_organizational_type: string;
  area_id: string;
  nominal_position: string;
  functional_position: string;
  start_date: string;
  salary: number;
  modality_id: string;
  academicHistory: AcademicHistory[];
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: string;
  documents: Document[];
}

interface Document {
  documentTypeKey: string;
  originalName: string;
  name: string;
  extension: string;
  mimeType: string;
  size: number;
  base64: string;
  expirationDate: null | string;
  notes: string;
}

interface AcademicHistory {
  level: Level;
  institution: string;
  career: string;
  title: string;
  startYear: number;
  endYear: number;
  inProgress: boolean;
  notes: string;
}

interface Level {
  name: string;
  value: string;
}
