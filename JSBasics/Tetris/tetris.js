//get canvas and its context set backgroud for playing tetris
const canvas = document.querySelector('#tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);


//create an arena
const arena = drawArena(13, 20)
//arena is used to maintain a database to store the tetris
function drawArena(w, h) {
    const arena = []
    while (h--) {
        arena.push(new Array(w).fill(0))
    }
    return arena
}
//merge the tetris into the arena
function mergeTetris(player, arena) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.position.y][x + player.position.x] = value
            }
        })
    })
}
//check out whether the tetris collides with the arena
function collide(player, arena) {
    const [m, p] = [player.matrix, player.position]
    let isCollided = false;
    m.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                if ((arena[y + p.y] && arena[y + p.y][x + p.x]) !== 0) {
                    isCollided = true
                }
            }
        })
    })
    return isCollided
}
//wrap the foreach loop in the function and add a param which indicates 
//the offset determined by player
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = color[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}
//transpose first and then reverse to make a 90 degree rotate
function rotate(matrix, dir) {
    if (dir !== 0) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < y; x++) {
                [matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]]
            }
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse())
    } else {
        matrix.reverse()
    }
}
//make 7 tetris pieces
function makeTetris(type) {
    switch (type) {
        case 'T':
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ]
        case 'O':
            return [
                [2, 2],
                [2, 2],
            ]
        case 'L':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ]
        case 'J':
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ]
        case 'I':
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0]
            ]
        case 'S':
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ]
        case 'Z':
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ]
    }
}
//arenasweep
function arenaSweep() {
    let rowCount = 1
    outer: for (let y = arena.length - 1; y > -1; y--) {
        for (let x = 0; x < arena[y].length; x++) {
            if (arena[y][x] === 0) {
                continue outer
            }
        }
        player.score += rowCount * 10
        rowCount *= 2
        const row = arena.splice(y, 1)[0].fill(0)
        arena.unshift(row)
        y++ //recheck the new row y
    }
}
//update score
function updateScore() {
    document.querySelector('#score').textContent = player.score
}

//we should wrap the offset in the player in which it is named 'position'
const player = {
    position: { x: 0, y: 0 },
    matrix: null,
    score: 0
}
//add color
const color = [
    null,
    '#e74040',
    '#e67830',
    '#efff0c',
    '#07fc3c',
    '#04faee',
    '#2d00f3',
    '#cc07fd',
]
//now we can offer different matrix and postion to draw a tetis
//then we should make the metrix drop automately
//check collision and merge tetris into arena
function playerDrop() {
    player.position.y++
    if (collide(player, arena)) {
        player.position.y--
        mergeTetris(player, arena)
        arenaSweep()
        updateScore()
        playerReset()
    }
    timeCount = 0
}
//control playermove and collision check
function playerMove(distance) {
    player.position.x += distance
    if (collide(player, arena)) {
        player.position.x -= distance
    }
}
//rotate and check collison
function playerRotate(dir) {
    const pos = player.position.x
    rotate(player.matrix, dir)
    let offset = 1
    while (collide(player, arena)) {
        player.position.x += offset
        offset = - (offset + (offset > 0 ? 1 : -1))
    }
}
//reset player
function playerReset() {
    const type = 'IJLOSTZ'
    player.matrix = makeTetris(type[Math.floor(type.length * Math.random())])
    player.position.y = 0
    player.position.x = Math.round((arena[0].length - player.matrix[0].length) / 2)
    if (collide(player, arena)) {
        arena.forEach(row => row.fill(0))
        player.score = 0
        updateScore()
    }
}


let timeStamp = 0 //anchor the time  
let timeCount = 0 //count the timeDelta
let timeInterval = 1000 //drop interval
function autoDrop(time = 0) {
    let timeDelta = time - timeStamp
    timeStamp = time
    timeCount += timeDelta
    draw()
    if (timeCount >= timeInterval) {
        playerDrop()
    }
    requestAnimationFrame(autoDrop)
}
//when tetris autodrop,meanwhile wo shoule redraw the black background
//so we wrap these two in draw()
function draw() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    drawMatrix(player.matrix, player.position)
    drawMatrix(arena, { x: 0, y: 0 })
}
//key binding
document.addEventListener('keydown', (ev) => {
    switch (ev.keyCode) {
        case 39:
            playerMove(1)
            break;
        case 37:
            playerMove(-1)
            break;
        case 40:
            playerDrop()
            break;
        case 81:
            playerRotate(-1)
            break;
        case 87:
            playerRotate(1)
            break;
    }
})

playerReset()
updateScore()
autoDrop()
