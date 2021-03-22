class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isMine = false;
    this.isRevealed = false;
    this.value = 0;
  }

  show(x, y) {
    // fill the rects in xadrez pattern
    let ind = x + y;
    if (ind % 2 === 0) fill(74, 20, 140);
    else fill(124, 67, 189);
    if (this.isRevealed && !this.isMine && this.value === 0) {
      /*
       * if player has clicked and it's an empty space
       */
      fill(18, 0, 94);
      rect(this.x, this.y, size, size);
      /*
       *
       */
    } else if (this.isRevealed && this.value > 0) {
      /*
       * if player has clicked and it contains a mine next to it
       */
      fill(18, 0, 94);
      rect(this.x, this.y, size, size);
      fill(255);
      textSize(size / 2);
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 2);
      /*
       *
       */
    } else if (this.isMine && this.isRevealed) {
      /*
       * if player has clicked and it's a mine
       */
      rect(this.x, this.y, size, size);
      fill(255, 0, 0);
      ellipse(
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.size / 2,
        this.size / 2
      );
      /*
       *
       */
    } else {
      // no player moves
      rect(this.x, this.y, size, size);
    }
  }

  reveal() {
    let x = this.x / size;
    let y = this.y / size;
    if (!this.isRevealed) {
      if (!cells[x][y].isMine) calculateValue(x, y);
      this.isRevealed = true;
      count++;
    }
  }

  makeMine() {
    if (!this.isMine) {
      return (this.isMine = true);
    } else return false;
  }
}
