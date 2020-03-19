import React from "react";
import axios from "axios";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null
    };
  }

  componentDidMount() {
    this.getWeather();
  }
  getWeather() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
      )
      .then(response => {
        const weather = response.data;
        this.setState({ weather });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return this.state.weather ? (
      <div className="weather">
        <h3>Current weather</h3>
        <p>Location: {this.state.weather.name}</p>
        <p>Weather: {this.state.weather.weather[0].description}</p>
        <p>Temperature: {this.state.weather.main.temp}</p>
        <p>Wind Speed: {this.state.weather.wind.speed}</p>
      </div>
    ) : (
      <div>Loading..</div>
    );
  }
}

export default Weather;
