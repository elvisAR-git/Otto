import Otto from "../otto/otto"

export default class Game {
    width: number
    height: number
    tileSize: number
    player: Otto

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.tileSize = 50
        this.player = new Otto(this)
    }

    update() {
        this.player.update()
    }
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

        // draw grid

        for (let x = this.tileSize; x < canvas.width; x += this.tileSize) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, canvas.width)
            ctx.strokeStyle = "rgba(90,120, 20, 0.3)"
            ctx.stroke()

        }

        for (let y = this.tileSize; y < canvas.height; y += this.tileSize) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(canvas.height, y)
            ctx.stroke()

        }


        this.player.draw(ctx)


    }

}