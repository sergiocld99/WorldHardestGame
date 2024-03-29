import Board from "./board.js"
import Enemy from "./entity/enemy.js"
import Food from "./entity/food.js"
import Position from "./position.js"

export default class Match {
    deaths: number
    level: number
    levelCount: number
    food: Food[]

    constructor(deaths = 0, level = 1){
        this.deaths = deaths
        this.level = level
        this.levelCount = 2
        this.food = []
    }

    buildEnemies(board: Board): Enemy[] {
        let enemies: Enemy[] = []

        // start position
        switch(this.level){
            case 1:
                enemies.push(new Enemy(180, 60))
                enemies.push(new Enemy(180, 140))
                enemies.push(new Enemy(board.w-180, 100))
                enemies.push(new Enemy(board.w-180, 180))
                break
            case 2:
                for (let x=0; x<6; x++) enemies.push(new Enemy(140+x*80,20))
                for (let x=0; x<6; x++) enemies.push(new Enemy(180+x*80,board.h-20))
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

    buildFood(board: Board) {
        this.food = []

        switch(this.level){
            case 2:
                this.food.push(new Food(board.w/2,board.h/2))
                break
        }
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

    die(){
        this.deaths++
        this.food.forEach(f => f.taken = false)
    }
}