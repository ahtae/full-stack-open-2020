import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();

    const doesNameAlreadyExist = persons.some(
      (person) => person.name === newName
    );

    const personObject = { name: newName, number: newPhoneNumber };

    if (doesNameAlreadyExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.filter(
          (person) => person.name === newName
        )[0];
        const { id } = personToUpdate;

        personService
          .update(id, personObject)
          .then((updatedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.name === newName ? updatedPerson : person
            );

            setPersons(updatedPersons);
            setMessage(`Updated ${newName}`);
            setMessageType('success');

            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(`Person '${newName}' has already removed from server`);
            setMessageType('error');

            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${newName}`);
          setMessageType('success');

          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage(`Person '${newName}' cannot be added to the server`);
          setMessageType('error');

          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        });
    }

    setNewName('');
    setNewPhoneNumber('');
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const { name } = person;

    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((removedPerson) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`Removed ${name}`);
          setMessageType('success');

          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage(
            `Information of ${person.name} has already been removed from the server`
          );
          setMessageType('error');

          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        });
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
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        setMessage('Cannot retrieve all the persons in the phonebook');
        setMessageType('error');

        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      });
  };

  useEffect(hook, []);

  return (
    <div>
      <Notification message={message} messageType={messageType} />
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
      <Persons persons={persons} search={search} removePerson={removePerson} />
    </div>
  );
};

export default App;
