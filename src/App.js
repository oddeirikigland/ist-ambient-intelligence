import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Monitor from "./components/monitor";
import FaceRegister from "./components/faceRecognition/faceRegister";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Monitor />
          </Route>
          <Route path="/register">
            <FaceRegister />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
