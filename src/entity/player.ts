import Board from "../board.js"
import Direction from "../direction.js"
import Entity from "./entity.js"
import Position from "../position.js"

export default class Player extends Entity {
    board: Board

    constructor(startPos: Position, size: number, board: Board){
        super(startPos[0], startPos[1], 3, size)
        this.board = board
    }

    setPosition(pos: Position){
        this.x = pos[0]
        this.y = pos[1]
    }

    move(dir: Direction){
        // attempt
        switch (dir) {
            case Direction.UP:
                this.y -= this.speed
                break;
            case Direction.DOWN:
                this.y += this.speed
                break
            case Direction.LEFT:
                this.x -= this.speed
                break
            case Direction.RIGHT:
                this.x += this.speed
                break
        }

        // validate position
        const corners = this.getCorners()

        const outside = corners.filter(c => {
            let target = this.board.translate(c)
            return this.board.isEmpty(target)
        })

        // rollback if it's illegal
        if (outside.length) {
            switch(dir){
                case Direction.UP:
                    this.y += this.speed
                    break;
                case Direction.DOWN:
                    this.y -= this.speed
                    break
                case Direction.LEFT:
                    this.x += this.speed
                    break
                case Direction.RIGHT:
                    this.x -= this.speed
                    break
            }

            // return bc it didn't move
            return
        }

        // // check if reached end
        // const end = corners.filter(c => {
        //     let target = this.board.translate(c)
        //     return this.board.getCellType(target) === CellType.END
        // })

        // if (end.length){
        //     this.x = 0
        //     this.y = 0
        // }
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "black"
        ctx.fillStyle = "red"
        ctx.lineWidth = 2.5

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

    getMainPoints(): Position[] {
        const x0 = this.x
        const y0 = this.y

        const x1 = this.x + this.size
        const y1 = this.y + this.size
        
        const xm = (x1+x0) / 2
        const ym = (y1+y0) / 2

        return [
            [x0,y0], [x0,y1], [x1,y0], [x1,y1],
            [xm,y0], [xm,y1], [x0,ym], [x1,ym]
        ]
    }
}