const cols = 20;
const rows = 20;
let size = 0;
let firstClick = true;
let gameOver = false;

function startGame() {
  firstClick = true;

  cells = new Array(rows);
  for (let i = 0; i < rows; i++) {
    cells[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[i][j] = new Cell(i * size, j * size, size);
    }
  }

  gameOver = false;
}

function die() {
  gameOver = true;
  alert("you died!");
  startGame();
}

function setup() {
  createCanvas(800, 800);
  frameRate(10)
  size = width / rows;
  startGame();
}

function calculateValue(mx, my) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let x = mx + i;
      let y = my + j;
      if (x >= rows || x < 0 || y >= cols || y < 0) continue;
      if (cells[x][y].isMine) cells[mx][my].value++;
    }
  }
}

function mouseClicked() {
  if (mouseX > width || mouseX < 0 || mouseY < 0 || mouseY > height) return;
  let x = floor(mouseX / size);
  let y = floor(mouseY / size);

  if (firstClick) {
    generateMine(x, y);
    firstClick = false;
  }
  let cell = cells[x][y];

  if (!cell.isRevealed) {
    cell.reveal();
    if (cell.isMine) {
      die();
      return;
    }
    if (cell.value == 0) findNext(x, y);
  }
}

function findNext(ax, ay) {
  let t = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let x = ax + i;
      let y = ay + j;

      if (x >= rows || x < 0 || y >= cols || y < 0) continue;
      if (cells[x][y].isRevealed) continue;

      if (!cells[x][y].isMine) {
        cells[x][y].reveal();
        if ((x != ax || y != ay) && cells[x][y].value == 0) t.push(cells[x][y]);
      }
    }
  }
  if (t.length == 0) return;
  t.forEach((cell) => {
    findNext(cell.x / size, cell.y / size);
  });
}

function draw() {
  background(51);
  if (!gameOver) {
    {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          cells[i][j].show(i, j);
        }
      }
    }
  }
}

function generateMine(x, y) {
  let mines = 50;
  while (mines > 0) {
    let rndX = floor(random(rows));
    let rndY = floor(random(cols));

    // distance = squareroot((x - randomy)^2 + (y - randomY)^2)
    let distance = Math.sqrt((x - rndX) * (x - rndX) + (y - rndY) * (y - rndY));

    if (distance < 1.5) continue;
    if (cells[rndX][rndY].makeMine()) {
      mines--;
    }
  }
}
