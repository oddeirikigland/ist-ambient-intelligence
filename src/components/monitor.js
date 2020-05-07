import React from "react";
import "./monitor.css";
import Weather from "./weather";
import ClockComp from "./clock";
import FaceRec from "./faceRecognition/faceRec";
import Header from "./heading";
import Welcome from "./welcome";
import Message from "./message";
import Map from "./map";
import WeatherForecast from "./weatherForecast";
import Calender from "./calender";
import PostitParent from "./postitParent";

const Monitor = () => {
  return (
    <div className="Monitor">
      <Header />
      <div className="wrapper">
        <div>
          <WeatherForecast />
        </div>
        <div>
          <Weather />
        </div>
        <div>
          <FaceRec />
        </div>
        <div>
          <Welcome />
        </div>
        <div className="comp-container">
          <ClockComp />
        </div>
        <div>
          <Message />
        </div>
        <div className="comp-container">
          <Calender />
        </div>
        <div className="comp-container">
          <Map />
        </div>
        <div>
          <PostitParent />
        </div>
      </div>
    </div>
  );
};

export default Monitor;
