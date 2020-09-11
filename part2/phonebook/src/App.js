import React, { useState } from 'react';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const doesNameAlreadyExist = persons.some(
      (person) => person.name === newName
    );

    if (doesNameAlreadyExist) {
      alert(`${newName} has already been added to phonebook!`);
    } else {
      const updatedPersons = [
        ...persons,
        { name: newName, number: newPhoneNumber },
      ];

      setPersons(updatedPersons);
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

  return (
    <div>
      <Header title="Phonebook" />
      <PersonForm
        value={newName}
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newPhoneNumber={newPhoneNumber}
        handleNewPhoneNumberChange={handleNewPhoneNumberChange}
      />
      <Header title="Numbers" />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
