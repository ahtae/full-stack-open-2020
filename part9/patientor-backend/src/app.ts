import express from 'express';
import cors from 'cors';
import diagnosesRouter from './controllers/diagnoses';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

export default app;
