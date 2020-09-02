// Main.js
// Created on 8/19/2020
// By Noel Kling

let ctx = null;
let grid;
let firstClick = true;
let bombCount = 15;
let size = 35;
let columns = 10;
let rows = 10;
let canvas = document.getElementById("gameBoard");
let mouseClick = [];

function twoDArray(col, row) {
  // Creates a 2D array
  let arr = new Array(col);
  for (let i = 0; i < row; i++) {
    arr[i] = new Array(row);
  }
  return arr;
}

function Setup() {
  // Setup canvas
  ctx = canvas.getContext("2d");
  canvas.width = 401;
  canvas.height = 401;
  // Set white background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.width);

  // Scaled ctx to fit canvas frame
  ctx.scale(1.15, 1.15);

  drawCell();

  createBombs();

  showBoard();
}

// Board Setup -

// Creates the grid for the mines
function drawCell() {
  // Constructs the 2D array for the cells
  grid = twoDArray(columns, rows);

  // Create cells that hold the grid
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, size);
    }
  }
}

// Places bombs onto the field
function createBombs() {
  while (bombCount != 0) {
    let x = Math.floor(Math.random(0, columns) * columns);
    let y = Math.floor(Math.random(0, rows) * rows);

    if (!grid[x][y].isBomb) {
      grid[x][y].isBomb = true;
      bombCount--;
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].bombCount();
    }
  }
}

// Checks and Reveals -

function checkCell() {
  let x = mouseClick[0],
    y = mouseClick[1];
  // Checks the cell
}

// Makes the board visible
function showBoard() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

// Stack Overflow explained how to find the points
// It calculates where the poistion of the click is on the canvas only.
function cursorPos(canvas, event) {
  const board = canvas.getBoundingClientRect();
  const x = event.clientX - board.left;
  const y = event.clientY - board.top;
  console.log("x: " + x + " Y: " + y);
  mouseClick = [x, y];
}

function updateMap() {
  window.addEventListener("mouseup", checkCell);
}

// Loops continually to update the map
function loop() {
  updateMap();
  window.requestAnimationFrame(loop);
}

canvas.addEventListener("mouseup", function (e) {
  cursorPos(canvas, e);
});

document.addEventListener("DOMContentLoaded", Setup);

window.requestAnimationFrame(loop);
