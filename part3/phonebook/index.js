const express = require('express');
const app = express();
const PORT = 3001;

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 10000000);
};

app.use(express.json());

app.get('/info', (req, res) => {
  res.write(`<p>Phonebook has info for ${persons.length} people</p>`);
  res.write(`${new Date()}`);
  res.end();
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { body } = req;

  if (!body.name) {
    res.status(400).json({ error: 'name missing' });
  } else if (!body.number) {
    res.status(400).json({ error: 'number missing' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
