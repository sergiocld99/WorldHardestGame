import Board from "./board.js"
import Direction from "./direction.js"
import Entity from "./entity.js"
import Position from "./position.js"

export default class Player extends Entity {
    size: number
    board: Board

    constructor(x: number, y: number, size: number, board: Board){
        super(x,y,3)
        this.size = size
        this.board = board
    }

    move(dir: Direction){
        let target
        
        switch (dir) {
            case Direction.UP:
                target = this.board.translate([this.x, this.y-this.speed])
                if (this.board.isEmpty(target)) return
                this.y -= this.speed
                break;
            case Direction.DOWN:
                target = this.board.translate([this.x, this.y+this.speed+this.size])
                if (this.board.isEmpty(target)) return
                this.y += this.speed
                break
            case Direction.LEFT:
                target = this.board.translate([this.x-this.speed, this.y])
                if (this.board.isEmpty(target)) return
                this.x -= this.speed
                break
            case Direction.RIGHT:
                target = this.board.translate([this.x+this.speed+this.size, this.y])
                if (this.board.isEmpty(target)) return
                this.x += this.speed
                break
        }
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "black"
        ctx.fillStyle = "red"

        ctx.fillRect(this.x,this.y,this.size,this.size)
        ctx.strokeRect(this.x,this.y,this.size,this.size)
    }

    // ---- CALC AUXILIAR METHODS --------------

    getCorners(): Position[] {
        const x0 = this.x
        const y0 = this.y

        const x1 = this.x + this.size
        const y1 = this.y + this.size

        return [
            [x0,y0], [x0,y1], [x1,y0], [x1,y1]
        ]
    }
}