import React from 'react';
import Person from './Person';

const Persons = ({ persons, search, removePerson }) => {
  const filteredPersons = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  return filteredPersons.map((person) => (
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
      removePerson={() => removePerson(person.id)}
    />
  ));
};

export default Persons;
