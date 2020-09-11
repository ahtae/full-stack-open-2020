import React from 'react';

const Filter = ({ search, handleSearchChange }) => {
  return <input value={search} onChange={handleSearchChange} />
};

export default Filter;
