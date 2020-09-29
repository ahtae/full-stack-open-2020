import express from 'express';
import { calculateBmi } from '../body-mass/bmiCalculator';

const PORT = 3003;
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.json({
      error: 'malformatted parameters',
    });
  } else {
    res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
