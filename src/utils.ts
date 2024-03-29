import Position from "./position.js";

export function distance(p0: Position, p1: Position): number {
    const x_diff = p1[0] - p0[0]
    const y_diff = p1[1] - p0[1]
    return Math.sqrt(square(x_diff) + square(y_diff))
}

function square(n: number): number {
    return Math.pow(n,2)
}