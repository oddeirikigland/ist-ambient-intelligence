import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Monitor from "./components/monitor";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Monitor />
          </Route>
          <Route path="/register">asd</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
