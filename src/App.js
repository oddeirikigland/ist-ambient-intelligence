import React from "react";
import "./App.css";
import Weather from "./components/weather";
import ClockComp from "./components/clock";
import FaceRec from "./components/faceRecognition/faceRec";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div>
          <ClockComp />
        </div>
        <div>
          <Weather />
        </div>
        <div>Three</div>
        <div>Four</div>
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

export default App;
