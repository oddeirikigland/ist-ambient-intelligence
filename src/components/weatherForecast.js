import React from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";

const getHourFromUnixTimestamp = unix_timestamp => {
  var date = new Date(unix_timestamp * 1000);
  return date.getHours();
};

const getWeatherAtMidday = weather => {
  return weather.list.filter(forecast => {
    const hour = getHourFromUnixTimestamp(forecast.dt);
    return 10 < hour && hour < 12;
  });
};

const nextFiveDays = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const today = new Date().getDay();
  const nextDays = [];
  for (let i = 1; i < 6; i++) {
    nextDays.push(days[(today + i) % 7]);
  }
  return nextDays;
};

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      locationFound: false
    };
  }

  getForecast(lat, lon) {
    const fetchData = async () => {
      return await axios(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
      );
    };
    fetchData()
      .then(result => {
        this.setState({
          weather: getWeatherAtMidday(result.data),
          locationFound: true
        });
      })
      .catch(error => console.log(error));
  }

  renderDays() {
    return nextFiveDays().map((day, index) => {
      return <th key={index}>{day}</th>;
    });
  }

  renderWeatherIcon() {
    return this.state.weather.map((forecast, index) => {
      return (
        <th key={index}>
          <img
            alt=""
            src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
          />
        </th>
      );
    });
  }

  render() {
    if (!this.state.locationFound && this.props.coords) {
      this.getForecast(this.props.coords.latitude, this.props.coords.longitude);
    }
    const weather = this.state.weather;
    return weather ? (
      <div>
        <h3>Weather forecast next 5 days</h3>
        <table>
          <tbody>
            <tr>{this.renderDays()}</tr>
            <tr>{this.renderWeatherIcon()}</tr>
          </tbody>
        </table>
      </div>
    ) : (
      <p>Loading..</p>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(WeatherForecast);
