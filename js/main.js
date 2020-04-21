let canvas = document.getElementById('snake') //criar elemento que irá rodar o jogo
let context = canvas.getContext('2d', { antialias: true })
let box = 32
let snake = [] //criar snake como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right'
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = 'dimgray'
    context.fillRect(0, 0, 16 * box, 16 * box) //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarSnake() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = 'lime'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

let img = new Image()
img.src = './img/virus' + Math.floor(Math.random() * 8) + '.png'

function drawFood() {
    context.fillStyle = context.createPattern(img, 'repeat')
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update) //quando um evento acontece, detecta e chama uma função

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left'
    if(event.keyCode == 38 && direction != 'down') direction = 'up'
    if(event.keyCode == 39 && direction != 'left') direction = 'right'
    if(event.keyCode == 40 && direction != 'up') direction = 'down'
}

function iniciarGame() {

    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over 😠')
        }
    }

    criarBG()
    criarSnake()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == 'right') snakeX += box
    if(direction == 'left') snakeX -= box
    if(direction == 'up') snakeY -= box
    if(direction == 'down') snakeY += box

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop()
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
        img.src = './img/virus' + Math.floor(Math.random() * 8) + '.png'
    }

    let newHead = {
        x: snakeX, 
        y: snakeY
    }
    snake.unshift(newHead)
}

let game = setInterval(iniciarGame, 130)

