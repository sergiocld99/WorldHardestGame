import Board from "./board.js"
import Direction from "./direction.js"

export default class Player {
    x: number
    y: number
    size: number
    board: Board

    constructor(x: number, y: number, size: number, board: Board){
        this.x = x
        this.y = y
        this.size = size
        this.board = board
    }

    move(dir: Direction){
        switch (dir) {
            case Direction.UP:
                if (this.y >= 5) this.y -= 5
                break;
            case Direction.DOWN:
                if (this.y <= this.board.h - this.size - 5) this.y += 5
                break
            case Direction.LEFT:
                if (this.x >= 5) this.x -= 5
                break
            case Direction.RIGHT:
                if (this.x <= this.board.w - this.size - 5) this.x += 5
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