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

var keyboardHandler;



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
    
    document.addEventListener("keydown",keyboardHandler );
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

/* _______________________________
 * Gives the style of the game   /
 * ______________________________\
 */

function gameDraw () {
    context.fillStyle = "rgb(128, 222, 234)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

/* __________________________________________
 * Gives the initial length of the snake    /       
 * _________________________________________\
 */                                                                                                                                                                                                                  

function snakeInitialize () {
    snake = [];
    snakeLength = 1;
    snakeSize = 20;
    snakeDirection = "down";
    
    for(var index = snakeLength - 1; index >= 0; index--){
        snake.push ({
            x: index,
            y: 0
        });
    } 
}

/* _______________________________
 * Gives the style of the snake  /
 * ______________________________\
 */

function snakeDraw () {
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "rgb(0, 0, 38)";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

/* __________________________________
 * Updates the length of the snake  /
 * _________________________________\
 */

function snakeUpdate () {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if (snakeDirection == "down") {
        snakeHeadY++;
    }
    else if(snakeDirection == "right"){
        snakeHeadX++;
    }
    else if(snakeDirection == "up") {
        snakeHeadY--;
    }
    else if(snakeDirection == "left") {
        snakeHeadX--;
    }
    
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallColisions(snakeHeadX, snakeHeadY);

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
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

/* ___________________________________________________________________________
 * Randomly positions the food                                               /
 * __________________________________________________________________________\
 */

function setFoodPosition () {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor (randomX / snakeSize);
    food.y = Math.floor (randomY / snakeSize);
}

/* ___________________________________________________________________________
 * Input functions                                                           /
 * __________________________________________________________________________\
 */

function keyboardHandler (event) {
    console.log(event);
    
    if(event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    
    else if(event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    
    else if(event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    
    else if(event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }  
}

/* ___________________________________________________________________________
 * Colision handling                                                         /
 * __________________________________________________________________________\
 */

function checkFoodCollisions (snakeHeadX, snakeHeadY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y){
        snake.push ({
            x:0,
            y:0
        });
        snakeLength++;
        setFoodPosition();      
    }
    
}

function checkWallCollisions (snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth) {
        console.log("Wall Collision");
    }
}