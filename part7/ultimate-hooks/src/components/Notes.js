import React from 'react';
import useResource from '../hooks/useResource';
import Note from './Note';

const Notes = () => {
  const [notes] = useResource('http://localhost:3005/notes');

  return notes.map((n) => <Note key={n.id} note={n} />);
};

export default Notes;
