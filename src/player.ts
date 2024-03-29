import Direction from "./direction.js"

export default class Player {
    x: number
    y: number
    size: number

    constructor(x: number, y: number, size: number){
        this.x = x
        this.y = y
        this.size = size
    }

    move(dir: Direction){
        switch (dir) {
            case Direction.UP:
                if (this.y >= 5) this.y -= 5
                break;
            case Direction.DOWN:
                // board.y - 5 - 20 due player size
                if (this.y <= 475) this.y += 5
                break
            case Direction.LEFT:
                if (this.x >= 5) this.x -= 5
                break
            case Direction.RIGHT:
                // board.x - 5 - 20 due player size
                if (this.x <= 175) this.x += 5
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