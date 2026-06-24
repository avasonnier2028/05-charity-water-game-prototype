// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//Elements
let character = document.getElementById("characterContainer");
let characterSheet = document.getElementById("characterSheet");

let pixel = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixelSize"));
let gridCell = pixel * 32;
let map =   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
             [0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
             [0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
/*Entrance*/ [0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],]

let x = 9; 
let y = 12;
let keysPressed = [];

// Listen for key presses and releases
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
}

const keys = {
    "ArrowUp": directions.up,
    "ArrowDown": directions.down,
    "ArrowLeft": directions.left,
    "ArrowRight": directions.right
}

window.addEventListener('keydown', (event) => {
    let direct = keys[event.key];
    if (keysPressed.indexOf(direct) === -1){
        keysPressed.unshift(direct);
    }
});

window.addEventListener('keyup', async (event) => {
    await sleep(150);
    let direct = keys[event.key];
    let index = keysPressed.indexOf(direct);
    if (index > -1) {
        keysPressed.splice(index, 1);
    }
});



const updateMovement = () => {
    if(keysPressed[0]){
        if(keysPressed[0] === directions.left){
            characterSheet.setAttribute("data-facing", "left")
            if (map[y][x - 1] === 1){
                x -= 1;
                console.log(`update x-coord to ${x} times ${gridCell}`);
            }
        }
        if(keysPressed[0] === directions.right){
            characterSheet.setAttribute("data-facing", "right")
            if (map[y][x + 1] === 1){
                x += 1;
                console.log(`update x-coord to ${x} times ${gridCell}`);
            }
        }
        if(keysPressed[0] === directions.down){
            characterSheet.setAttribute("data-facing", "down")
            if (map[y + 1][x] === 1){
                y += 1; 
                console.log(`update y-coord to ${y} times ${gridCell}`);
            }
        }
        if(keysPressed[0] === directions.up)  {
            characterSheet.setAttribute("data-facing", "up")
            if (map[y - 1][x] === 1) {
                y -= 1; 
                console.log(`update y-coord to ${y} times ${gridCell}`);
            }
        }
    }

    character.style.top = `${(y - 0.5) * gridCell}px`;
    character.style.left = `${(x - 0.25) * gridCell}px`;
}

async function move () {
    updateMovement();
    await sleep(275);
    window.requestAnimationFrame(() => {
        move();
    });
}

move();
