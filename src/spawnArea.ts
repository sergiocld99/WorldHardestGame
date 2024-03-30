import Position from "./position.js"

export default class SpawnArea {
    r0: number
    c0: number
    w: number
    h: number
    id: number

    constructor(r0: number, c0: number, w: number, h: number, id: number){
        this.r0 = r0
        this.c0 = c0
        this.w = w
        this.h = h
        this.id = id
    }

    contains(row: number, col: number): boolean {
        const x = col >= this.c0 && col < this.c0 + this.w
        const y = row >= this.r0 && row < this.r0 + this.h
        return x && y
    }

    getCentre(): Position {
        return [this.c0 + this.w/2, this.r0 + this.h/2]
    }
}