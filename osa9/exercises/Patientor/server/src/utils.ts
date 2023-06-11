import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseValue = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect or missing value.");
  }
  return value;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender" + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  // const parseDiagnosisCodes = (object: unknown): Array<Diagnoses['code']> => {
  // 	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
  // 		return [] as Array<Diagnoses['code']>;
  // 	}
  // 	return object.diagnosisCodes as Array<Diagnoses['code']>;
  // };

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseValue(object.name),
      dateOfBirth: parseValue(object.dateOfBirth),
      ssn: parseValue(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseValue(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing.");
};

export default toNewPatientEntry;
