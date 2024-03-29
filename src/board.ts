import CellType from "./cellType.js"
import Position from "./position.js"

export default class Board {
    w: number
    h: number
    cellSize: number
    rows: number
    cols: number
    matrix: CellType[][]

    constructor(w: number, h: number){
        this.w = w
        this.h = h
        this.cellSize = 40
        this.rows = h / this.cellSize
        this.cols = w / this.cellSize
        this.matrix = Array.from({length: this.rows}, () => {
            return Array(this.cols).fill(CellType.DEFAULT)
        })
    }

    // ---- CONSTRUCTION -----------------

    build() {
        // green areas
        for (let y=0; y<this.rows; y++){
            this.placeRow(y,0,3,CellType.GREEN)
            this.placeRow(y,this.cols-3,this.cols,CellType.END)
        }

        // empty
        this.placeRowAndMirror(0,3,this.cols-5,CellType.EMPTY)
        this.placeColAndMirror(3,1,this.rows-1,CellType.EMPTY)
    }

    placeRow(row: number, x0: number, x1: number, type: CellType){
        for (let x=x0; x<x1; x++){
            this.matrix[row][x] = type
        }
    }

    placeColumn(col: number, y0: number, y1: number, type: CellType){
        for (let y=y0; y<y1; y++){
            this.matrix[y][col] = type
        }
    }

    placeRowAndMirror(row: number, x0: number, x1: number, type: CellType){
        this.placeRow(row, x0, x1, type)
        this.placeRow(this.rows-row-1, this.cols-x1, this.cols-x0, type)
    }

    placeColAndMirror(col: number, y0: number, y1: number, type: CellType){
        this.placeColumn(col, y0, y1, type)
        this.placeColumn(this.cols-col-1, this.rows-y1, this.rows-y0, type)
    }

    // ---- QUERIES --------------------

    isEmpty(pos: Position): boolean {
        let x = pos[0], y = pos[1]
        if (y < 0 || y >= this.rows) return true
        if (x < 0 || x >= this.cols) return true
        return this.matrix[y][x] === CellType.EMPTY
    }

    translate(entityCoords: Position): Position {
        const x = Math.floor(entityCoords[0] / this.cellSize)
        const y = Math.floor(entityCoords[1] / this.cellSize)
        return [x,y]
    }

    // ---- DRAWING --------------------

    draw(ctx: CanvasRenderingContext2D){
        for (let y=0; y<this.rows; y++){
            for (let x=0; x<this.cols; x++){
                const value = this.matrix[y][x]

                switch(value){
                    case CellType.DEFAULT:
                        let even = (x+y) % 2 === 0
                        this.drawCell(x,y,even ? "white" : "lightgray",ctx)
                        break
                    case CellType.GREEN:
                    case CellType.END:
                        this.drawCell(x,y,"lightgreen",ctx)
                        break
                    case CellType.EMPTY:
                        break
                }
            }
        }
    }

    drawCell(x: number, y:number, color: string, ctx: CanvasRenderingContext2D){
        ctx.fillStyle = color
        ctx.fillRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize)
    }
}