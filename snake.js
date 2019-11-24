const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const box = 32;

let snake =[];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*17+3) * box,
}

let score = 0;

function draw(){
    //draw play area
    context.fillStyle = "gray";
    context.fillRect(0, 0, 608, 608);
    context.fillStyle = "darkgray";
    context.fillRect(box, 3*box, 17*box, 17*box);

    //draw snake
    for (let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].x, box, box);
    }

    //draw apple
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
    
    //draw score
    context.fillStyle = "red";
    context.fillRect(1*box, 0.75*box, box, box);
    context.fillStyle = "white";
    context.font = "45px Calibri";
    context.fillText(score, 2.5*box, 1.7*box);
}

let game = setInterval(draw, 100);