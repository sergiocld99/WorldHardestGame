import Board from "./board.js"
import Enemy from "./enemy.js"
import Position from "./position.js"

export default class Match {
    deaths: number
    level: number
    levelCount: number

    constructor(deaths = 0, level = 1){
        this.deaths = deaths
        this.level = level
        this.levelCount = 2
    }

    buildEnemies(board: Board): Enemy[] {
        let enemies: Enemy[] = []

        // start position
        switch(this.level){
            case 1:
                enemies.push(new Enemy(180, 60, 10))
                enemies.push(new Enemy(180, 140, 10))
                enemies.push(new Enemy(board.w-180, 100, 10))
                enemies.push(new Enemy(board.w-180, 180, 10))
                break
            case 2:
                for (let x=0; x<6; x++) enemies.push(new Enemy(140+x*80,20,10))
                for (let x=0; x<6; x++) enemies.push(new Enemy(180+x*80,board.h-20,10))
                break
        }

        // movement type
        switch(this.level){
            case 1:
                enemies.forEach(e => {
                    e.addTarget([board.w-e.x, e.y])
                    e.addTarget([e.x, e.y])
                })
                break
            case 2:
                enemies.forEach(e => {
                    e.addTarget([e.x, board.h-e.y])
                    e.addTarget([e.x, e.y])
                })
        }

        return enemies
    }

    getPlayerStartPos(): Position {
        switch(this.level){
            case 2:
                return [9,89]
            default:
                return [9,9]
        }
    }

    nextLevel(){
        if (this.level < this.levelCount){
            this.level++
        }
    }
}