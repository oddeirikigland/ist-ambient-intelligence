import React, { useContext } from "react";

import { PersonContext } from "../PersonContextProvider";
import "./welcome.css";

function Welcome() {
  const personContext = useContext(PersonContext);

  const Emoji = (props) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );

  const emojiMapping = {
    happy: "😃",
    angry: "😠",
    disgusted: "😖",
    sad: "😢",
    surprised: "😲",
    neutral: "😐",
    fearful: "😨",
  };

  return (
    <div className="WelcomeComp">
      <h3 className="comp-header">
        {personContext.person.name === "default"
          ? "No face detected."
          : "Hi " + personContext.person.name + "!"}
      </h3>

      <div className="mood-container">
        <h3 className="comp-header">Current mood: {"  "}</h3>
        <Emoji symbol={emojiMapping[personContext.person.expression]} />
      </div>
    </div>
  );
}

export default Welcome;
