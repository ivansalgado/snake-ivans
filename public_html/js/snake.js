var snake;

var context;
var screenWidth;
var screenHeight;

var snakeLength;
var snakeSize;

gameInitialize ();
snakeInitialize ();
gameLoop ();

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
    context.fillStyle = "rgb(139, 195, 74)";
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
        context.fillStyle = "rgb(255, 109, 0)";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate () {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    snakeHead++;
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}