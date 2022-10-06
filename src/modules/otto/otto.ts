
import Game from "../game/game";
import { ChangeColor, Event, MoveDown, MoveLeft, MoveRight, MoveUp, RedoLastEvent, Reset } from "./event";



export default class Otto {
    x: number = 50;
    y: number = 50;
    speed = 3;
    frameTime = 25;
    direction = "up"
    angle = 0;
    radius = 20;
    color = 'red';
    stroke = 'green';
    elavation = 0;
    strokeWidth = 0;
    opacity = 1;
    visible = true;
    executionTime: number = 0;
    game: Game
    height: number
    width: number
    tile = 0
    events: any[]
    moving = false
    currentEvent?: any;
    lastEvent?: any;
    lastTimeStamp: number = 0
    lastX = 0
    lastY = 0

    constructor(game: Game) {
        this.x = 50
        this.y = 50;
        this.speed = 3;
        this.frameTime = 25;
        this.direction = "up"
        this.angle = 0;
        this.radius = 20;
        this.color = 'red';
        this.stroke = 'green';
        this.elavation = 0;
        this.strokeWidth = 0;
        this.opacity = 1;
        this.visible = true;
        this.game = game;
        this.height = this.game.tileSize
        this.width = this.game.tileSize
        this.tile = 0
        this.events = []
        this.moving = false
        this.currentEvent = null
        this.lastX = 0
        this.lastY = 0
        this.lastEvent = null

    }

    update() {

        this.lastEvent = this.currentEvent ? this.currentEvent : this.lastEvent

        if (this.events.length > 0) {
            this.executionTime
        }

        this.events.forEach(event => {

            if (event.type == "move") {

                if (!this.moving) {
                    this.moving = true
                    this.tile = event.tiles
                    this.events.splice(this.events.indexOf(event), 1)
                    this.currentEvent = event
                    this.lastX = this.x
                    this.lastY = this.y
                    this.direction = event.direction

                }
            }

            if (event.type == "reset" && !this.moving) {
                this.currentEvent = event
                this.events.splice(this.events.indexOf(event), 1)
            }

            // redo

            if (event.type == "redo" && !this.moving) {
                if (this.lastEvent) {
                    console.log("Redoing last event", this.lastEvent.name)
                    this.events.push(this.lastEvent)
                    // pop redo event
                    this.events.splice(this.events.indexOf(event), 1)
                }
            }

            // color

            if (event.type == "color" && !this.moving) {
                this.currentEvent = event
                this.events.splice(this.events.indexOf(event), 1)

            }


        });


        this.runCurrentEvent();

        this.checkGameBounds();

    }

    runCurrentEvent() {

        if (this.currentEvent) {


            if (this.currentEvent.type == "move") {

                if (this.tile <= 0) {
                    this.currentEvent = null
                    this.moving = false
                    return
                }

                if (this.currentEvent.name == "MoveRight") {
                    this.x += this.speed

                    let tilePx = (this.game.tileSize * this.tile) + this.lastX

                    if (this.x >= tilePx) {
                        // stop moving
                        this.x = tilePx
                        this.tile = 0
                        this.moving = false

                    }
                }

                if (this.currentEvent.name == "MoveLeft") {

                    this.x -= this.speed

                    let tilePx = -(this.game.tileSize * this.tile) + this.lastX

                    if (this.x <= tilePx) {
                        // stop moving
                        this.x = tilePx
                        this.tile = 0
                        this.moving = false

                    }
                }

                if (this.currentEvent.name == "MoveUp") {

                    this.y -= this.speed

                    let tilePx = -(this.game.tileSize * this.tile) + this.lastY

                    if (this.y <= tilePx) {
                        // stop moving
                        this.y = tilePx
                        this.tile = 0
                        this.moving = false

                    }
                }

                if (this.currentEvent.name == "MoveDown") {

                    this.y += this.speed

                    let tilePx = (this.game.tileSize * this.tile) + this.lastY

                    if (this.y >= tilePx) {
                        // stop moving
                        this.y = tilePx
                        this.tile = 0
                        this.moving = false

                    }
                }

            }

            if (this.currentEvent.type == "reset") {
                this.x = 50
                this.y = 50;
                this.speed = 3;
                this.frameTime = 25;
                this.direction = "up"
                this.angle = 0;
                this.radius = 20;
                this.color = 'red';
                this.stroke = 'green';
                this.elavation = 0;
                this.strokeWidth = 0;
                this.opacity = 1;
                this.visible = true;
                this.height = this.game.tileSize
                this.width = this.game.tileSize
                this.tile = 0
                this.events = []
                this.moving = false
                this.currentEvent = null
                this.lastX = 0
                this.lastY = 0

            }

            if (this.currentEvent.type == "color") {
                this.color = this.currentEvent.color
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color
        // rotate about the center of the object
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.angle);
        context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();


        // shadow
        context.shadowColor = 'gray';
        context.shadowBlur = 20;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 0;

        // opacity
        context.save();

        context.restore();



    }


    moveRight(tiles: number) {
        this.events.push(new MoveRight([], tiles))

    }

    moveLeft(tiles: number) {
        this.events.push(new MoveLeft([], tiles))
    }

    moveUp(tiles: number) {
        this.events.push(new MoveUp([], tiles))
    }

    moveDown(tiles: number) {
        this.events.push(new MoveDown([], tiles))
    }

    checkGameBounds() {
        if (this.x < 0) {
            this.x = 0;
            this.moving = false
        }
        if (this.x > (this.game.width - this.width)) {
            this.x = this.game.width - this.width;

            this.moving = false
        }
        if (this.y < 0) {

            this.y = 0;
            this.moving = false
        }

        if (this.y > (this.game.height - this.height)) {

            this.y = this.game.height - this.height;
            this.moving = false
        }


    }

    reset() {
        this.events.push(new Reset([]))
    }


    redoPreviousEvent() {
        this.events.push(new RedoLastEvent([]))
    }

    changeColor(color: string) {
        this.events.push(new ChangeColor([], color))
    }




}