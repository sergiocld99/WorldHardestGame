import Entity from "./entity.js";
import Movement from "./movement.js";

export default class Enemy extends Entity {
    size: number
    currentMov: number
    movs: Movement[]

    constructor(x: number, y: number, size: number){
        super(x,y)
        this.size = size
        this.currentMov = 0
        this.movs = []
    }

    addMovementAndBackwards(mov: Movement){
        this.movs.push(mov, new Movement(mov.to, mov.from))
    }

    moveAuto(){
        if (!this.movs.length) return

        const mov = this.movs[this.currentMov]
        const x1 = mov.to[0]
        const y1 = mov.to[1]

        if (this.x === x1 && this.y === y1){
            this.currentMov = (this.currentMov + 1) % this.movs.length
            return
        }

        if (this.x != x1){
            if (this.x < x1) this.x += 2
            else this.x -= 2
        }

        if (this.y != y1){
            if (this.y < y1) this.y += 2
            else this.y -= 2
        }
    }
    
    draw(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "black"
        ctx.fillStyle = "blue"

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        ctx.fill()
    }
}