import React from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      locationFound: false,
    };
  }

  getWeather(lat, lon) {
    const fetchData = async () => {
      return await axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
      );
    };
    fetchData()
      .then((result) => {
        this.setState({ weather: result.data, locationFound: true });
      })
      .catch((error) => console.log(error));
  }

  renderWeatherIcon() {
    console.log(this.state.weather.weather[0].icon);
    return this.state.weather && this.state.weather.weather[0] ? (
      <img
        alt=""
        width="100"
        height="100"
        src={`https://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`}
      />
    ) : (
      <p></p>
    );
  }

  render() {
    if (!this.state.locationFound && this.props.coords) {
      this.getWeather(this.props.coords.latitude, this.props.coords.longitude);
    }
    const weather = this.state.weather;

    return weather ? (
      <div className="weather">
        <h3 className="comp-header">Current weather</h3>
        <div
          style={{
            width: "180px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          <p>Location: {weather.name}</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}</p>
          <p>Wind Speed: {weather.wind.speed}</p>
        </div>
        <div
          style={{
            width: "180px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {this.renderWeatherIcon()}
        </div>
      </div>
    ) : (
      <div>Loading..</div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Weather);
