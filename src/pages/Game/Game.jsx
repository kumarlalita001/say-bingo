// src/components/GameScreen.js
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { json, Link } from "react-router-dom";
import { app } from "../../utils/firebase";
import { GlobalContext } from "../../App";
import Loader from "../../components/Loader/Loader";
import Winner from "../../components/Winner/Winner";

const db = getDatabase(app);

const grid = Array(5)
  .fill()
  .map(() => Array(5).fill(null));

const generateBingoNumbers = () => {
  const numbers = [];
  while (numbers.length < 25) {
    const randomNum = Math.floor(Math.random() * 25) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
};

const fillGrid = () => {
  const numbers = generateBingoNumbers();
  let index = 0;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      grid[row][col] = numbers[index];
      index++;
    }
  }
};

fillGrid();

function flattenArray(arr) {
  // Using Array.prototype.concat() and spread operator to flatten the array
  return [].concat(...arr);
}

const arr = [];

const markCell = (row, col) => {
  if (grid[row][col] !== null) {
    grid[row][col] = "X";
  }
};

function findElementPosition(grid, element) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === element) {
        return { row: row, col: col };
      }
    }
  }
  // If element is not found, return null or handle accordingly
  return null;
}

const Game = () => {
  const [sayBingo, setSayBingo] = useState(false);
  let [numbers, setNumbers] = useState(() => flattenArray(grid));
  const { mainRoomCode } = useContext(GlobalContext);

  const [isWin, setIsWin] = useState(false);
  const [clickNumber, setClickNumber] = useState("X");

  const [whoWins, setWhoWins] = useState("");

  let [fetchedArray, setFetchedArray] = useState([]);

  const [isRestart, setIsRestart] = useState(false);

  const checkWin = () => {
    let checked = 0;
    // Check rows
    for (let row = 0; row < 5; row++) {
      checked += grid[row].every((cell) => cell === "X");
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      checked += grid.map((row) => row[col]).every((cell) => cell === "X");
    }

    // Check diagonals
    if (grid.map((row, idx) => row[idx]).every((cell) => cell === "X"))
      checked += 1;
    if (grid.map((row, idx) => row[4 - idx]).every((cell) => cell === "X"))
      checked += 1;

    return checked;
  };

  //const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

  const updateGrid = () => {
    const roomCode = JSON.parse(localStorage.getItem("roomCode"));
    const player = JSON.parse(localStorage.getItem("player"));

    const newGridRef = ref(db, "GRID" + player + roomCode);
    set(newGridRef, JSON.stringify(arr));
  };

  const [noOfWin, setNoOfWin] = useState(0);
  const handleNumberClick = (number) => {
    const sound = new Audio("sound2.wav");
    sound.play();

    // console.log("clicked", number);
    setClickNumber(number);
    arr.push(number);
    console.log("My Clicks -----", arr);

    const position = findElementPosition(grid, number);
    markCell(position?.row, position?.col);

    updateGrid();

    setNoOfWin(checkWin());
    console.log("wins : ==============", checkWin());

    // if (navigator?.vibrate) {
    //   navigator.vibrate([200]); // Vibrate for 200ms
    // }

    // console.log("win", noOfWin);
    if (noOfWin >= 5) {
      //setIsWin(true);

      setSayBingo(true);

      //const sound = new Audio("royalwin.wav");
      //sound.play();
      console.log("Game Over");
      alert("Say BIngo");
      return;
    }
  };

  const setListener = () => {
    const roomCode = JSON.parse(localStorage.getItem("roomCode"));

    const player = JSON.parse(localStorage.getItem("player"));

    const fetchPlayer = player === "-Player1-" ? "-Player2-" : "-Player1-";

    const gridRef = ref(db, "GRID" + fetchPlayer + roomCode);

    onValue(gridRef, (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const newGrid = JSON.parse(snapshot.val());

        setFetchedArray(newGrid);
        console.log("fetchedArray : ", fetchedArray);

        fetchedArray.forEach((item) => {
          const position = findElementPosition(grid, item);
          position != null && markCell(position?.row, position?.col);
        });

        setNoOfWin(checkWin());
        console.log("wins fetched :::::::::::", checkWin());

        //  console.log("Game room fetch Player : ", newGrid, " Lalit");
        console.log("MY arr :: ", arr);

        // room available
        // setIsRoomPresent(true);
      } else {
        console.log("invalid Game");
        // setIsRoomPresent(false);
      }
    });

    // return () => gameRef.off(); // cleanup function to unsubscribe listener
  };

  useEffect(() => {
    fillGrid();
  }, [isRestart]);

  // useEffect(() => {
  //   updateGrid();
  // }, []);

  const handleRestart = () => {
    // clear Database
    const roomCode = JSON.parse(localStorage.getItem("roomCode"));

    remove(ref(db, "GRID" + "-Player1-" + roomCode));
    remove(ref(db, "GRID" + "-Player2-" + roomCode));
    remove(ref(db, "Winner" + roomCode));
    setIsWin(false);
    setIsRestart(true);
    fillGrid();

    // location.reload();
  };

  const handleSayBingo = () => {
    // setIsWin(true);

    const roomCode = JSON.parse(localStorage.getItem("roomCode"));
    const player = JSON.parse(localStorage.getItem("player"));

    const newWinnerRef = ref(db, "Winner" + roomCode);
    set(newWinnerRef, JSON.stringify(player));

    setWhoWins(player);

    setIsWin(true);

    //setSayBingo(true);
    console.log("handleSayBingo");
  };

  const setListerBingo = () => {
    const roomCode = JSON.parse(localStorage.getItem("roomCode"));
    const bingoRef = ref(db, "Winner" + roomCode);

    onValue(bingoRef, (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const newBingoWinner = JSON.parse(snapshot.val());

        setWhoWins(newBingoWinner);
        console.log("Winner", newBingoWinner);

        setIsWin(true);
        //console.log("exit", snapshot.exists());

        // setFetchedArray(newGrid);
        // console.log("fetchedArray", fetchedArray);

        // fetchedArray.forEach((item) => {
        //   const position = findElementPosition(grid, item);
        //   position != null && markCell(position?.row, position?.col);
        // });

        // console.log("Game room fetch Player : ", newGrid, " Lalit");
        // console.log("arr", arr);

        // room available
        // setIsRoomPresent(true);
      } else {
        //  console.log("invalid Game");
        // setIsRoomPresent(false);
        console.log("Winner Can't Find");
      }
    });
  };

  useEffect(() => {
    setListerBingo();
  }, [sayBingo]);

  useEffect(() => {
    updateGrid();
  }, [clickNumber]);

  useEffect(() => {
    setListener();
  }, [clickNumber]);

  console.log("now grid is", grid);
  console.log("---------------------------------");

  return (
    <div className="flex flex-col items-center  min-h-screen justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-6xl fixed top-10 sm:hidden font-bold font-cursive text-blue-800 mb-8 ">
        Say Bingo
      </h1>
      <div className="flex gap-[68px] ">
        <div className="text-lg font-bold bg-cyan-100 w-16 h-16 flex justify-center items-center rounded-md mb-4">
          {"YOU"}
        </div>
        <div className="text-2xl font-bold bg-blue-400 w-20 h-16 flex justify-center items-center rounded-md mb-4">
          {JSON.parse(localStorage.getItem("roomCode"))}
        </div>
        <div className="text-lg font-bold flex justify-center items-center  bg-yellow-400 w-16 h-16 rounded-md mb-4">
          {"RIVAL"}
        </div>
      </div>
      {/* <div className="text-lg text-gray-600 mb-8">Number of the Day</div> */}

      {!isWin ? (
        <div className="grid grid-cols-5 gap-2 m-2">
          {numbers.map((number) => (
            <div
              onClick={() => {
                arr.indexOf(number) == -1 && fetchedArray.indexOf(number) == -1
                  ? handleNumberClick(number)
                  : alert("already clicked");
              }}
              key={number}
              className={`  ${
                fetchedArray.indexOf(number) > -1
                  ? "bg-yellow-200 cursor-move"
                  : ""
              } w-16 h-16 flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-lg text-xl font-bold ${
                arr.indexOf(number) > -1 ? "bg-cyan-100 cursor-move" : ""
              }  `}
            >
              {number}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2 m-2 relative">
          <h2 className="absolute text-7xl font-extrabold animate-pulse font-cursive opacity-25 left-4 top-[25%]">
            {whoWins == JSON.parse(localStorage.getItem("player"))
              ? "You Won"
              : "You Lost"}
          </h2>

          <button
            onClick={handleRestart}
            className="absolute px-6 py-2 cursor-pointer text-white bg-slate-800 rounded-full text-4xl font-extrabold font-cursive  left-24 top-[65%]"
          >
            Restart
          </button>

          {numbers.map((number) => (
            <div
              key={number}
              className={`w-16 h-16 flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-lg text-xl font-bold 
              }`}
            ></div>
          ))}
        </div>
      )}

      {sayBingo && (
        <button
          disabled={!sayBingo}
          onClick={handleSayBingo}
          className={`mt-6 bg-blue-600 text-white py-4 px-8 rounded-full shadow-md font-semibold text-xl ${
            sayBingo ? "" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Say BINGO
        </button>
      )}

      {!sayBingo &&
        JSON.parse(localStorage.getItem("player")) == "-Player2-" &&
        fetchedArray.length == arr.length && <Loader />}

      {!sayBingo &&
        JSON.parse(localStorage.getItem("player")) == "-Player1-" &&
        arr.length > fetchedArray.length && <Loader />}
    </div>
  );
};

export default Game;
