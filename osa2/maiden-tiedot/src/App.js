import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ capital, apiKey }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
        );
        setWeather(response.data);
      } catch (error) {
        console.log(error);
        setWeather(null);
      }
    };

    fetchWeatherData();
  }, [capital, apiKey]);

  if (!weather) {
    return null;
  }

  const temperature = Math.round(weather.main.temp - 273.15);
  const weatherDescription = weather.weather[0].description;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {weatherDescription}</p>
      <img src={weatherIcon} alt="Weather Icon" />
    </div>
  );
};

const App = () => {
  const [valtio, setValtio] = useState('');
  const [maat, setMaat] = useState([]);
  const [valittuMaa, setValittuMaa] = useState(null);
  const [virhe, setVirhe] = useState('');

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  );

  useEffect(() => {
    const fetchCountryData = async () => {
      if (valtio) {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${valtio}`);
          const data = response.data;
          if (data.length > 10) {
            setMaat([]);
            setValittuMaa(null);
            setVirhe('Too many results, please refine your search');
          } else if (data.length > 1) {
            setMaat(data);
            setValittuMaa(null);
            setVirhe('');
          } else if (data.length === 1) {
            setMaat([]);
            setValittuMaa(data[0]);
            setVirhe('');
          } else {
            setMaat([]);
            setValittuMaa(null);
            setVirhe('No results found');
          }
        } catch (error) {
          console.log(error);
          setMaat([]);
          setValittuMaa(null);
          setVirhe('Error fetching data. Please try again.');
        }
      } else {
        setMaat([]);
        setValittuMaa(null);
        setVirhe('');
      }
    };

    fetchCountryData();
  }, [valtio]);

  const handleChange = (event) => {
    setValtio(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setValtio(valtio);
  };

  const showCountry = (country) => {
    setValittuMaa(country);
  };

  const renderMaat = () => {
    if (maat.length > 0) {
      return (
        <div>
          <ul>
            {maat.map(maa => (
              <li key={maa.name.common}>
                {maa.name.common}
                <Button text={'Show'} handleClick={() => showCountry(maa)} />
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  const apiKey = '183bd3d9d8ccc2d32a2431198b14f536';

  return (
    <div>
      <form onSubmit={onSearch}>
        <label htmlFor="valtio">Search country:</label>
        <input id="valtio" type="text" value={valtio} onChange={handleChange} />
      </form>
      {virhe && <p>{virhe}</p>}
      {maat.length > 10 && !valittuMaa && !virhe && <p>Too many results, please refine your search</p>}
      {maat.length <= 10 && !valittuMaa && !virhe && renderMaat()}
      {valittuMaa && (
        <div>
          <h2>{valittuMaa.name.common}</h2>
          <img src={valittuMaa.flags.png} alt={`${valittuMaa.name.common} Flag`} style={{ width: '200px' }} />
          <h3>Languages:</h3>
          <ul>
            {Object.values(valittuMaa.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <h3>Weather in capital</h3>
          <WeatherInfo capital={valittuMaa.capital[0]} apiKey={apiKey} />
        </div>
      )}
    </div>
  );
};

export default App;
