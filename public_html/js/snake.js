var snake;
    
var context;
var screenWidth;
var screenHeight;

var food;

var snakeLength;
var snakeSize;
var snakeHead;
var snakeTail;

gameInitialize ();
snakeInitialize (); 
gameLoop ();
setInterval (gameLoop, 1000/25);

function gameInitialize () {
    var canvas = document.getElementById ("game-screen");
    context = canvas.getContext ("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop () {
    gameDraw ();
    snakeUpdate ();
    snakeDraw ();
}

function gameDraw () {
    context.fillStyle = "rgb(128, 222, 234)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}


function snakeInitialize () {
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    
    for(var index = snakeLength - 1; index >= 0; index--){
        snake.push ({
            x: index,
            y: 0
        });
    } 
}

function snakeDraw () {
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "rgb(0, 0, 38)";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate () {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    snakeHeadX++;
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

function foodInitialize(){
    food = {
      x: 0,
      y: 0
    };
}

function foodDraw() {
    
}