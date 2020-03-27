import React, { createContext, useState } from "react";

const store = { name: "default", gender: "unisex" };

export const PersonContext = createContext({
  person: store,
  setPerson: void {}
});

export const PersonContextProvider = ({ children }) => {
  const [person, setPerson] = useState(store);

  return (
    <PersonContext.Provider value={{ person, setPerson }}>
      {children}
    </PersonContext.Provider>
  );
};
