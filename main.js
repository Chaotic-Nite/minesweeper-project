// Main.js
// Created on 8/19/2020
// By Noel Kling

let canvas;
let col = 10;
let ctx = null;
let grid;
let row = 10;
let size = 35;

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
  canvas = document.getElementById("gameBoard");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Set white background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.width);

  // Scaled ctx to fit canvas frame
  ctx.scale(2.75, 1.45);
  grid = twoDArray(col, row);

  // Create cells that hold the grid
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j] = new Cell(i, j, size);
    }
  }

  drawCell(col, row);
}

function drawCell(x, y) {
  // Display the board
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      grid[i][j].show();
    }
  }
}

document.addEventListener("DOMContentLoaded", Setup);
