const cols = 10;
const rows = 10;
const size = 40;
let firstClick = true;

const cells = new Array(rows);
for (let i = 0; i < rows; i++) {
  cells[i] = new Array(cols);
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[i][j] = new Cell(j * size, i * size, size);
    }
  }
}

function calculateValue(mx, my) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let x = mx + j;
      let y = my + i;
      if (x < cells[0].length && x >= 0 && y < cells.length && y >= 0) {
        if (cells[y][x].isMine) cells[my][mx].value++;
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
  }
  
  cells[y][x].reveal(x, y);
}

function draw() {
  background(51);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[i][j].show();
    }
  }
}

function generateMine() {
  let mines = 10;
  while (mines > 0) {
    const randomX = floor(random(cols));
    const randomY = floor(random(rows));
    if (cells[randomY][randomX].makeMine()) {
      mines--;
    }
  }
}
