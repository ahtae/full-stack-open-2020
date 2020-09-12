import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  };

  useEffect(hook, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries search={search} countries={countries} />
    </div>
  );
}

// The API https://restcountries.eu provides a data for different countries in a machine readable format, a so-called REST API.

// Create an application, in which one can look at data of various countries. The application should probably get the data from the endpoint all.

// The user interface is very simple. The country to be shown is found by typing a search query into the search field.

// If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific:

// fullstack content
// If there are ten or fewer countries, but more than one, then all countries matching the query are shown:

// fullstack content
// When there is only one country matching the query, then the basic data of the country, its flag and the languages spoken there, are shown:

// fullstack content
// NB: It is enough that your application works for most of the countries. Some countries, like Sudan, can cause be hard to support, since the name of the country is part of the name of another country, South Sudan. You need not to worry about these edge cases.

// WARNING create-react-app will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. Most likely you do not want each of your projects to be a separate repository, so simply run the rm -rf .git command at the root of your application.
export default App;
