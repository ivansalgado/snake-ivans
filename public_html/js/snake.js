/* ___________________________________________________________________________
 * Variables                                                                 /
 * __________________________________________________________________________\
 */

var snake;
    
var context;
var screenWidth;
var screenHeight;
var snakeDirection;

var food;

var snakeLength;
var snakeSize;
var snakeHead;
var snakeTail;

/* ___________________________________________________________________________
 * Excecuting game code                                                      /
 * __________________________________________________________________________\
 */

gameInitialize ();
snakeInitialize (); 
foodInitialize ();
setInterval (gameLoop, 1000/25);
setFoodPosition ();

/* ___________________________________________________________________________
 * Dimensions of the game screen                                             /
 * __________________________________________________________________________\
 */

function gameInitialize () {
    var canvas = document.getElementById ("game-screen");
    context = canvas.getContext ("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

/* ___________________________________________________________________________
 * Updates the snake / Moves food                                            /
 * __________________________________________________________________________\
 */ 

function gameLoop () {
    gameDraw ();
    snakeUpdate ();
    snakeDraw ();
    foodDraw ();
}

/* ___________________________________________________________________________
 * Gives the style of the game                                               /
 * __________________________________________________________________________\
 */

function gameDraw () {
    context.fillStyle = "rgb(128, 222, 234)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

/* ___________________________________________________________________________
 * Gives the initial length of the snake                                     /       
 * __________________________________________________________________________\
 */                                                                                                                                                                                                                  

function snakeInitialize () {
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    snakeDirection = "down";
    
    for(var index = snakeLength - 1; index >= 0; index--){
        snake.push ({
            x: index,
            y: 0
        });
    } 
}

/* ___________________________________________________________________________
 * Gives the style of the snake                                              /
 * __________________________________________________________________________\
 */

function snakeDraw () {
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "rgb(0, 0, 38)";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

/* ___________________________________________________________________________
 * Updates the length of the snake                                           /
 * __________________________________________________________________________\
 */

function snakeUpdate () {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if (snakeDirection == "down") {
        snakeHeadY++;
    }
    else {
        snakeHeadX++;
    }
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/* ___________________________________________________________________________
 * Gives the location food on the screen                                     /
 * __________________________________________________________________________\
 */

function foodInitialize(){
    food = {
      x: 0,
      y: 0
    };
    setFoodPosition;
}

/* ___________________________________________________________________________
 * Gives the style of the food                                               /
 * __________________________________________________________________________\
 */

function foodDraw() {
    context.fillStyle = "rgb(0, 0, 38)";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

/* ___________________________________________________________________________
 * Randomly positions the food                                               /
 * __________________________________________________________________________\
 */

function setFoodPosition () {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = randomX;
    food.y = randomY;
}