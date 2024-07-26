import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { EnterName, Game, Room } from "./pages";
//import { GlobalContextProvider } from "./context/GlobalContext";

export const GlobalContext = createContext();

const App = () => {
  const [name, setName] = useState("");
  const [mainRoomCode, setMainRoomCode] = useState("");
  const [player, setPlayer] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        name,
        setName,
        mainRoomCode,
        setMainRoomCode,
        player,
        setPlayer,
      }}
    >
      <Routes>
        <Route path="/" element={<EnterName />} />
        <Route path="/room" element={<Room />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </GlobalContext.Provider>
    // <div>hii</div>
  );
};

export default App;
