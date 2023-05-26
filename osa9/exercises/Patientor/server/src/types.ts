export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export type Diagnoses = DiagnoseEntry;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type Patients = PatientEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
