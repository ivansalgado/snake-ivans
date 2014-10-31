/* _____________
 * Variables   /
 * ____________\
 */

var snake;
    
var context;
var screenWidth;
var screenHeight;

var snakeLength;
var snakeSize;
var snakeHead;
var snakeTail;
var snakeDirection;

var food;

var keyboardHandler;

var gameState;
var gameOverMenu;
var restartButton;
var playHUD;

var scoreboard;


/* ________________________
 * Excecuting game code   /
 * _______________________\
 */

gameInitialize ();
snakeInitialize (); 
foodInitialize ();
setInterval (gameLoop, 1000/20);
setFoodPosition ();

/* ________________________________
 * Dimensions of the game screen  /
 * _______________________________\
 */

function gameInitialize () {
    var canvas = document.getElementById ("game-screen");
    context = canvas.getContext ("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown",keyboardHandler );
    
    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);
    
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);
    
    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreboard");
    
    setState("PLAY");
}

/* ___________________________________
 * Updates the snake / Moves food    /
 * __________________________________\
 */ 

function gameLoop () {
    gameDraw ();
    drawScoreboard();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameRestart () {
    snakeInitialize();
    foodInitialize(setFoodPosition);
    hideMenu(gameOverMenu);
    setState("PLAY");
}

/* _______________________________
 * Gives the style of the game   /
 * ______________________________\
 */

function gameDraw () {
    context.fillStyle = "rgb(178, 235, 242)";
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
        context.fillStyle = "rgb(255, 87, 34)";
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
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/* __________________________________________
 * Gives the location food on the screen    /
 * _________________________________________\
 */

function foodInitialize(){
    food = {
      x: 32,
      y: 15
    };
    setFoodPosition;
}

/* ________________________________
 * Gives the style of the food    /
 * _______________________________\
 */

function foodDraw() {
    context.fillStyle = "rgb(253, 216, 53)";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

/* ______________________________
 * Randomly positions the food  /
 * _____________________________\
 */

function setFoodPosition () {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor (randomX / snakeSize);
    food.y = Math.floor (randomY / snakeSize);
}

/* ___________________
 * Input functions   /
 * __________________\
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

/* ____________________
 * Colision handling  /
 * ___________________\
 */

function checkFoodCollisions (snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        setFoodPosition();     
    }

}

function checkWallCollisions (snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        console.log("Wall Collision");
        setState("GAME OVER");
    }
    else if (snakeHeadY * snakeSize >= screenWidth || snakeHeadY * snakeSize < 0) {
        console.log("Wall Collision");
        setState("GAME OVER");
    }
}

function checkSnakeCollisions (snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= snake || snakeHeadX * snakeSize < snake) {
        console.log("Snake Collision");
        setState ("GAME OVER");
    }
    else if (snakeHeadY * snakeSize >= snake || snakeHeadY * snakeSize < snake) {
        console.log("Snake Collision");
        setState ("GAME OVER");
    }
        
}

function checkSnakeCollisions (snakeHeadX, snakeHeadY) {
    for(var index = 1; index < snake.length; index++) {
    if (snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
        setState ("GAME OVER");
        return;
    }
}
}
        


/* ______________
 * Game state   /
 * _____________\
 */


function setState(state){
    gameState = state;
    showMenu(state);
}

/* _____________________________________
 * Menu functions
 * ____________________________________
 */

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu){
    menu.style.visibility = "hidden";
}

function showMenu(state) {
        if (state == "GAME OVER") {
            displayMenu(gameOverMenu);
        }
        else if (state == "PLAY") {
        displayMenu(playHUD);
    }
}

function centerMenuPosition(menu){
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 1.5) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 1.5) + "px";
}

function drawScoreboard(){
    scoreboard.innerHTML = "size " + snakeLength;;
}

