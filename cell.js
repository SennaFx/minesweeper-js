class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isMine = false;
    this.isRevealed = false;
    this.value = 0;
  }

  show() {
    // fill the rects with white color
    fill(255);
    if (this.isRevealed && !this.isMine && this.value === 0) {
      /*
       * if player has clicked and it's an empty space
       */
      fill(255, 0, 0);
      rect(this.x, this.y, size, size);
      /*
       *
       */
    } else if (this.isRevealed && this.value > 0) {
      /*
       * if player has clicked and it contains a mine next to it
       */
      rect(this.x, this.y, size, size);
      fill(51);
      textSize(size / 2);
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 2);
      /*
       *
       */
    } else if (this.isMine) {
      /* if player has clicked and it's a mine
       *
       */
      rect(this.x, this.y, size, size);
      fill(52);
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

  reveal(x,y) {
    if (!this.isRevealed) {
      calculateValue(x, y)
      this.isRevealed = true;
    }
  }

  makeMine() {
    if (!this.isMine) {
      return (this.isMine = true);
    } else return false;
  }
}
