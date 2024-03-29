import Board from "./board.js"
import Direction from "./direction.js"
import Entity from "./entity.js"

export default class Player extends Entity {
    size: number
    speed: number
    board: Board

    constructor(x: number, y: number, size: number, board: Board){
        super(x,y)
        this.size = size
        this.board = board
        this.speed = 3
    }

    move(dir: Direction){
        switch (dir) {
            case Direction.UP:
                if (this.y >= this.speed) this.y -= this.speed
                break;
            case Direction.DOWN:
                if (this.y <= this.board.h - this.size - this.speed) this.y += this.speed
                break
            case Direction.LEFT:
                if (this.x >= this.speed) this.x -= this.speed
                break
            case Direction.RIGHT:
                if (this.x <= this.board.w - this.size - this.speed) this.x += this.speed
                break
        }
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "black"
        ctx.fillStyle = "red"

        ctx.fillRect(this.x,this.y,this.size,this.size)
        ctx.strokeRect(this.x,this.y,this.size,this.size)
    }
}