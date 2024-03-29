export default class Player {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    move(dir) {
        switch (dir) {
            case 0 /* UP */:
                if (this.y >= 5)
                    this.y -= 5;
                break;
            case 1 /* DOWN */:
                // board.y - 5 - 20 due player size
                if (this.y <= 475)
                    this.y += 5;
                break;
            case 2 /* LEFT */:
                if (this.x >= 5)
                    this.x -= 5;
                break;
            case 3 /* RIGHT */:
                // board.x - 5 - 20 due player size
                if (this.x <= 175)
                    this.x += 5;
                break;
        }
    }
    draw(ctx) {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
}
