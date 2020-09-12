import React from 'react';
import CountryDetails from './CountryDetails';
import WeatherDetails from './WeatherDetails';

const Country = ({ country }) => {
  return (
    <div>
      <CountryDetails country={country} />
      <WeatherDetails capital={country.capital} />
    </div>
  );
};

export default Country;
