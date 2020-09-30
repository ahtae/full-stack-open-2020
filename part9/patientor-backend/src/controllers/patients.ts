import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const patients = patientsService.getNonSensitiveEntries();

    res.json(patients);
  } catch (error) {
    res.json({ error: 'Something went wrong!' });
  }
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedEntry = patientsService.addEntry(newPatientEntry);

  res.status(201).json(addedEntry);
});

export default router;
