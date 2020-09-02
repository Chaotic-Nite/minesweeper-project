// Object.js
// Create 8/19/2020
// By Noel Kling

class Cell {
  constructor(i, j, size) {
    // Iterators
    this.i = i;
    this.j = j;

    // Grid based information
    this.x = i * size;
    this.y = j * size;
    this.size = size;

    // Bomb information
    this.isBomb = false;
    this.isRevealed = true;
    this.bombNeighbor = 0;
  }

  show() {
    // Constructs the visual grid based on the cells
    ctx.strokeStyle = "#000000";
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.stroke();
    // Calls to draw the bombs on to the grid
    this.notBomb();

    this.bomb();
  }

  bomb() {
    ctx.beginPath();
    if (this.isBomb) {
      ctx.fillStyle = "red";

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

  bombCount() {
    // Determines how many bombs are touching the cell
    if (this.isBomb) {
      return;
    }
    for (let seeX = -1; seeX <= 1; seeX++) {
      for (let seeY = -1; seeY <= 1; seeY++) {
        // Cycles through each cell in a 3x3 to determine if any edge/corner touch a bomb
        let offSetX = this.i + seeX;
        let offSetY = this.j + seeY;
        if (
          offSetX > -1 &&
          offSetX < columns &&
          offSetY > -1 &&
          offSetY < rows &&
          grid[offSetX][offSetY].isBomb
        ) {
          this.bombNeighbor++;
        }
      }
    }
  }

  notBomb() {
    // Creates the canvas numbers and placements
    if (this.bombNeighbor > 0) {
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(this.bombNeighbor, this.x + 12, this.y + this.size / 1.5);
    }

    ctx.stroke();
  }

  reveal() {
    this.isRevealed = false;
  }
}
