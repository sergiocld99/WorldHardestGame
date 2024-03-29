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
        this.matrix = []
    }

    updateDimen(canvas: HTMLCanvasElement){
        canvas.width = this.cols * this.cellSize
        canvas.height = this.rows * this.cellSize
        this.w = canvas.width
        this.h = canvas.height
    }

    // ---- CONSTRUCTION -----------------

    build(level: number, canvas: HTMLCanvasElement) {
        // define rows and cols
        switch(level){
            case 3:
                this.cols = 5
                break
            case 4:
                this.rows = 14
                this.cols = 14
                break
        }
        
        this.matrix = Array.from({length: this.rows}, () => {
            return Array(this.cols).fill(CellType.DEFAULT)
        })

        this.updateDimen(canvas)

        // place areas
        switch(level){
            case 1:
                this.placeArea(0,0,3,this.rows,CellType.GREEN)
                this.placeArea(0,this.cols-3,3,this.rows,CellType.END)
                this.placeRowAndMirror(0,3,this.cols-5,CellType.EMPTY)
                this.placeColAndMirror(3,1,this.rows-1,CellType.EMPTY)
                break
            case 2:
                this.placeArea(0,0,3,2,CellType.EMPTY,true)
                this.placeArea(2,0,3,2,CellType.GREEN)
                this.placeArea(2,this.cols-3,3,2,CellType.END)
                this.placeArea(4,0,3,2,CellType.EMPTY,true)
                break
            case 3:
                this.placeRow(0,1,5,CellType.EMPTY)
                this.placeArea(2,1,3,3,CellType.END)
                break
            case 4:
                this.placeArea(0,0,6,3,CellType.EMPTY,true)
                this.placeArea(0,6,2,3,CellType.GREEN)
                this.placeArea(0,8,6,3,CellType.EMPTY,true)
                this.placeArea(3,0,3,3,CellType.EMPTY,true)
                this.placeArea(6,0,3,2,CellType.END)
                this.placeArea(6,11,3,2,CellType.EMPTY)
                this.placeArea(8,0,3,3,CellType.EMPTY,true)
                this.placeArea(11,6,2,3,CellType.EMPTY)
                this.placeArea(3,3,2,1,CellType.EMPTY,true)
                this.placeArea(3,9,2,1,CellType.EMPTY,true)
                this.placeArea(4,3,1,1,CellType.EMPTY,true)
                this.placeArea(4,10,1,1,CellType.EMPTY,true)
                break
        }
    }

    placeArea(r0: number, c0: number, w: number, h: number, type: CellType, mirror = false){
        for (let r=r0; r<r0+h; r++){
            if (mirror) this.placeRowAndMirror(r,c0,c0+w,type)
            else this.placeRow(r,c0,c0+w,type)
        }
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

    getCellType(pos: Position){
        let x = pos[0], y = pos[1]
        return this.matrix[y][x]
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
                        this.drawEmptyCell(x,y,ctx)
                        break
                }
            }
        }
    }

    drawCell(x: number, y:number, color: string, ctx: CanvasRenderingContext2D){
        ctx.fillStyle = color
        ctx.fillRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize)

        // outside edges
        ctx.lineWidth = 5

        if (y === 0) this.drawLine(x,x+1,y,y,ctx)
        else if (y === this.rows-1) this.drawLine(x,x+1,y+1,y+1,ctx)

        if (x === 0) this.drawLine(x,x,y,y+1,ctx)
        else if (x === this.cols-1) this.drawLine(x+1,x+1,y,y+1,ctx)
    }

    drawEmptyCell(x: number, y: number, ctx: CanvasRenderingContext2D){
        // top border
        if (!this.isEmpty([x,y-1])){
            ctx.lineWidth = 2.5
            this.drawLine(x,x+1,y,y,ctx)
        }

        // bottom border
        if (!this.isEmpty([x,y+1])){
            ctx.lineWidth = 5
            this.drawLine(x,x+1,y+1,y+1,ctx)
        }

        // left border
        if (!this.isEmpty([x-1, y])){
            ctx.lineWidth = 2.5
            this.drawLine(x,x,y,y+1,ctx)
        }

        // right border
        if (!this.isEmpty([x+1,y])){
            ctx.lineWidth = 5
            this.drawLine(x+1,x+1,y,y+1,ctx)
        }
    }

    drawLine(x0: number, x1: number, y0: number, y1: number, ctx: CanvasRenderingContext2D){
        ctx.beginPath()
        ctx.moveTo(x0*this.cellSize, y0*this.cellSize)
        ctx.lineTo(x1*this.cellSize, y1*this.cellSize)
        ctx.stroke()
    }
}