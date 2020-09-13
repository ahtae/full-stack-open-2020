require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
const PORT = process.env.PORT || 3001;

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);
app.use(express.static('build'));

app.use(cors());

app.use(express.json());

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.method(req, res) === 'POST' ? JSON.stringify(req.body) : null,
    ].join(' ');
  })
);

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.write(`<p>Phonebook has info for ${persons.length} people</p>`);
    res.write(`${new Date()}`);
    res.end();
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res) => {
  const { body } = req;

  if (!body.name) {
    res.status(400).json({ error: 'name missing' });
  } else if (!body.number) {
    res.status(400).json({ error: 'number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.use(unknownEndpoint);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
