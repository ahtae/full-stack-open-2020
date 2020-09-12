import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const filteredCountries = search
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries search={search} countries={filteredCountries} />
    </div>
  );
}

export default App;
