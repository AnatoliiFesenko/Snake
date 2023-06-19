const config = {
  step: 0,
  maxStep: 6,
  sizeBlock: 16,
  count: 0,
};

let snake = {
  x: 160,
  y: 160,
  dx: 16,
  dy: 0,
  tails: [],
  lengthSnake: 3,
  sizeSnake: 16,
};

let berry = {
  x: 0,
  y: 0,
  sizeBerry: 4,
};

let counter = document.getElementById("counter");
counter.innerHTML = config.count;

let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

function gameloop() {
  requestAnimationFrame(gameloop);

  if (++config.step < config.maxStep) {
    return;
  }
  config.step = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawSnake();
  createBerry();
}
requestAnimationFrame(gameloop);
////////////
////////////
////////////
function drawSnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;
  border();
  eatBerry();
  snake.tails.unshift({ x: snake.x, y: snake.y });

  if (snake.tails.length > snake.lengthSnake) {
    snake.tails.pop();
  }

  snake.tails.map(function (item, index) {
    if (index == 0) {
      context.fillStyle = "#FA0556";
    } else {
      context.fillStyle = "#A00034";
    }
    context.fillRect(item.x, item.y, snake.sizeSnake, snake.sizeSnake);

    for (let i = 1; i < snake.tails.length; i++) {
      if (
        snake.tails[0].x == snake.tails[i].x &&
        snake.tails[0].y == snake.tails[i].y
      ) {
        refresh();
      }
    }
  });
}
////////////
////////////
////////////
function changeCounter() {
  counter.innerHTML = config.count;
}
////////////
////////////
////////////
function refresh() {
  config.count = 0;
  changeCounter();
  snake.x = 160;
  snake.y = 160;
  snake.tails = [];
  snake.lengthSnake = 3;
  snake.dx = 16;
  snake.dy = 0;
}
////////////
////////////
////////////
function createBerry() {
  context.beginPath();
  context.fillStyle = "yellow";
  context.arc(
    berry.x + berry.sizeBerry * 2,
    berry.y + berry.sizeBerry * 2,
    berry.sizeBerry,
    0,
    2 * Math.PI
  );
  context.fill();
}

function randomBerry() {
  // console.log(snake.x, snake.y);
  // console.log(berry.x, berry.y);
  berry.x = getRandomInt(0, canvas.width / config.sizeBlock) * config.sizeBlock;
  berry.y =
    getRandomInt(0, canvas.height / config.sizeBlock) * config.sizeBlock;
  for (let i = 0; i < snake.tails.length; i++) {
    // console.log(berry.x, berry.y);
    // console.log(snake.tails[i].x, snake.tails[i].y);
    if (berry.x == snake.tails[i].x && berry.y == snake.tails[i].y) {
      console.log("+");
      randomBerry();
    }
  }
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function eatBerry() {
  if (berry.x == snake.x && berry.y == snake.y) {
    snake.lengthSnake++;
    config.count++;
    changeCounter();
    randomBerry();
  }
}
////////////
////////////
////////////
function border() {
  if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.x < 0) {
    snake.x = canvas.width;
  }
  if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height;
  }
}
////////////
////////////
////////////
document.addEventListener("keydown", function (key) {
  if (key.code == "KeyW") {
    snake.dx = 0;
    snake.dy = -16;
  }
  if (key.code == "KeyS") {
    snake.dx = 0;
    snake.dy = 16;
  }
  if (key.code == "KeyA") {
    snake.dx = -16;
    snake.dy = 0;
  }
  if (key.code == "KeyD") {
    snake.dx = 16;
    snake.dy = 0;
  }
});
