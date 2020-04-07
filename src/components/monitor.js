import React from "react";
import "./monitor.css";
import Weather from "./weather";
import ClockComp from "./clock";
import FaceRec from "./faceRecognition/faceRec";
import Header from "./heading";
import Welcome from "./welcome";
import Message from "./message";

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
        <div>Three</div>
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
        <div>Nine</div>
      </div>
    </div>
  );
};

export default Monitor;
