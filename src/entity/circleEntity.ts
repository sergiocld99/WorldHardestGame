import Position from "../position.js";
import { distance } from "../utils.js";
import Entity from "./entity.js";
import Player from "./player.js";

export default class CircleEntity extends Entity {
    constructor(x: number, y:number,speed:number,size:number){
        super(x,y,speed,size)
    }

    touchesCube(player: Player): boolean {
        // (x,y) of enemy is its centre
        const centre: Position = [this.x, this.y]

        // (x,y) of player is its top-left corner
        const inside = player.getMainPoints().filter(c => {
            let r = distance(c, centre)
            return r < this.size
        })

        return inside.length > 0
    }
}