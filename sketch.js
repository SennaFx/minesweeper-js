const cols = 10;
const rows = 10;
let size = 0;
let firstClick = true;

const cells = new Array(rows);
for (let i = 0; i < rows; i++) {
  cells[i] = new Array(cols);
}

function setup() {
  createCanvas(800, 800);
  size = width / rows;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[i][j] = new Cell(i * size, j * size, size);
    }
  }
}

function calculateValue(mx, my) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let x = mx + i;
      let y = my + j;
      if (x < cells[0].length && x >= 0 && y < cells.length && y >= 0) {
        if (cells[x][y].isMine) cells[mx][my].value++;
      }
    }
  }
}

function mouseClicked() {
  if (mouseX > width || mouseX < 0 || mouseY < 0 || mouseY > height) return;
  let x = floor(mouseX / size);
  let y = floor(mouseY / size);

  if (firstClick) {
    generateMine();
    firstClick = false;
    findNext(x, y)
  }

  cells[x][y].reveal(x,y);
}

function findNext(ax, ay) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let x = ax + i;
      let y = ay + j;
      if (x < cells[0].length && x >= 0 && y < cells.length && y >= 0) {
        if (!cells[x][y].isMine) cells[x][y].reveal(x,y);
      }
    }
  }
}

function draw() {
  background(51);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[i][j].show(i,j);
    }
  }
}

function generateMine() {
  let mines = 20;
  while (mines > 0) {
    const randomX = floor(random(rows));
    const randomY = floor(random(cols));
    if (cells[randomX][randomY].makeMine()) {
      mines--;
    }
  }
}
