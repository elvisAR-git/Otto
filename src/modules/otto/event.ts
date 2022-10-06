export class Event {
    params: any[];
    name: string;
    type: string;

    constructor(params: any[], name: string, type: string) {
        this.params = params
        this.name = name
        this.type = type
    }

}


export class MoveRight extends Event {
    tiles: number;
    direction: string;
    constructor(params: any[], tiles: number) {
        super(params, "MoveRight", "move")
        this.tiles = tiles
        this.direction = "right"
    }
}

export class MoveLeft extends Event {
    tiles: number;
    direction: string;
    constructor(params: any[], tiles: number) {
        super(params, "MoveLeft", "move")
        this.tiles = tiles
        this.direction = "left"
    }
}

export class MoveUp extends Event {
    tiles: number;
    direction: string;
    constructor(params: any[], tiles: number) {
        super(params, "MoveUp", "move")
        this.tiles = tiles
        this.direction = "up"
    }
}

export class MoveDown extends Event {
    tiles: number;
    direction: string;
    constructor(params: any[], tiles: number) {
        super(params, "MoveDown", "move")
        this.tiles = tiles
        this.direction = "down"
    }
}


export class Reset extends Event {
    constructor(params: any[]) {
        super(params, "Reset", "reset")
    }
}


export class RedoLastEvent extends Event {
    constructor(params: any[]) {
        super(params, "RedoLastEvent", "redo")
    }
}

export class ChangeColor extends Event {
    color: string;
    constructor(params: any[], color: string) {
        super(params, "ChangeColor", "color")
        this.color = color
    }
}
