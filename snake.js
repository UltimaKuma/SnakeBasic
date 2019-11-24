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

document.addEventListener("keydown", direction);

let d;

function direction(event){
    //dont allow movement in the opposite direction
    switch(event.keyCode){
        case 37:
            d = (d=="RIGHT")? d : "LEFT";
            break;
        case 38:
            d = (d=="DOWN")? d : "UP";
            break;
        case 39:
            d = (d=="LEFT")? d : "RIGHT";
            break;
        case 40:
            d = (d=="UP")? d : "DOWN";
            break;
        default:
    }
}

function collision(head, array){
    for(let i = 0; i<array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    //draw play area
    context.fillStyle = "gray";
    context.fillRect(0, 0, 608, 672);
    context.fillStyle = "darkgray";
    context.fillRect(box, 3*box, 17*box, 17*box);

    //draw snake
    for (let i = 0; i < snake.length; i++){
        context.fillStyle = ( i==0 )? "darkgreen" : "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    //draw apple
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*17+3) * box,
        }
    }else{
        snake.pop();
    }

    

    if( d == "LEFT" ) snakeX -= box;
    if( d == "UP" ) snakeY -= box;
    if( d == "RIGHT" ) snakeX += box;
    if( d == "DOWN" ) snakeY += box;

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //game over
    if(snakeX<box || snakeX>17*box || snakeY < 3*box || snakeY>19*box || collision(newHead, snake)){
        clearInterval(game);
    }
    
    snake.unshift(newHead);

    //draw score
    context.fillStyle = "red";
    context.fillRect(1*box, 0.75*box, box, box);
    context.fillStyle = "white";
    context.font = "45px Calibri";
    context.fillText(score, 2.5*box, 1.7*box);
}

let game = setInterval(draw, 100);