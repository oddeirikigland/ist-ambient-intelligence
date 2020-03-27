import React, { useContext } from "react";

import { PersonContext } from "../PersonContextProvider";

function Welcome() {
  const personContext = useContext(PersonContext);

  return (
    <div className="WelcomeComp">
<<<<<<< HEAD
      <p>
        Welcome{" "}
        {personContext.person.name !== "default" &&
          personContext.person.name + "!"}
      </p>
=======
      <p>Welcome {person.name !== "default" && person.name + "!"}</p>
>>>>>>> 16f34aea9acda851fe0d43d58cd7fcca0e9b4c37
    </div>
  );
}

export default Welcome;
