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

export default router;
