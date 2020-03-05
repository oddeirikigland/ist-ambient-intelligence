import React from "react";
import "./App.css";
import Weather from "./components/weather";
import ClockComp from "./components/clock";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="one">
          <ClockComp />
        </div>
        <div className="two">
          <Weather />
        </div>
        <div className="three">Three</div>
        <div className="four">Four</div>
        <div className="five">Five</div>
        <div className="six">Six</div>
        <div className="seven">Seven</div>
        <div className="eight">Eight</div>
        <div className="nine">Nine</div>
      </div>
    </div>
  );
}

export default App;
