import CellType from "./cellType.js"

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
        this.cellSize = 25
        this.rows = h / this.cellSize
        this.cols = w / this.cellSize
        this.matrix = Array.from({length: this.rows}, () => {
            return Array(this.cols).fill(CellType.DEFAULT)
        })
    }

    build() {
        const y1 = this.rows * 0.2
        const y2 = this.rows * 0.8

        for (let y=0; y<y1; y++){
            console.log("Filling green from", 0, "to", y1)
            for (let x=0; x<this.cols; x++){
                this.matrix[y][x] = CellType.GREEN
            }
        }

        for (let y=y2; y<this.rows ; y++){
            console.log("Filling green from", y2, "to", this.rows)
            for (let x=0; x<this.cols; x++){
                this.matrix[y][x] = CellType.GREEN
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D){
        for (let y=0; y<this.rows; y++){
            for (let x=0; x<this.cols; x++){
                const value = this.matrix[y][x]

                switch(value){
                    case CellType.DEFAULT:
                        this.drawCell(x,y,"white",ctx)
                        break
                    case CellType.GREEN:
                        this.drawCell(x,y,"lightgreen",ctx)
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