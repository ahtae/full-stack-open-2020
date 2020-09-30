import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
} from '../types/patients';
import patients from '../../data/patients.json';
import uid from 'uid';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const id = `${uid(8)}-${uid(4)}-${uid(4)}-${uid(12)}`;
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
