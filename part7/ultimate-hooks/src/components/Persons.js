import React from 'react';
import useResource from '../hooks/useResource';
import Person from './Person';

const Persons = () => {
  const [persons] = useResource('http://localhost:3005/persons');

  return persons.map((n) => <Person key={n.id} person={n} />);
};

export default Persons;
