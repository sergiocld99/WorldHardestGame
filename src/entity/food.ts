import CircleEntity from "./circleEntity.js";

export default class Food extends CircleEntity {
    taken: boolean
    
    constructor(x: number, y: number, size = 7){
        super(x,y,0,size)
        this.taken = false
    }

    draw(ctx: CanvasRenderingContext2D){
        if (this.taken) return

        ctx.strokeStyle = "black"
        ctx.fillStyle = "yellow"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        ctx.fill()
        ctx.stroke()
    }
}