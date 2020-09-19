import React from 'react';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  return (
    <div>
      <NoteForm />
      <Notes />
      <PersonForm />
      <Persons />
    </div>
  );
};

export default App;
