import React, { useContext } from "react";

import { PersonContext } from "../PersonContextProvider";

function Welcome() {
  const personContext = useContext(PersonContext);

  return (
    <div className="WelcomeComp">
      <p>
        Welcome{" "}
        {personContext.person.name !== "default" &&
          personContext.person.name + "!"}
      </p>
    </div>
  );
}

export default Welcome;
