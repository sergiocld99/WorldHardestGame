import Position from "./position.js"

export default class Movement {
    from: Position
    to: Position

    constructor(from: Position, to: Position){
        this.from = from
        this.to = to
    }
}