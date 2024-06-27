// src/components/HomeScreen.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-6xl font-bold font-cursive text-black mb-8 animate-pulse ">
        Say Bingo
      </h1>
      <div className="space-y-4 flex flex-col w-full sm:w-[500px] p-5">
        <Link
          to={"/enter-name"}
          className="bg-white text-center text-green-500 py-4 font-cursive  px-8 rounded-md shadow-md font-semibold text-xl"
        >
          Create a Game
        </Link>
        <Link
          to={"/enter-name"}
          className="bg-white text-center text-blue-500 py-4 px-8  font-cursive rounded-md shadow-md font-semibold text-xl"
        >
          Join a Game
        </Link>
      </div>
    </div>
  );
};

export default Home;
