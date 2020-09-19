import useField from '../hooks/useField';
import useResource from '../hooks/useResource';
import React from 'react';

const PersonForm = () => {
  const name = useField('text');
  const number = useField('text');
  const [, personService] = useResource('http://localhost:3005/persons');

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.onReset();
    number.onReset();
  };

  return (
    <div>
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
    </div>
  );
};

export default PersonForm;
