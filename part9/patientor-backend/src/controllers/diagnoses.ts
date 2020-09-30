import diagnosesService from '../services/diagnosesService';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const diagnoses = diagnosesService.getEntries();

    res.json(diagnoses);
  } catch (error) {
    res.status(404).json({ error: 'Something went wrong!' });
  }
});

export default router;
