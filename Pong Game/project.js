const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const playerScore = document.querySelector(".player-score .score");
const computerScore = document.querySelector(".computer-score .score");
var playerScoreCount = 0;
var computerScoreCount = 0;
function getRandomInt(min, max) { // The maximum is exclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function randomG()
{
  let n = getRandomInt(0, 2); //produces randomly 0 or 1
  if (n == 0)
    {
      return -1;
    }
  else
    {
      return 1;
    }
}

canvas.style.backgroundColor = "black";
canvas.width = 400;
canvas.height = 250;

const player = {
  width: 10,
  height: 100,
  speed: 20,
  y: canvas.height/2 - 50, //50 from height/2
  x: 0
}

const computer = {
  width: 10,
  height: 100,
  speed: 2,
  y: canvas.height/2 - 50, //50 from height/2
  x: canvas.width - 10 //10 from width
}

const ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 10,
  dx: 2,
  dy: -2
}


function drawBall()
{
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = "red";
  context.fill();
}

function drawPaddle(x,y,width,height)
{
  context.fillStyle = "red";
  context.fillRect(x, y, width, height);
}

function draw()
{
  context.clearRect(0,0,canvas.width,canvas.height);
  
  drawPaddle(player.x, player.y, player.width, player.height);
  drawPaddle(computer.x, computer.y, computer.width, computer.height);
  drawBall();
}

draw();

  function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    // add logic to make the game unpredictable; we will be varying speed and it's direction
    let v = getRandomInt(1, 3); // produces randomly 1 or 2
    let n = randomG(); // produces randomly 1 or -1
    ball.dx = n*v;
    ball.dy = -1*n*v;
  }
  function updateScore(element) {
    if(element == playerScore) {
      playerScoreCount++;
      playerScore.innerHTML = playerScoreCount;
    } else if (element == computerScore) {
      computerScoreCount++;
      computerScore.innerHTML = computerScoreCount;
    }
  }
  
  
  function wallCollision()
  {
    // ball's collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height)
    {
      //changing the direction aka bouncing
      ball.dy *= -1;
    }
    // ball's collision with right and left walls; update score & reset
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width)
    {
      if (ball.x - ball.radius < 0) {
        updateScore(computerScore);
      }
      if (ball.x + ball.radius > canvas.width){
        updateScore(playerScore);
      }
      resetBall();
      }
    // computer paddle's collision with top and bottom walls
    if (computer.y < 0 || computer.y + computer.height > canvas.height)
      {
        computer.speed *= -1;
      }
  }

function ballPaddleCollision()
{
  //with player
  let playerX = (ball.x - ball.radius) - 10; // 10 being paddle's width
  let playerY = (ball.y - ball.radius) - player.y;
  if (playerX <= 0 && ball.y >= player.y && ball.y < player.y + player.height) {
    ball.dx *= -1;
  }
  //with computer
  if (
    ball.x + ball.radius > canvas.width - computer.width &&
    ball.y >= computer.y &&
    ball.y < computer.y + computer.height
  ) {
    ball.dx *= -1;
  }
}

//let's move the player paddle
document.addEventListener("keydown", e => {
  if (e.key == "ArrowUp" && player.y > 0) {
    player.y -= player.speed;
  }
  if (e.key == "ArrowDown" && player.y + player.height < canvas.height) {
    player.y += player.speed;
  }
});
canvas.addEventListener("mousemove", e => {
  let y = e.offsetY;
  if (y >= 0 && y + player.height <= canvas.height)
    {
      player.y = y;
    }
});

function update()
{
  // the ball's movement
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // the computerPaddle's movement
  computer.y += computer.speed;
  
  wallCollision();
  ballPaddleCollision();
  draw();
}
setInterval(update, 5);