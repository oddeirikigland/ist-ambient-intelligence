import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Monitor from "./components/monitor";
import FaceRegister from "./components/faceRecognition/faceRegister";
import { PersonContextProvider } from "./PersonContextProvider";
import RandomBackground from "./components/randomBackground";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${RandomBackground()})` }}
    >
      <PersonContextProvider>
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
      </PersonContextProvider>
    </div>
  );
}

export default App;
