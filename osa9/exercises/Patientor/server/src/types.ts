export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export type Diagnoses = DiagnoseEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type Patients = PatientEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;

export type NewPatientEntry = Omit<PatientEntry, "id">;
