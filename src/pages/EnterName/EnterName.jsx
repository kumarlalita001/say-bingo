import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, get, set, ref, push } from "firebase/database";
import { app } from "../../utils/firebase";
const db = getDatabase();
const newDoc = push(ref(db, "users"));

const EnterName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    set(newDoc, {
      first: 1,
      second: 2,
      third: 3,
      four: 4,
      five: 5,
    })
      .then(() => alert("data send successfully"))
      .catch((err) => alert("error occured", err.code));

    // navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-6xl font-bold font-cursive text-white mb-8">
        <span className="text-blue-700 animate-pulse">Name</span> Please
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col w-full sm:w-[500px] p-5"
      >
        <input
          type="text"
          className="px-4 py-4 rounded-md text-center font-cursive text-lg"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-white font-cursive text-green-500 py-4 px-8 rounded-md shadow-md font-semibold text-xl"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default EnterName;
