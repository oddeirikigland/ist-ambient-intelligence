import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "./clock.css";

function ClockComp() {
  const [state, setState] = useState(0);
  useEffect(() => {
    setInterval(() => setState({ date: new Date() }), 1000);
  }, []);

  return (
    <div className="ClockComp">
      <Clock value={state.date} />
    </div>
  );
}

export default ClockComp;
