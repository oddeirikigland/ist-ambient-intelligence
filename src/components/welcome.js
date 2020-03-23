import React, { useContext } from "react";

import { PersonContext } from "../PersonContextProvider";

function Welcome() {
  const { person, setPerson } = useContext(PersonContext);

  return (
    <div className="WelcomeComp">
      <p>Welcome {person.name != "default" && person.name}</p>
    </div>
  );
}

export default Welcome;
