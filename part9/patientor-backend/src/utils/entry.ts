import {
  HealthCheckRating,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from '../types/patients';

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }

  return specialist;
};

const parseHealthCheckRating = (param: any): HealthCheckRating => {
  if (param === undefined || param === null || !isNumber(param)) {
    throw new Error('Incorrect or missing health check rating: ' + param);
  }

  return param;
};

const isNumber = (num: any): boolean => {
  return typeof num === 'number';
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }

  return employerName;
};

export const toNewHealthCheckEntry = (
  object: any
): Omit<HealthCheckEntry, 'id'> => {
  const newEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    type: object.type,
    diagnosisCodes: object.diagnosisCodes,
  };

  if (!newEntry.diagnosisCodes) {
    delete newEntry.diagnosisCodes;
  }

  return newEntry;
};

export const toNewOccupationalHealthcareEntry = (
  object: any
): Omit<OccupationalHealthcareEntry, 'id'> => {
  const newEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    employerName: parseEmployerName(object.employerName),
    type: object.type,
    diagnosisCodes: object.diagnosisCodes,
  };

  if (!newEntry.diagnosisCodes) {
    delete newEntry.diagnosisCodes;
  }

  return newEntry;
};

export const toNewHospitalEntry = (object: any): Omit<HospitalEntry, 'id'> => {
  const newEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    type: object.type,
    discharge: object.discharge,
    diagnosisCodes: object.diagnosisCodes,
  };

  if (!newEntry.diagnosisCodes) {
    delete newEntry.diagnosisCodes;
  }

  return newEntry;
};
