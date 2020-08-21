// Object.js
// Create 8/19/2020
// By Noel Kling

class Cell {
  constructor(i, j, size) {
    this.i = i;
    this.j = j;
    this.x = i * size;
    this.y = j * size;
    this.size = size;

    this.isbomb = false;
    this.isrevealed = false;
  }

  show() {
    ctx.strokeStyle = "#000000";

    ctx.rect(this.x, this.y, this.size, this.size);

    ctx.stroke();
  }
}
