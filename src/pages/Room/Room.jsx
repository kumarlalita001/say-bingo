import { getDatabase, onValue, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { app } from "../../utils/firebase";
import { GlobalContext } from "../../App";

const Room = () => {
  const navigate = useNavigate();
  const db = getDatabase(app);
  const [roomCode, setRoomCode] = useState(() => "");
  const [isRoomPresent, setIsRoomPresent] = useState(false);
  const { mainRoomCode, setMainRoomCode } = useContext(GlobalContext);
  const { player, setPlayer } = useContext(GlobalContext);

  const [nMc, setNMC] = useState("");

  function getRandomNumber(min = 1, max = 99999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // function generateVaildRoomCode() {
  //   let noOfTimesCalled = 0;

  // function inner() {
  //   const randomRoomCode = 3195;

  //   const portRef = ref(db, "PORT", 3195);

  //   console.log("portRef", portRef);

  //   onValue(portRef, (snapshot) => {
  //     console.log(snapshot.exists(), "snapshot");

  //     if (snapshot.exists()) {
  //       const newPort = JSON.parse(snapshot.val());
  //       console.log(newPort);
  //       console.log("port is busy choose another", newPort);

  //       return;
  //     } else {
  //       console.log("port availabe : ", randomRoomCode);
  //     }
  //   });

  //   return randomRoomCode;
  // }

  //   return inner;
  // }

  const setListener = () => {
    const portRef = ref(db, "PORT" + roomCode);

    onValue(portRef, (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const newPort = JSON.parse(snapshot.val());
        console.log("exit", snapshot.exists());

        console.log("yes Room code : ", roomCode, " is Correct");
        // room available
        setIsRoomPresent(true);
      } else {
        console.log(
          "invalid room code Please ask your friend correct room code"
        );
        setIsRoomPresent(false);
      }
    });

    // return () => gameRef.off(); // cleanup function to unsubscribe listener
  };

  const handleJoinRoomClick = (e) => {
    // 1. check the roomCode is empty of not
    // 2. check in backend that roomCode is Busy or not
    // if busy then show error message
    // 3. then after

    e.preventDefault();

    if (!isRoomPresent) {
      alert("Invalid Room Code Plase ask your friend correct Room Code");
      return;
    }

    setMainRoomCode(roomCode);
    localStorage.setItem("roomCode", JSON.stringify(roomCode));

    setPlayer("-Player2-");
    localStorage.setItem("player", JSON.stringify("-Player2-"));

    const newPortRef = ref(db, "PORT" + roomCode);
    set(newPortRef, JSON.stringify(roomCode));

    // 'alert("done");
    navigate("/game");
  };

  const handleCreateRoomClick = () => {
    // 1. generate a room code by own logic
    // 2. create a room using that room code
    // 3. redirect the user to GAME

    const newRoomCode = getRandomNumber();
    setNMC(newRoomCode);

    setMainRoomCode(newRoomCode);
    localStorage.setItem("roomCode", JSON.stringify(newRoomCode));

    setPlayer("-Player1-");
    localStorage.setItem("player", JSON.stringify("-Player1-"));

    // console.log("innner", inner());
    // const newRoomCode = newFunc();
    //console.log("setListener", setListener(newRoomCode));
    console.log("Generated Room Code : ", newRoomCode);

    // 4. check is the newRoomCode is already exist or not

    const newPortRef = ref(db, "PORT" + newRoomCode || 1234);
    set(newPortRef, JSON.stringify(newRoomCode || 1234));

    navigate("/game");
  };

  useEffect(() => {
    setListener();
  }, [roomCode]);

  //useEffect(() => {}, [isRoomPresent]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-6xl font-bold font-cursive text-black mb-8 animate-pulse ">
        Say Bingo
      </h1>
      <div className="space-y-4 flex flex-col w-full sm:w-[500px] p-5">
        <button
          onClick={handleCreateRoomClick}
          className="bg-white text-center text-green-500 py-4 font-cursive  px-8 rounded-md shadow-md font-semibold text-xl"
        >
          Create a Game
        </button>
        <h2 className="text-center font-cursive font-extrabold text-3xl">or</h2>
        <div className="w-full">
          <input
            onChange={(e) => setRoomCode(e.target.value)}
            type="number"
            placeholder=" Ask Your Friend  Ex : 8643  "
            className={`bg-white text-center text-green-500 py-4 font-cursive w-[80%]  px-8 rounded-md shadow-md font-semibold text-xl 
              ${isRoomPresent ? "text-green-500" : "text-red-500"} `}
          />
          <button
            // disabled={!isRoomPresent}
            onClick={handleJoinRoomClick}
            className={`bg-white text-center inline text-blue-500 py-4 w-[20%]  font-cursive rounded-md shadow-md font-semibold text-xl ${
              isRoomPresent ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
