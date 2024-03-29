import Board from "./board.js"
import CellType from "./cellType.js"
import Direction from "./direction.js"
import Enemy from "./enemy.js"
import Match from "./match.js"
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
const deathTv = document.getElementById("deaths") as HTMLParagraphElement
const levelTv = document.getElementById("level") as HTMLParagraphElement

// objects
const match = new Match(0,1)
const board = new Board(canvas.width, canvas.height)
board.build(match.level)

// entities
const player = new Player(match.getPlayerStartPos(), 25, board)
let enemies: Enemy[] = match.buildEnemies(board)

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

    // check if player reached end
    let target = board.translate([player.x, player.y])
    if (board.getCellType(target) === CellType.END){
        match.nextLevel()
        board.build(match.level)
        player.setPosition(match.getPlayerStartPos())
        enemies = match.buildEnemies(board)
    }

    // check collision
    enemies.forEach(e => {
        if (e.touchesCube(player)){
            player.setPosition(match.getPlayerStartPos())
            match.deaths++
            deathTv.innerText = "Deaths: " + match.deaths
        }
    })

    board.draw(canvasCtx)
    player.draw(canvasCtx)
    enemies.forEach(e => e.draw(canvasCtx))

    // html p update
    levelTv.innerText = match.level + "/" + match.levelCount
}, 20)

playMusicLoop()

