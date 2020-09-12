import React, { useState } from 'react';
import CountryDetails from './CountryDetails';

const SingleCountry = ({ country }) => {
  const [showInformation, setShowInformation] = useState(false);

  const handleShowInformationClick = () => {
    setShowInformation(!showInformation);
  };

  const countryInformation = showInformation ? (
    <CountryDetails country={country} />
  ) : null;

  const showCountryButton = (
    <button onClick={handleShowInformationClick}>
      {showInformation ? 'hide' : 'show'}
    </button>
  );

  return (
    <div>
      <div>
        {country.name} {showCountryButton}
      </div>
      {countryInformation}
    </div>
  );
};

export default SingleCountry;
