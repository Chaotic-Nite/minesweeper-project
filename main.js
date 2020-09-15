// Main.js
// Created on 8/19/2020
// By Noel Kling

let mineS = {
  grid: [],
  ctx: null,
  firstClick: true,
  playerDied: false,
  bombCount: 25,
  flagCount: 25,
  sizeCell: 40,
  boardSize: 14,
  canvas: document.getElementById("gameBoard"),
  mouseClick: { x: 0, y: 0, clickType: 0 },
};

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
  mineS.canvas.width = 0;
  mineS.canvas.height = 0;
  for (let i = 0; i < mineS.boardSize; i++) {
    mineS.canvas.height += mineS.sizeCell;
    mineS.canvas.width += mineS.sizeCell;
  }
}

function Setup() {
  // Setup canvas
  mineS.ctx = mineS.canvas.getContext("2d");

  buildCanvas();
  // Set white background
  mineS.ctx.fillStyle = "#FFFFFF";
  mineS.ctx.fillRect(0, 0, mineS.canvas.width, mineS.canvas.width);

  drawCell();
  createBombs();
  showBoard();
}

// Board Setup -

// Creates the mineS.grid for the mines
function drawCell() {
  // Constructs the 2D array for the cells
  mineS.grid = twoDArray(mineS.boardSize);
  // Create cells that hold the mineS.grid
  for (let i = 0; i < mineS.boardSize; i++) {
    for (let j = 0; j < mineS.boardSize; j++) {
      mineS.grid[i][j] = new Cell(i, j, mineS.sizeCell);
    }
  }
}

// Places bombs onto the field
function createBombs() {
  while (mineS.bombCount != 0) {
    let x = randomPos();
    let y = randomPos();

    if (!mineS.grid[x][y].isBomb) {
      mineS.grid[x][y].isBomb = true;
      mineS.bombCount--;
    }
  }

  mainBombCount();
}

function swapToBomb(oldPos) {
  let newBomb = mineS.grid[randomPos()][randomPos()];
  if (newBomb != oldPos && !newBomb.isBomb) {
    newBomb.isBomb;
    mainBombCount();
  }
}

// Updates the number count on field

function mainBombCount() {
  for (let i = 0; i < mineS.boardSize; i++) {
    for (let j = 0; j < mineS.boardSize; j++) {
      mineS.grid[i][j].bombCount();
    }
  }
}

// Checks and Reveals -

// Will look to see to see what cell the mouse click happens in
function checkCell() {
  let x = mineS.mouseClick.x,
    y = mineS.mouseClick.y;
  for (let i = 0; i < mineS.boardSize; i++) {
    for (let j = 0; j < mineS.boardSize; j++) {
      if (
        isBetween(
          x,
          mineS.grid[i][j].x,
          mineS.grid[i][j].x + mineS.grid[i][j].size
        ) &&
        isBetween(
          y,
          mineS.grid[i][j].y,
          mineS.grid[i][j].y + mineS.grid[i][j].size
        )
      ) {
        switch (mineS.mouseClick.clickType) {
          case 1:
            selectCell(mineS.grid[i][j]);
            break;
          case 3:
            flaggingRight(mineS.grid[i][j]);
        }
      }
    }
  }
}

function selectCell(cell) {
  switch (mineS.firstClick) {
    case true:
      if (cell.isBomb) {
        cell.isBomb = false;
        swapToBomb(cell);
      }
      mineS.firstClick = false;
      revealShow(cell);
      break;
    default:
      if (cell.isBomb) {
        gameOver();
      } else {
        revealShow(cell);
      }
  }
}

function flaggingRight(cell) {
  if (mineS.flagCount > 0 && !cell.isRevealed) {
    cell.flagged();
  }
}

function adjustFlagText(num) {
  let flagText = document.getElementById("flag");
  flagText.innerText = "🚩Flags: " + num;
  flagText.append();
}

// Switch case that will do reveals and shows
function revealShow(cell, x) {
  switch (x) {
    case 1:
      cell.reveal();
      break;
    case 2:
      cell.show();
      break;
    default:
      cell.reveal();
      cell.show();
  }
}

// Makes the board visible
function showBoard() {
  for (let i = 0; i < mineS.boardSize; i++) {
    for (let j = 0; j < mineS.boardSize; j++) {
      revealShow(mineS.grid[i][j], 2);
    }
  }
}

// Game Over when left click on a bomb
function gameOver() {
  for (let i = 0; i < mineS.boardSize; i++) {
    for (let j = 0; j < mineS.boardSize; j++) {
      switch (mineS.playerDied) {
        case false:
          revealShow(mineS.grid[i][j]);
          break;

        default:
          if (
            mineS.grid[i][j].isBomb === true &&
            mineS.grid[i][j].isFlag === false
          ) {
            revealShow(mineS.grid[i][j]);
          }
      }
    }
  }
}
// Set of functions for back end of the functions.

// Function to check if a number is in a range.
function isBetween(target, min, max) {
  if (target > min && target < max) {
    return true;
  } else {
    return false;
  }
}

function randomPos() {
  return Math.floor(Math.random(0, mineS.boardSize) * mineS.boardSize);
}

// Stack Overflow explained how to find the points
// It calculates where the poistion of the click is on the canvas only.
function cursorPos(canvas, event) {
  const board = canvas.getBoundingClientRect();
  const x = event.clientX - board.left;
  const y = event.clientY - board.top;
  mineS.mouseClick.x = x;
  mineS.mouseClick.y = y;
  switch (event.which) {
    case 1:
      mineS.mouseClick.clickType = 1;
      break;
    case 3:
      mineS.mouseClick.clickType = 3;
      break;
  }
}

function updateMap() {
  window.addEventListener("mouseup", checkCell);
}

// Loops continually to update the map
function loop() {
  updateMap();
  window.requestAnimationFrame(loop);
}

mineS.canvas.addEventListener("mouseup", function (e) {
  cursorPos(mineS.canvas, e);
  if (e.which === 3) {
    e.preventDefault();
  }
});

mineS.canvas.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener("DOMContentLoaded", Setup);

window.requestAnimationFrame(loop);
