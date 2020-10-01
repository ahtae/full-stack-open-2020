import { Diagnosis } from '../types/diagnoses';
import diagnoses from '../../data/diagnoses';

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries,
};
