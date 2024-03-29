import Board from "./board.js"
import Direction from "./direction.js"
import Enemy from "./enemy.js"
import Movement from "./movement.js"
import Player from "./player.js"

function playMusicLoop(){
    const music = new Audio("music.mp3")
    music.loop = true
    music.play()

    // duration is 4 minutes, 6 seconds
}

function returnDirection(key: string): Direction | null {
    if (key === "ArrowUp" || key === 'w') return Direction.UP
    else if (key === "ArrowDown" || key === 's') return Direction.DOWN
    else if (key === "ArrowLeft" || key === 'a') return Direction.LEFT
    else if (key === "ArrowRight" || key === 'd') return Direction.RIGHT
    return null
}

const canvas = document.querySelector("canvas")!
const canvasCtx = canvas.getContext("2d")!

// objects
const board = new Board(canvas.width, canvas.height)
const player = new Player(0,0,25,board)
const enemies: Enemy[] = []

board.build()
enemies.push(new Enemy(20, 175, 12))
enemies.push(new Enemy(board.w-20, 225, 12))
enemies.push(new Enemy(20, 275, 12))
enemies.push(new Enemy(board.w-20, 325, 12))

enemies.forEach((e,i) => {
    e.addMovementAndBackwards(new Movement([e.x, e.y], [board.w-e.x, e.y]))
})

// keyboard listener
// keydown: press, keyup: release
var pressedKeys: boolean[] = Array(4).fill(false)

document.addEventListener("keyup", e => {
    const dir = returnDirection(e.key)
    if (dir != null) pressedKeys[dir] = false
})

document.addEventListener("keydown", e => {
    const dir = returnDirection(e.key)
    if (dir != null) pressedKeys[dir] = true
})

setInterval(() => {
    canvasCtx.clearRect(0,0,canvas.width,canvas.height)

    // update position
    pressedKeys.forEach((isDirPressed, index) => {
        if (isDirPressed) player.move(index)
    })

    enemies.forEach(e => e.moveAuto())

    board.draw(canvasCtx)
    player.draw(canvasCtx)

    enemies.forEach(e => e.draw(canvasCtx))
}, 20)

playMusicLoop()

