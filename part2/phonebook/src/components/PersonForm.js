import React from 'react';

const PersonForm = ({ addPerson, newName, handleNewNameChange, newPhoneNumber, handleNewPhoneNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>number: <input value={newPhoneNumber} onChange={handleNewPhoneNumberChange} /></div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
