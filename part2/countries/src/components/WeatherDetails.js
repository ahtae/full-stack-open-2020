import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const WeatherDetails = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  const hook = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  };

  useEffect(hook, []);

  if (weather) {
    return (
      <div>
        <h2>{`Weather in ${capital}`}</h2>
        <div>
          <strong>temperature: </strong>
          {weather.temperature} Celsius
        </div>
        <img src={weather.weather_icons[0]} alt="weather" />
        <div>
          <strong>wind: </strong>
          {weather.wind_speed} mph direction {weather.wind_dir}
        </div>
      </div>
    );
  }

  return null;
};

export default WeatherDetails;
