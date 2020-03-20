import React from "react";
import "./monitor.css";
import Weather from "./weather";
import ClockComp from "./clock";
import FaceRec from "./faceRecognition/faceRec";
import Welcome from "./welcome";

function Monitor() {
  return (
    <div className="Monitor">
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
        <div>Six</div>
        <div>
          <FaceRec />
        </div>
        <div>Eight</div>
        <div>Nine</div>
      </div>
    </div>
  );
}

export default Monitor;
