import {
  Patient,
  PublicPatient,
  NewPatientEntry,
  NewEntry,
  Entry,
} from '../types/patients';
import patients from '../../data/patients';
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
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const addPatientEntry = (
  idOfPatient: string,
  entry: NewEntry
): Patient | undefined => {
  const id = `${uid(8)}-${uid(4)}-${uid(4)}-${uid(12)}`;

  const newEntry = {
    id,
    ...(entry as NewEntry),
  };

  for (let i = 0; i < patients.length; i++) {
    const currentPatient = patients[i];

    if (currentPatient.id === idOfPatient) {
      patients
        .find((p) => p.id === idOfPatient)
        ?.entries.push(newEntry as Entry);
    }
  }

  return patients.find((p) => p.id === idOfPatient);
};

export default {
  getEntries,
  getEntry,
  getNonSensitiveEntries,
  addEntry,
  addPatientEntry,
};
