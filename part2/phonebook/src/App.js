import React, { useState } from 'react';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const updatedPersons = [...persons, { name: newName }];
    const doesNameAlreadyExist = persons.some(
      (person) => person.name === newName
    );

    if (doesNameAlreadyExist) {
      alert(`${newName} has already been added to phonebook!`);
      return;
    }

    setPersons(updatedPersons);
    setNewName('');
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <Header title="Phonebook" />
      <PersonForm
        value={newName}
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
      />
      <Header title="Numbers" />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
