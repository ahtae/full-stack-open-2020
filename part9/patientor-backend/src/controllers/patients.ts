import express from 'express';
import patientsService from '../services/patientsService';

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
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientsService.addEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.status(201).json(newPatientEntry);
});

export default router;
