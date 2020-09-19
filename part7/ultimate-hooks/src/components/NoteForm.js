import React from 'react';
import useField from '../hooks/useField';
import useResource from '../hooks/useResource';

const NoteForm = () => {
  const content = useField('text');
  const [, noteService] = useResource('http://localhost:3005/notes');

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.onReset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input name="content" {...content} />
        <button>create</button>
      </form>
    </div>
  );
};

export default NoteForm;
