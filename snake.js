const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const box = 32;

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 17 + 3) * box,
}

let score = 0;

document.addEventListener("keydown", keyDowns);
document.addEventListener("keyup", keyUps);

let d;

let meter = 0;

let timeSpace = 100;

let dirLock = false;

let shiftDown = false;

function keyDowns(event) {
    //only allow one input per frane
    if (!dirLock) {
        //dont allow movement in the opposite direction
        switch (event.keyCode) {
            case 37:
                d = (d == "RIGHT") ? "RIGHT" : "LEFT";
                dirLock=true;
                break;
            case 38:
                d = (d == "DOWN") ? "DOWN" : "UP";
                dirLock=true;
                break;
            case 39:
                d = (d == "LEFT") ? "LEFT" : "RIGHT";
                dirLock=true;
                break;
            case 40:
                d = (d == "UP") ? "UP" : "DOWN";
                dirLock=true;
                break;
            default:
        }
    }
    shiftDown = event.shiftKey;
}

function keyUps(event){
    shiftDown = event.shiftKey;
}

//returns true if head is same as any part of the snake
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    //draw play area
    context.fillStyle = "#24252A";
    context.fillRect(0, 0, 608, 672);
    context.fillStyle = "darkgray";
    context.fillRect(box, 3 * box, 17 * box, 17 * box);

    //draw snake
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "darkgreen" : "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // if apple is collected, do not pop the snake
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        //add meter if apple collected
        meter++;
        if(meter>4){
            meter=4;
        }
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 17 + 3) * box,
        }
    } else {
        snake.pop();
    }

    //draw apple
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    if (d == "LEFT") {snakeX -= box;}
    else if (d == "UP") {snakeY -= box;}
    else if (d == "RIGHT") {snakeX += box;}
    else if (d == "DOWN") {snakeY += box;}

    //allow next input
    dirLock=false;

    //get value of the newest head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //draw score
    context.fillStyle = "red";
    context.fillRect(1 * box, 0.75 * box, box, box);
    context.fillStyle = "white";
    context.font = "45px Calibri";
    context.fillText(score, 2.5 * box, 1.7 * box);

    //draw meter
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.strokeRect(14 * box - 3, box - 3, 4 * box + 6, 0.5 * box + 6);
    context.fillRect(14*box, box, meter * box, 0.5 * box);

    //game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 19 * box || collision(newHead, snake)) {
        context.fillStyle = "white";
        context.font = "45px Calibri";
        context.fillText("GAME OVER", 6 * box, 10 * box);
        return;
    }

    snake.unshift(newHead);


    if (shiftDown && meter>0) {
        meter -= 0.25;
        game = setTimeout(draw, timeSpace*1.5);
    } else{
        game = setTimeout(draw, timeSpace);
    }
}

let game = setTimeout(draw, timeSpace);
