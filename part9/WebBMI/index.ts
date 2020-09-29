import express from 'express';
import { calculateBmi } from '../body-mass/bmiCalculator';
import { calculateExercises } from '../body-mass/exerciseCalculator';

const PORT = 3003;
const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const dailyExercises: Array<any> = req.body.daily_exercises;
  const target = req.body.target;
  const totalSum = dailyExercises.reduce((sum: string, num) => sum + num, '');

  console.log(target, totalSum);

  if (!dailyExercises || !target) {
    res.json({
      error: 'parameters missing',
    });
  } else if (isNaN(Number(totalSum)) || isNaN(Number(target))) {
    res.json({
      error: 'Provided values were not numbers!',
    });
  } else {
    const mappedDailyExercises = dailyExercises.map((exercise) =>
      Number(exercise)
    );
    const numifiedTarget = Number(target);

    res.json(calculateExercises(mappedDailyExercises, numifiedTarget));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
