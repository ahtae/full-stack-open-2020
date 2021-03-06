import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_CODES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
      id: string;
    };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: entry,
    id,
  };
};

export const setDiagnosisCodes = (diagnosisCodes: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_CODES',
    payload: diagnosisCodes,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      };
    case 'SET_DIAGNOSIS_CODES':
      return {
        ...state,
        diagnosisCodes: action.payload,
      };
    case 'ADD_ENTRY':
      const updatedState = { ...state };

      if (updatedState.patient && updatedState.patient.id === action.id) {
        updatedState.patient.entries.push(action.payload);
      }

      return updatedState;
    default:
      return state;
  }
};
