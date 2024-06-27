// 1. setup the grid
const grid = Array(5)
  .fill()
  .map(() => Array(5).fill(null));

console.log(grid);

// 2. fill the grid with numbers
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
console.log("grid", grid);

// 3 .hanle user input

const markCell = (row, col) => {
  if (grid[row][col] !== null) {
    grid[row][col] = "X";
  }
};

// 4. check for wining

const checkWin = () => {
  // Check rows
  for (let row = 0; row < 5; row++) {
    if (grid[row].every((cell) => cell === "X")) return true;
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    if (grid.map((row) => row[col]).every((cell) => cell === "X")) return true;
  }

  // Check diagonals
  if (grid.map((row, idx) => row[idx]).every((cell) => cell === "X"))
    return true;
  if (grid.map((row, idx) => row[4 - idx]).every((cell) => cell === "X"))
    return true;

  return false;
};

function flattenArray(arr) {
  // Using Array.prototype.concat() and spread operator to flatten the array
  return [].concat(...arr);
}

// Example usage:
let twoDArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
let oneDArray = flattenArray(twoDArray);
