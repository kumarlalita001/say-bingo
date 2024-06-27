const grid = [
  [24, 3, 9, 20, 21],
  [18, 8, 16, 2, 5],
  [7, 23, 10, 12, 17],
  [4, 22, 15, 11, 1],
  [14, 13, 6, 25, 19],
];

grid.map((item) => console.log(item));

grid.map((row, idx) => row[4 - idx]).every((cell) => cell === "X");

console.log(grid);
