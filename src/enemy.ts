import Entity from "./entity.js";
import Player from "./player.js";
import Position from "./position.js";
import { distance } from "./utils.js";

export default class Enemy extends Entity {
    size: number
    currentMov: number
    targets: Position[]

    constructor(x: number, y: number, size: number){
        super(x,y,4)
        this.size = size
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

    touchesCube(player: Player): boolean {
        // (x,y) of enemy is its centre
        const centre: Position = [this.x, this.y]

        // (x,y) of player is its top-left corner
        const inside = player.getCorners().filter(c => {
            let r = distance(c, centre)
            return r < this.size
        })

        return inside.length > 0
    }
    
    draw(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "black"
        ctx.fillStyle = "blue"

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        ctx.fill()
    }
}