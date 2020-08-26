// Main.js
// Created on 8/19/2020
// By Noel Kling

let ctx = null;
let grid;
let firstClick = true;
let bombCount = 15;
let size = 35;
let col = 10;
let row = 10;

function twoDArray(col, row) {
  // Creates a 2D array
  let arr = new Array(col);
  for (let i = 0; i < row; i++) {
    arr[i] = new Array(row);
  }
  return arr;
}

function Setup() {
  let canvas;
  // Setup canvas
  canvas = document.getElementById("gameBoard");
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
}

function drawCell() {
  // Constructs the 2D array for the cells
  grid = twoDArray(col, row);

  // Create cells that hold the grid
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j] = new Cell(i, j, size);
    }
  }
}

function createBombs() {
  while (bombCount != 0) {
    let x = Math.floor(Math.random(0, col) * col);
    let y = Math.floor(Math.random(0, row) * row);

    if (!grid[x][y].isBomb) {
      grid[x][y].isBomb = true;
      bombCount--;
    }
  }

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j].bombCount();
      grid[i][j].show();
    }
  }
}

document.addEventListener("DOMContentLoaded", Setup);
