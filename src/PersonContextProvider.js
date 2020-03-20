import React, { createContext, useState } from "react";

export const PersonContext = createContext();

export const PersonContextProvider = props => {
  const [person, setPerson] = useState({ age: "default", mood: "default" });
  const value = { person, setPerson };

  return (
    <PersonContext.Provider value={value}>
      {props.children}
    </PersonContext.Provider>
  );
};

export default PersonContextProvider;
