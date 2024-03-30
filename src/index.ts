import Board from "./board.js"
import Direction from "./direction.js"
import Enemy from "./entity/enemy.js"
import Match from "./match.js"
import Player from "./entity/player.js"
import { playMusicLoop, playSound } from "./sfx.js"

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
const LEVEL_START = 1

// objects
const match = new Match(0, LEVEL_START)
const board = new Board(canvas.width, canvas.height)
board.build(match.level, canvas)

// entities
const player = new Player(match.getPlayerStartPos(board), 25)
let enemies: Enemy[] = match.buildEnemies(board)
match.buildFood(board)

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
        if (isDirPressed) player.move(index, board)
    })

    enemies.forEach(e => e.moveAuto())
    const untakedFood = match.getUntakenFood()

    // check if reached new spawn area
    const spawnTouching = board.spawnAreas.find(sp => {
        return sp.contains(player.y/ board.cellSize, player.x / board.cellSize)
    })

    if (spawnTouching){
        let centre = spawnTouching.getCentre()
        centre[0] *= board.cellSize
        centre[1] *= board.cellSize
        player.setSpawn(centre)

        // check if player reached end (last spawn area)
        // condition: food count = 0
        if (untakedFood.length === 0){
            if (spawnTouching.id === board.spawnAreas.length-1){
                playSound("nextLevel")
                match.nextLevel()
                board.build(match.level, canvas)
    
                // build entities
                player.setSpawn(match.getPlayerStartPos(board))
                player.reset()
                enemies = match.buildEnemies(board)
                match.buildFood(board)
            }
        }
    } 

    // check if food eaten
    untakedFood.forEach(f => {
        if (f.touchesCube(player)){
            playSound("food")
            f.taken = true
        }
    })

    // check collision
    enemies.forEach(e => {
        if (e.touchesCube(player)){
            playSound("punch")
            player.reset()
            match.die()
            deathTv.innerText = "Deaths: " + match.deaths
        }
    })

    board.draw(canvasCtx)
    player.draw(canvasCtx)
    enemies.forEach(e => e.draw(canvasCtx))
    match.food.forEach(f => f.draw(canvasCtx))

    // html p update
    levelTv.innerText = match.level + "/" + match.levelCount
}, 20)

playMusicLoop()

