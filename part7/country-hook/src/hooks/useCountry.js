import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchCountryInformation() {
      try {
        const response = await axios.get(
          `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
        );

        setCountry({ data: response.data[0], found: true });
      } catch (err) {
        setCountry({ found: false });
      }
    }

    fetchCountryInformation();
    console.log('yyy');
  }, [name]);

  return country;
};

export default useCountry;
