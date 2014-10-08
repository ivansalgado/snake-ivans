var snake;

var context;
var screenWidth;
var screenHeight;

function gameInitialize () {
    var canvas = document.getElementById ("game-screen");
    context = cavas.getContext ("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop () {
    
}

function gameDraw () {
    context.fillStyle = "rgb(179, 234, 245)";
    context.fillSqr = ;
}