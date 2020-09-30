import { Patient, PublicPatient, NewPatientEntry } from '../types/patients';
import patients from '../../data/patients.json';
import uid from 'uid';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getEntry = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getNonSensitiveEntries = (): Array<PublicPatient> => {
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
    entries: [],
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getEntries,
  getEntry,
  getNonSensitiveEntries,
  addEntry,
};
