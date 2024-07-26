import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";

const EnterName = () => {
  const { name, setName } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("name", JSON.stringify(name));
    navigate("/room");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-6xl font-bold font-cursive text-white mb-8">
        <span className="text-pink-700  animate-pulse">Name</span> Please
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col w-full sm:w-[500px] p-5"
      >
        <input
          type="text"
          className={`px-4 py-4 rounded-md text-center font-cursive text-lg `}
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          disabled={name.trim() === ""}
          type="submit"
          className={`bg-white font-cursive text-green-500 py-4 px-8 rounded-md shadow-md hover:bg-slate-300 font-semibold text-xl ${
            name.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Get Started
        </button>
        {/* {isPortBusy && <p className="text-red-500 mt-2">{"Port is Busy"}</p>} */}
      </form>
    </div>
  );
};

export default EnterName;
