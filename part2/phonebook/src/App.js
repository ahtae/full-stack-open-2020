import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [search, setSearch] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const doesNameAlreadyExist = persons.some(
      (person) => person.name === newName
    );

    if (doesNameAlreadyExist) {
      alert(`${newName} has already been added to phonebook!`);
    } else {
      const personObject = { name: newName, number: newPhoneNumber };

      personService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));

      setNewName('');
      setNewPhoneNumber('');
    }
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const hook = () => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  };

  useEffect(hook, []);

  return (
    <div>
      <Header title="Phonebook" />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <PersonForm
        value={newName}
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newPhoneNumber={newPhoneNumber}
        handleNewPhoneNumberChange={handleNewPhoneNumberChange}
      />
      <Header title="Numbers" />
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
