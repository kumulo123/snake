var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
var start_snake = [[3, 3], [4, 3], [5, 3]];
var snake = [[3, 3], [4, 3], [5, 3]];
var snake_color_arr = ["rgb(20,255,20)","rgb(20,255,20)","rgb(20,255,20)"];
var food_pos = "";
var snake_canvas = gameCanvas.getContext('2d');
var food_canvas = gameCanvas.getContext('2d');
var waiting_dir = "right";
var dir = "right";
var green = 255;
var showarray = document.querySelector("#showarray");
var container = document.querySelector("#container");
var foodOnMap = false;
document.addEventListener("keydown", changeDir);
var game;
var gamewindow;
var windowcontainer;
var score = 0;
var titlescore = document.querySelector("#titlescore");
var goldfruit = false;
var speed = 100;

function newGame() {
    gamewindow = document.createElement("div");
    windowcontainer = document.createElement("div");
    gamewindow.className = "newgamewindow flexi centerse centera";
    var h1newgame = document.createElement("h1");
    h1newgame.innerHTML = "New game ?";
    gamewindow.append(h1newgame);
    var newgamebtn = document.createElement("div");
    newgamebtn.className = "newgamebtn flexi centerj centera";
    newgamebtn.innerHTML = "Ok";
    newgamebtn.addEventListener("click", startGame);
    gamewindow.append(newgamebtn);
    windowcontainer.className = "flexi centerse centera";
    windowcontainer.append(gamewindow);
    container.append(windowcontainer);
}

function showScore() {
    titlescore.innerHTML = "Ben's Snake | Score is : " + score;
}

function startGame() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800);
    score = 0;
    foodOnMap = false;
    //setInterval(checkEat, 10);
    clearInterval(game);
    speed = 100;
    game = setInterval(snakeGo, speed);
    gamewindow.className += " animated flipOutY"
    setTimeout(function () {
        windowcontainer.innerHTML = "";
    }, 1000);
    snake = start_snake.slice(0);
}

function changeDir(e) {
    if (e.key == "ArrowRight" && dir != "left") {
        waiting_dir = "right";
    }
    if (e.key == "ArrowLeft" && dir != "right") {
        waiting_dir = "left";
    }
    if (e.key == "ArrowUp" && dir != "down") {
        waiting_dir = "up";
    }
    if (e.key == "ArrowDown" && dir != "up") {
        waiting_dir = "down";
    }
}

function snakeGrows() {
    green = (green-5+255)%255;
    snake.unshift(snake[0].slice(0));
    snake_color_arr.push("rgb(20,"+green+",20)");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function isInSnakePos(x, y){
    for(var i = 0; i<snake.length; i++){
        if(x == snake[i][0] && y ==snake[i][1]){
            return true;
        }
    }
    return false;
}

function putFood() {
    if (foodOnMap == false) {
        food_pos = x + "" + y;
        var x = getRandomInt(16);
        var y = getRandomInt(16);
        while(isInSnakePos(x,y)){
                console.log("same");
                x = getRandomInt(16);
                y = getRandomInt(16);
        }
        food_pos = x + "" + y;
        food_canvas.fillStyle = 'pink';
        if(getRandomInt(8)==1){
            food_canvas.fillStyle = '#FFFD96';  
            goldfruit = true;
        }
        food_canvas.fillRect(x * 50 + 10, y * 50 + 10, 30, 30);
        foodOnMap = true;
    }
}

function drawCols() {
    for (var i = 1; i < 17; i++) {

        ctx.moveTo(i * 50, 0);
        ctx.lineTo(i * 50, 800);
        ctx.stroke();
    }
}

function drawRows() {
    for (var i = 1; i < 17; i++) {
        var ctx = gameCanvas.getContext("2d");
        ctx.moveTo(0, i * 50);
        ctx.lineTo(800, i * 50);
        ctx.strokeStyle = "lightgrey";
        ctx.stroke();
    }
}

function eraseSnake() {
    for (var i = 0; i < snake.length; i++) {
        snake_canvas.fillStyle = 'white';
        snake_canvas.fillRect(snake[i][0] * 50, snake[i][1] * 50, 50, 50);
    }
}

function drawSnake() {
    /*for (var i = 0; i < snake.length; i++) {
        //snake_canvas.fillStyle = 'lightgreen';
        snake_canvas.fillStyle = "rgb(20,"+getRandomInt(200)+",20)";
        snake_canvas.fillRect(snake[i][0] * 50, snake[i][1] * 50, 50, 50);
    }*/
    for(var i = 0; i<snake.length; i++){
        snake_canvas.fillStyle = snake_color_arr[i];
        snake_canvas.fillRect(snake[i][0] * 50, snake[i][1] * 50, 50, 50);
    }
}

function snakePos() {
    showarray.innerHTML += "<p>";
    for (var i = 0; i < snake.length; i++) {
        showarray.innerHTML += "(" + snake[i][0] + ", " + snake[i][1] + ")";
    }
    showarray.innerHTML += "</p>";
}

function checkLose() {
    for (var i = 0; i < snake.length - 1; i++) {
        if ((snake[i][0] == snake[snake.length - 1][0]) && (snake[i][1] == snake[snake.length - 1][1])) {
            clearInterval(game);
            newGame();
        }
    }
}

function checkEat() {
    if (food_pos == snake[snake.length - 1].join('')) {
        snakeGrows();
        score++;
        if(goldfruit){
            score+=3;
            snakeGrows();
            goldfruit = false;
        }
        foodOnMap = false;
    }
}

function snakeGo() {
    putFood();
    eraseSnake();
    checkEat();
    showScore();
    dir = waiting_dir;
    for (var i = 0; i < snake.length - 1; i++) {
        snake[i][0] = snake[i + 1][0] % 16;
        snake[i][1] = snake[i + 1][1] % 16;
        //snake[i]=snake[i+1].slice(0);
    }

    if (dir == "right") {
        snake[snake.length - 1][0] = (snake[snake.length - 1][0] + 1) % 16;
    }

    if (dir == "left") {
        snake[snake.length - 1][0] = (snake[snake.length - 1][0] - 1 + 16) % 16;
    }

    if (dir == "up") {
        snake[snake.length - 1][1] = (snake[snake.length - 1][1] - 1 + 16) % 16;
    }

    if (dir == "down") {
        snake[snake.length - 1][1] = (snake[snake.length - 1][1] + 1) % 16;
    }
    checkLose();
    //checkEat();
    //drawCols();
    //drawRows();
    drawSnake();
}

//startGame();
newGame();