import React from 'react';
import Country from './Country';

const Countries = ({ countries, search }) => {
  const filteredCountries = search
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return filteredCountries.map((country) => (
      <Country
        key={country.name}
        country={country}
        displayInformation={filteredCountries.length === 1}
      />
    ));
  }
};

export default Countries;
