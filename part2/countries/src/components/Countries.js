import React from 'react';
import SingleCountry from './SingleCountry';
import Country from './Country';

const Countries = ({ countries, search }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return countries.map((country) => (
      <SingleCountry key={country.name} country={country} />
    ));
  }
};

export default Countries;
