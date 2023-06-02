import { v1 as uuid } from "uuid";
import patients from "../../data/patients";

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
  NonSensitivePatient,
} from "../types";

const randomId = uuid();

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
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

const getNonSensitivePatient = (
  id: string
): NonSensitivePatient | undefined => {
  return patients.find((pati) => pati.id === id);
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  getNonSensitivePatient,
};
