import Position from "../position.js";
import { distance } from "../utils.js";
import Enemy from "./enemy.js";

export default class RadianEnemy extends Enemy {
    degrees: number
    radius: number
    centre: Position

    constructor(deltaX: number, deltaY: number, centre: Position){
        super(centre[0]+deltaX, centre[1]+deltaY, 8)
        this.centre = centre
        this.radius = distance([0,0], [deltaX, deltaY])

        if (deltaX === 0){
            if (deltaY < 0) this.degrees = 90
            else this.degrees = 270
        } else {
            if (deltaX < 0) this.degrees = 0
            else this.degrees = 180
        }
    }

    moveAuto(): void {
        this.degrees = (this.degrees + 2) % 360
        const radian = this.degrees * Math.PI / 180
        this.x = this.centre[0] + this.radius * Math.cos(radian)
        this.y = this.centre[1] + this.radius * Math.sin(radian)
    }
}