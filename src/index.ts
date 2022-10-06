
import Game from "./modules/game/game";
import Otto from "./modules/otto/otto";



import './style.css';


window.addEventListener("load", async () => {
    const html = document.querySelector("body");
    const view = <HTMLDivElement>document.createElement("div");
    view.id = "view";
    view.className = "view";
    const uiDiv = <HTMLDivElement>document.createElement("div");
    uiDiv.id = "ui";
    uiDiv.classList.add("ui");
    const controls = <HTMLDivElement>document.createElement("div");
    controls.id = "controls";
    controls.classList.add("controls");
    const code = <HTMLTextAreaElement>document.createElement("textarea");
    code.id = "code";
    code.classList.add("code");
    const run = <HTMLButtonElement>document.createElement("button");

    run.id = "run";
    run.innerText = "Run";
    // clear
    const clear = <HTMLButtonElement>document.createElement("button");
    clear.id = "clear";
    clear.innerText = "Clear";

    controls.appendChild(code);
    controls.appendChild(run);
    controls.appendChild(clear);

    view.appendChild(uiDiv);
    view.appendChild(controls);


    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = 800;
    canvas.height = 800;
    html.appendChild(view);
    html.appendChild(canvas);

    console.log("Starting up...");


    function UpdateUI(otto: Otto) {
        uiDiv.innerHTML = `
        <div>
            <h1>Otto Stats</h1>
            <p>Current position : ${otto.x} X , ${otto.y} Y</p>
            <p>Color : ${otto.color} </p>
            <p>Moving : ${otto.moving}</p>
            <p>Trajectory : ${otto.direction}</p>
            <p>Angle : ${otto.angle}</p>
            <p>Last static position : ${otto.lastX} X, ${otto.lastY} Y </p>
            <p>Currently moving : ${otto.tile} tiles</p>
            <p>Events remaining : ${otto.events.length}</p>
            <p>Current Event : ${otto.currentEvent ? otto.currentEvent.name : 'unset'} </p>
            <p>Last Event : ${otto.lastEvent ? otto.lastEvent.name : 'unset'} </p>
            <p>Next event : ${otto.events.at(0) ? otto.events.at(0).name : 'unset'} </p>
    
            <p>Event queue : [${otto.events.map(e => e.name).join(' , ')}]</p>
    
            <h2>Meta stats</h2>
            <p>Speed : ${otto.speed} pixel(s) per frame</p>
            <p>Tile size : ${otto.game.tileSize} pixels</p>
            <p>Visible : ${otto.visible}</p>
            <p>Game width : ${otto.game.width} pixels</p>
            <p>Game height : ${otto.game.height} pixels</p>
            <p>Opacity : ${otto.opacity}</p>
            <p>Width : ${otto.width} pixels</p>
            <p>Height : ${otto.height} pixels</p>
        </div>
    
        `;

    }




    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;





    const game = new Game(canvas.width, canvas.height);

    const inject = (cod: string) => {

        const otto = game.player

        if (code) {
            otto.lastTimeStamp = new Date().getTime();
            try {
                eval(cod);
            } catch (e) {
                code.value = `//[FAIL] ${e.message}\n${code.value}`;
            }
        }
    }


    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update()
        game.draw(ctx, canvas)

        UpdateUI(game.player)
        requestAnimationFrame(gameLoop)
    }

    gameLoop()

    run.addEventListener("click", runFn);

    function runFn() {
        let codeText = code.value;
        inject(codeText);

    }

    clear.addEventListener("click", clearFn);

    function clearFn() {
        code.value = "";
    }


})



