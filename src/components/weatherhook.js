import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherHook() {
  const [weather, setWeather] = useState(0);

  useEffect(() => {
    setWeather(
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
        )
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    );
  });

  return weather ? (
    <div className="weather">
      <h3>Current weather</h3>
      <p>Location: {weather.name}</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}</p>
      <p>Wind Speed: {weather.wind.speed}</p>
    </div>
  ) : (
    <div>Loading..</div>
  );
}
export default WeatherHook;
