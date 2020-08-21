// Main.js
// Created on 8/19/2020
// By Noel Kling

function twoDArray(col, row) {
  // Creates a 2D array
  let arr = new Array(col);
  for (let i = 0; i < row; i++) {
    arr[i] = new Array(row);
  }
  return arr;
}

function Board() {
  this.show = function () {
    let x, y;
  };
}

function setup(canvas) {
  board = new Board();

  board.draw(canvas);
}

window.onload = function () {
  let canvas = document.getElementById("gameBoard");
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#CCCCCC";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
