import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import EnterName from "./pages/EnterName/EnterName";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EnterName />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
