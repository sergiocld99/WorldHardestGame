import Position from "../position.js";
import { distance } from "../utils.js";
import Enemy from "./enemy.js";

export default class RadianEnemy extends Enemy {
    degrees: number
    radius: number
    centre: Position

    constructor(x: number, y: number, centre: Position){
        super(x,y,8)
        this.centre = centre
        this.radius = distance(centre, [x,y])

        if (centre[0] === x){
            if (centre[1] > y) this.degrees = 90
            else this.degrees = 270
        } else {
            if (centre[0] > x) this.degrees = 0
            else this.degrees = 180
        }
    }

    moveAuto(): void {
        this.degrees = (this.degrees + 2.5) % 360
        const radian = this.degrees * Math.PI / 180
        this.x = this.centre[0] + this.radius * Math.cos(radian)
        this.y = this.centre[1] + this.radius * Math.sin(radian)
    }
}