import React from "react";
import "./monitor.css";
import Weather from "./weather";
import ClockComp from "./clock";
import FaceRec from "./faceRecognition/faceRec";
import Header from "./heading";
import Welcome from "./welcome";
import Message from "./message";
import WeatherForecast from "./weatherForecast";
import Postit from "./postit";

const Monitor = () => {
  return (
    <div className="Monitor">
      <Header />
      <div className="wrapper">
        <div>
          <ClockComp />
        </div>
        <div>
          <Weather />
        </div>
        <div>
          <WeatherForecast />
        </div>
        <div>
          <Welcome />
        </div>
        <div>Five</div>
        <div>
          <Message />
        </div>
        <div>
          <FaceRec />
        </div>
        <div>Eight</div>
        <div><Postit/></div>
      </div>
    </div>
  );
};

export default Monitor;
