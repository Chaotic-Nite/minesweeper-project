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
    this.isFlag = false;
    this.bombNeighbor = 0;
  }

  show() {
    this.cell();
    // Calls to draw the bombs on to the mineS.grid
    this.notBomb();

    this.bomb();
  }

  cell() {
    // Constructs the visual mineS.grid based on the cells
    mineS.ctx.strokeStyle = "#000000";
    mineS.ctx.rect(this.x, this.y, this.size, this.size);
    mineS.ctx.stroke();
  }

  bomb() {
    if (this.isRevealed) {
      mineS.ctx.beginPath();
      if (this.isBomb) {
        mineS.ctx.font = "20px Arial";
        mineS.ctx.fillStyle = "black";
        mineS.ctx.fillText("♟", this.x + 10, this.y + this.size / 1.5);
      }
      mineS.ctx.fill();
      mineS.ctx.stroke();
    }
  }

  // For the innocent cells
  bombCount() {
    // Determines how many bombs are touching the cell
    if (this.isBomb) {
      return;
    }
    this.bombNeighbor = 0;
    for (let seeX = -1; seeX <= 1; seeX++) {
      for (let seeY = -1; seeY <= 1; seeY++) {
        // Cycles through each cell in a 3x3 to determine if any edge/corner touch a bomb
        let offSetX = this.i + seeX;
        let offSetY = this.j + seeY;
        if (
          isBetween(offSetX, -1, mineS.boardSize) &&
          isBetween(offSetY, -1, mineS.boardSize) &&
          mineS.grid[offSetX][offSetY].isBomb
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
        mineS.ctx.font = "900 20px Arial";
        mineS.ctx.fillStyle = "black";
        mineS.ctx.fillText(
          this.bombNeighbor,
          this.x + 15,
          this.y + this.size / 1.5
        );
      } else if (!this.isBomb) {
        mineS.ctx.fillStyle = "#d9d9d9";
        mineS.ctx.fillRect(
          this.x + 1,
          this.y + 1,
          this.size - 2,
          this.size - 2
        );
      }

      mineS.ctx.stroke();
    }
  }

  flagged() {
    mineS.ctx.beginPath();
    switch (this.isFlag) {
      case false:
        this.isFlag = true;
        mineS.flagCount--;
        mineS.ctx.font = "20px Arial";
        mineS.ctx.fillStyle = "black";
        mineS.ctx.fillText("🚩", this.x + 10, this.y + this.size / 1.5);

        break;
      case true:
        this.isFlag = false;
        mineS.flagCount++;
        mineS.ctx.fillStyle = "white";
        mineS.ctx.fillRect(
          this.x + 1,
          this.y + 1,
          this.size - 2,
          this.size - 2
        );
    }
    mineS.ctx.stroke();
    adjustFlagText(mineS.flagCount);
  }

  reveal() {
    if (this.isFlag) {
      this.flagged();
    }
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
          let cellFill = mineS.grid[offSetX][offSetY];
          if (!cellFill.isBomb && !cellFill.isRevealed) {
            cellFill.reveal();
            cellFill.show();
          }
        }
      }
    }
  }
}
