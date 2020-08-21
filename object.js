// Object.js
// Create 8/19/2020
// By Noel Kling

class Cell {
  construct(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.isbomb = false;
    this.isrevealed = false;
  }
}
