const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player setup
const player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  color: "blue",
  dx: 0,
  dy: 0,
  gravity: 0.8,
  jumpPower: -12,
  grounded: false
};

// Platform
const platform = {
  x: 0,
  y: 350,
  width: 800,
  height: 50,
  color: "green"
};

// Obstacle
const obstacle = {
  x: 400,
  y: 320,
  width: 30,
  height: 30,
  color: "red"
};

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  // Movement
  player.dx = 0;
  if (keys["ArrowLeft"]) player.dx = -5;
  if (keys["ArrowRight"]) player.dx = 5;
  if (keys["ArrowUp"] && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  // Gravity
  player.dy += player.gravity;
  player.x += player.dx;
  player.y += player.dy;

  // Platform collision
  if (player.y + player.height > platform.y) {
    player.y = platform.y - player.height;
    player.dy = 0;
    player.grounded = true;
  }

  // Obstacle collision = Game Over
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    alert("Game Over!");
    reset();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Platform
  ctx.fillStyle = platform.color;
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

  // Obstacle
  ctx.fillStyle = obstacle.color;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function reset() {
  player.x = 50;
  player.y = 300;
  player.dy = 0;
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
