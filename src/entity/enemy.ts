import Position from "../position.js";
import CircleEntity from "./circleEntity.js";

export default class Enemy extends CircleEntity {
    currentMov: number
    targets: Position[]

    constructor(x: number, y: number, size = 10){
        super(x,y,4,size)
        this.currentMov = 0
        this.targets = []
    }

    addTarget(p: Position){
        this.targets.push(p)
    }

    moveAuto(){
        if (!this.targets.length) return

        const mov = this.targets[this.currentMov]
        const x1 = mov[0]
        const y1 = mov[1]

        if (this.x === x1 && this.y === y1){
            this.currentMov = (this.currentMov + 1) % this.targets.length
            return
        }

        if (this.x != x1){
            if (this.x < x1) this.x += this.speed
            else this.x -= this.speed
        }

        if (this.y != y1){
            if (this.y < y1) this.y += this.speed
            else this.y -= this.speed
        }
    }
    
    draw(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "black"
        ctx.fillStyle = "blue"

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        ctx.fill()
        ctx.stroke()
    }
}