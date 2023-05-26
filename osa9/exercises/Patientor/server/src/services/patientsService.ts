import { v1 as uuid } from "uuid";
import patients from "../../data/patients";

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";

const randomId = uuid();

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (
  // name: string,
  // dateOfBirth: string,
  // ssn: string,
  // gender: string,
  // occupation: string
  entry: NewPatientEntry
): PatientEntry => {
  const newPatientEntry = {
    id: randomId,
    ...entry,
    // name,
    // dateOfBirth,
    // ssn,
    // gender,
    // occupation,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
};
