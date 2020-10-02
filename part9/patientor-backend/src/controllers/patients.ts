import express from 'express';
import patientsService from '../services/patientsService';
import {
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewOccupationalHealthcareEntry,
} from '../utils/entry';
import { Entry } from '../types/patients';
import toNewPatientEntry from '../utils/patients';

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

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    let newEntry;

    if (req.body.type === 'Hospital') {
      newEntry = toNewHospitalEntry(req.body);
    } else if (req.body.type === 'HealthCheck') {
      newEntry = toNewHealthCheckEntry(req.body);
    } else if (req.body.type === 'OccupationalHealthcareEntry') {
      newEntry = toNewOccupationalHealthcareEntry(req.body);
    }

    const patient = patientsService.addPatientEntry(id, newEntry as Entry);

    res.json(patient);
  } catch (error) {
    res.status(404).json({ error: 'Something went wrong!' });
  }
});

export default router;
