import { NewPatientEntry } from '../types/patients';
import { Gender } from '../types/patients';

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries,
  };
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSSn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const isSSn = (ssn: string): boolean => {
  const arrayOfSsn = ssn.split('-');

  if (arrayOfSsn.length !== 2) {
    return false;
  } else if (arrayOfSsn[0].length !== 6 && arrayOfSsn[1].length !== 4) {
    return false;
  }

  return true;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;
