// src/components/GameScreen.js
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

let numbers = flattenArray(grid);

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
  let checked = 0;
  const [isWin, setIsWin] = useState(false);

  const checkWin = () => {
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
  const [clickNumber, setClickNumber] = useState("X");

  let win = 0;
  const handleNumberClick = (number) => {
    const sound = new Audio("sound2.wav");
    sound.play();

    console.log("clicked", number);
    setClickNumber(number);
    arr.push(number);
    console.log("array", arr);

    const position = findElementPosition(grid, number);
    markCell(position.row, position.col);

    win = checkWin();

    // if (navigator?.vibrate) {
    //   navigator.vibrate([200]); // Vibrate for 200ms
    // }

    console.log("win", win);
    if (win >= 5) {
      setIsWin(true);
      const sound = new Audio("royalwin.wav");
      sound.play();

      console.log("Game Over");
    }
  };

  console.log("now grid is", grid);

  return (
    <div className="flex flex-col items-center  min-h-screen justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-6xl fixed top-10 sm:hidden font-bold font-cursive text-blue-400 mb-8 ">
        Say Bingo
      </h1>
      <div className="flex gap-[218px]  ">
        <div className="text-4xl font-bold bg-green-400 w-16 h-16 flex justify-center items-center rounded-md mb-4">
          {clickNumber}
        </div>
        <div className="text-4xl font-bold flex justify-center items-center  bg-blue-400 w-16 h-16 rounded-md mb-4">
          {clickNumber}
        </div>
      </div>
      {/* <div className="text-lg text-gray-600 mb-8">Number of the Day</div> */}

      {!isWin ? (
        <div className="grid grid-cols-5 gap-2 m-2">
          {numbers.map((number) => (
            <div
              onClick={() => {
                arr.indexOf(number) == -1
                  ? handleNumberClick(number)
                  : alert("already clicked");
              }}
              key={number}
              className={`w-16 h-16 flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-lg text-xl font-bold ${
                arr.indexOf(number) > -1 ? "bg-cyan-100 cursor-move" : ""
              }`}
            >
              {number}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2 m-2 relative">
          <h2 className="absolute text-7xl font-extrabold animate-pulse font-cursive opacity-25 left-4 top-[25%]">
            Say Bingo
          </h2>
          <Link
            to={"/"}
            className="absolute px-6 py-2 cursor-pointer text-white bg-slate-800 rounded-full text-4xl font-extrabold font-cursive  left-24 top-[65%]"
          >
            Restart
          </Link>

          {numbers.map((number) => (
            <div
              key={number}
              className={`w-16 h-16 flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-lg text-xl font-bold 
              }`}
            ></div>
          ))}
        </div>
      )}

      <button className="mt-8 bg-blue-500 text-white py-4 px-8 rounded-full shadow-md font-semibold text-xl">
        BINGO
      </button>
    </div>
  );
};

export default Game;
