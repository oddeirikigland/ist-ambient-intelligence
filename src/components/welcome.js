import React, { useEffect, useContext } from "react";

import { PersonContext } from "../PersonContextProvider";

function Welcome() {
  const { person, setPerson } = useContext(PersonContext);
  useEffect(() => {}, []);

  return (
    <div className="WelcomeComp">
      <p>Age: {person.age}</p>
      <p>Mood: {person.mood}</p>
    </div>
  );
}

export default Welcome;
