import Board from "./board.js"
import Enemy from "./entity/enemy.js"
import Food from "./entity/food.js"
import RadianEnemy from "./entity/radianEnemy.js"
import Position from "./position.js"

export default class Match {
    deaths: number
    level: number
    levelCount: number
    food: Food[]

    constructor(deaths = 0, level = 1){
        this.deaths = deaths
        this.level = level
        this.levelCount = 30
        this.food = []
    }

    buildEnemies(board: Board): Enemy[] {
        let enemies: Enemy[] = []
        let centre: Position

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
            case 3:
                for (let x=0; x<3; x++) enemies.push(new Enemy(60+x*48,60))
                for (let y=0; y<3; y++) enemies.push(new Enemy(180,100+y*48))
                for (let x=0; x<3; x++) enemies.push(new Enemy(140-x*48,220))
                for (let y=0; y<2; y++) enemies.push(new Enemy(20,180-y*48))
                break
            case 4:
                centre = [board.w/2, board.h/2]
                for (let i=-5; i<=5; i++) enemies.push(new RadianEnemy(board.w/2, board.h/2-i*28, centre))
                for (let i=-5; i<=5; i++) enemies.push(new RadianEnemy(board.w/2-i*28, board.h/2, centre))
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
                break
            case 3:
                enemies.forEach((e,i) => {
                    e.addTarget([100, 60])
                    e.addTarget([160, 60])
                    e.addTarget([180, 100])
                    e.addTarget([180, 140])
                    e.addTarget([180, 200])
                    e.addTarget([140, 220])
                    e.addTarget([100, 220])
                    e.addTarget([40, 220])
                    e.addTarget([20, 180])
                    e.addTarget([20, 140])
                    e.addTarget([20, 80])
                    e.addTarget([60, 60])
                    e.currentMov = i
                })
                break
        }

        return enemies
    }

    buildFood(board: Board) {
        this.food = []

        switch(this.level){
            case 2:
                this.food.push(new Food(board.w/2,board.h/2))
                break
            case 3:
                this.food.push(new Food(20,20))
                break
            case 4:
                this.food.push(new Food(board.w/2,160))
                this.food.push(new Food(board.w-160,board.h/2))
                this.food.push(new Food(board.w/2,board.h-160))
                break
        }
    }

    getPlayerStartPos(): Position {
        switch(this.level){
            case 2:
                return [9,89]
            case 3:
                return [89,129]
            case 4:
                return [249,9]
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