import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext(); // step 1

// step 3
export const useNameContext = () => {
  return useContext(GlobalContext);
};

// step 2
export const GlobalProvider = ({ children }) => {
  const [val, setVal] = useState("lalit");

  return (
    <GlobalContext.Provider>
      <div>
        <h2>Global Context</h2>
        <h3>Current Name: {val}</h3>
        <button onClick={() => setVal("John")}>Change Name</button>
        {children}
      </div>
    </GlobalContext.Provider>
  );
};
