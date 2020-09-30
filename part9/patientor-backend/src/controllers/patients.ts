import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const patients = patientsService.getNonSensitiveEntries();

    res.json(patients);
  } catch (error) {
    res.status(404).json({ error: 'Something went wrong!' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const patient = patientsService.getEntry(id);

    res.json(patient);
  } catch (error) {
    res.status(404).json({ error: 'Something went wrong!' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addEntry(newPatientEntry);

    res.status(201).json(addedEntry);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

export default router;
