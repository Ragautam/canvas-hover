const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = ["#D2F6FC", "#7984EE", "#F9E3A2", "#23374D", "#DB1D4B"];
const cursor = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};
const cursorRange = 50;
const totalBalls = 1000;
const ballRadius = 2;
const ballRadiusOnHover = { min: 40, max: 60 };
const balls = [];
const dMin = -6, dMax = 6;


window.addEventListener("mousemove", e => {
  cursor.x = e.pageX;
  cursor.y = e.pageY;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function CreateBall(x,y,r,dx,dy,color) {
  if(dx === 0) dx++;
  if(dy === 0) dy++;
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
}

function clearCanvas() {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

function animate() {
  clearCanvas();
  for(let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if((ball.r - ballRadius) === 0 && Math.abs(cursor.x - ball.x) < cursorRange && Math.abs(cursor.y - ball.y) < cursorRange) {
      ball.r = getRandomInt(ballRadiusOnHover.min, ballRadiusOnHover.max);
    }
    if(Math.abs(cursor.x - ball.x) > cursorRange && Math.abs(cursor.y - ball.y) > cursorRange) {
      ball.r = Math.max(ballRadius, ball.r - 2);
    }
    if(ball.x <= ball.r || (ball.x + ball.r + ball.dx) >= canvas.width ) {
      ball.dx = -ball.dx;
    }
    if(ball.y <= ball.r || (ball.y + ball.r + ball.dy) >= canvas.height ) {
      ball.dy = -ball.dy;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

function draw() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for(let i = 0; i < totalBalls; i++) {
    const r = ballRadius;
    const x = getRandomInt(r, window.innerWidth - r);
    const y = getRandomInt(r, window.innerHeight - r);
    const dx = getRandomInt(dMin, dMax);
    const dy = getRandomInt(dMin, dMax);
    const color = colors[getRandomInt(0, colors.length)];
    balls.push(new CreateBall(x,y,r,dx,dy, color));
  }
  animate();
}

draw();