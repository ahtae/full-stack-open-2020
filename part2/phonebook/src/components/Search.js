import React from 'react';

const Search = ({ search, handleSearchChange }) => {
  return <input value={search} onChange={handleSearchChange} />
};

export default Search;
