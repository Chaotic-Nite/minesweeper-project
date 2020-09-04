// Main.js
// Created on 8/19/2020
// By Noel Kling

let ctx = null;
let grid;
let firstClick = true;
let bombCount = 25;
let sizeCell = 40;
let boardSize = 14;
let canvas = document.getElementById("gameBoard");
let mouseClick = [];

function twoDArray(gameGrid) {
  // Creates a 2D array
  let arr = new Array(gameGrid);
  for (let i = 0; i < gameGrid; i++) {
    arr[i] = new Array(gameGrid);
  }
  return arr;
}

// Constructs the canvas to be an accurate size to the boardSize
function buildCanvas() {
  canvas.width = 0;
  canvas.height = 0;
  for (let i = 0; i < boardSize; i++) {
    canvas.height += sizeCell;
    canvas.width += sizeCell;
  }
}

function Setup() {
  // Setup canvas
  ctx = canvas.getContext("2d");

  buildCanvas();
  // Set white background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.width);

  drawCell();
  createBombs();
  showBoard();
}

// Board Setup -

// Creates the grid for the mines
function drawCell() {
  // Constructs the 2D array for the cells
  grid = twoDArray(boardSize);

  // Create cells that hold the grid
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      grid[i][j] = new Cell(i, j, sizeCell);
    }
  }
}

// Places bombs onto the field
function createBombs() {
  while (bombCount != 0) {
    let x = Math.floor(Math.random(0, boardSize) * boardSize);
    let y = Math.floor(Math.random(0, boardSize) * boardSize);

    if (!grid[x][y].isBomb) {
      grid[x][y].isBomb = true;
      bombCount--;
    }
  }

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      grid[i][j].bombCount();
    }
  }
}

// Checks and Reveals -

function checkCell() {
  let x = mouseClick[0],
    y = mouseClick[1];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (
        isBetween(x, grid[i][j].x, grid[i][j].x + grid[i][j].size) &&
        isBetween(y, grid[i][j].y, grid[i][j].y + grid[i][j].size)
      ) {
        if (grid[i][j].isBomb) {
          gameOver();
        } else {
          grid[i][j].reveal();
          grid[i][j].show();
        }
      }
    }
  }
}

// Makes the board visible
function showBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      grid[i][j].show();
    }
  }
}

// Function to call for reveal of the game
function gameOver() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      grid[i][j].reveal();
      grid[i][j].show();
    }
  }
}

// Function to check if a number is in a range.
function isBetween(target, min, max) {
  if (target > min && target < max) {
    return true;
  } else {
    return false;
  }
}

// Stack Overflow explained how to find the points
// It calculates where the poistion of the click is on the canvas only.
function cursorPos(canvas, event) {
  const board = canvas.getBoundingClientRect();
  const x = event.clientX - board.left;
  const y = event.clientY - board.top;
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
