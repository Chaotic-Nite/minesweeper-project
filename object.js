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
    this.isRevealed = false;
    this.bombNeighbor = 0;
  }

  show() {
    this.cell();
    // Calls to draw the bombs on to the grid
    this.notBomb();

    this.bomb();
  }

  cell() {
    // Constructs the visual grid based on the cells
    ctx.strokeStyle = "#000000";
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.stroke();
  }

  bomb() {
    if (this.isRevealed) {
      ctx.beginPath();
      if (this.isBomb) {
        ctx.fillStyle = "black";
        ctx.font = "900 20px Arial";
        ctx.fillText("♞", this.x + 10, this.y + this.size / 1.5);
      }
      ctx.fill();
      ctx.stroke();
    }
  }

  // For the innocent cells
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
          isBetween(offSetX, -1, mineS.boardSize) &&
          isBetween(offSetY, -1, mineS.boardSize) &&
          grid[offSetX][offSetY].isBomb
        ) {
          this.bombNeighbor++;
        }
      }
    }
  }

  notBomb() {
    // Creates the canvas numbers and placements
    if (this.isRevealed) {
      if (this.bombNeighbor > 0) {
        ctx.fillStyle = "black";
        ctx.font = "900 20px Arial";
        ctx.fillText(this.bombNeighbor, this.x + 15, this.y + this.size / 1.5);
      }

      ctx.stroke();
    }
  }

  reveal() {
    if (this.isRevealed === false) {
      this.isRevealed = true;
    }
    if (this.bombNeighbor === 0) {
      this.fillFlood();
    }
  }

  fillFlood() {
    for (let seeX = -1; seeX <= 1; seeX++) {
      for (let seeY = -1; seeY <= 1; seeY++) {
        // Cycles through each cell in a 3x3 to determine if any edge/corner touch a bomb
        let offSetX = this.i + seeX;
        let offSetY = this.j + seeY;
        if (
          isBetween(offSetX, -1, mineS.boardSize) &&
          isBetween(offSetY, -1, mineS.boardSize)
        ) {
          let cellFill = grid[offSetX][offSetY];
          if (!cellFill.isBomb && !cellFill.isRevealed) {
            cellFill.reveal();
            cellFill.show();
          }
        }
      }
    }
  }
}
