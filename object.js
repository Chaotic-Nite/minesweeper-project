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

    this.isBomb = false;
    this.isRevealed = true;

    this.buddyCount = 0;
  }

  show() {
    ctx.strokeStyle = "#000000";

    ctx.rect(this.x, this.y, this.size, this.size);

    ctx.stroke();
  }

  bomb() {
    ctx.beginPath();
    if (this.isBomb) {
      ctx.fillStyle = "red";

      ctx.beginPath();

      ctx.arc(
        this.x + this.size * 0.5,
        this.y + this.size * 0.5,
        13,
        0,
        2 * Math.PI
      );
    }
    ctx.fill();
    ctx.stroke();
  }
}
