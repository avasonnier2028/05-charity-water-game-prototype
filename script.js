// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//Elements
const maze = document.getElementById("map");
const character = document.getElementById("characterContainer");
const characterSheet = document.getElementById("characterSheet");
const text = document.getElementById("text-container");
const textbox = document.getElementById("textbox");
const jerryCan = document.getElementById("jerry-can")
const min = document.getElementById('minutes');
const sec = document.getElementById('seconds');
const scoreDrops = document.getElementsByClassName('drop');

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
/*Entrance*/ [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
             [0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

const camera_offsety = gridCell * 2.05;
const camera_offsetx = gridCell * 1.75;
let x = 6; 
let y = 12;
let keysPressed = [];
let shift = 1;

//play conditions
const max_score = 6;
let score = 0;
let timer = 180; //180s = 3m
let timerId;
let entered = false;
let win = false;


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

    character.style.top = `${(y - 0.45) * gridCell}px`;
    character.style.left = `${(x - 0.25) * gridCell}px`;


    maze.style.top = `${-(y - 0.45) * gridCell + camera_offsety}px`;
    maze.style.left = `${-(x - 0.25) * gridCell + camera_offsetx}px`;


    //Score Check
    if (score === max_score && !win) {
        console.log("Re-opened entrance")
        map[12][9] = 1;
    }
    //Entrance Logic
    if (!entered && y === 12 && x === 10) {
        console.log("Closed entrance start");
        map[12][9] = 0;
        entered = true;
    } else if (entered && y === 12 && x === 9) {
        console.log("Closed entrance end")
        map[12][9] = 0;
        win = true;
    }
}
async function move () {
    updateMovement();
    await sleep(275);
    window.requestAnimationFrame(() => {
        move();
    });
}

function detectKeyDown(event){
    let direct = keys[event.key];
    if (keysPressed.indexOf(direct) === -1) {
        keysPressed.unshift(direct);
    }
}
async function detectKeyUp(event){
    await sleep(150);
    let direct = keys[event.key];
    let index = keysPressed.indexOf(direct);
    if (index > -1) {
        keysPressed.splice(index, 1);
    }
}

function startGame(){
    character.setAttribute("data-can", "true");
    characterSheet.setAttribute("src", "./img/assets/Drop_characterSheet_Can.png")
    window.addEventListener('keydown', detectKeyDown);
    window.addEventListener('keyup', detectKeyUp);
    move();

    startGameTimer();
}

function tutorialRound() {
    textbox.addEventListener('click', () => {
        if (shift < 2) {
            text.style.transform = `translateY(calc(var(--pixelSize) * -45px * ${shift}))`;
        } else{
            textbox.style.display = "none";
            jerryCan.addEventListener('click', startGame);
        }
        shift++;
    })

    createDrop(11, 12);
    createDrop(1,  10);
    createDrop(11, 20);
    createDrop(8, 17);
    createDrop(18, 10);
    createDrop(3, 27);
}

function playAgainRound(){
    shift = 2;
    text.style.transform = `translateY(calc(var(--pixelSize) * -45px * ${shift}))`;
    textbox.style.display = "none";
    jerryCan.addEventListener('click', startGame);

    createDrop(16, 17);
    createDrop(1, 10);
    createDrop(11, 20);
    createDrop(8, 17);
    createDrop(18, 10);
    createDrop(3, 27);
}


playAgainRound();

function startGameTimer() {
    clearInterval(timerId);
    timerId = setInterval(updateTimer, 1000);

}

function updateTimer() {
    timer--; 
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const paddedSeconds = String(seconds).padStart(2, '0');
    min.textContent = `${minutes}`;
    sec.textContent = `${paddedSeconds}`;

    //End Conditions
    if (timer <= 0) {
        endLost();
    }else if(win){
        endCelebration();
    }
}

function createDrop(y,x){
    const water = document.createElement('img');
    water.setAttribute('src', './img/branding/drop.svg');
    water.setAttribute('class', 'spawnDroplet');
    water.style.position = 'absolute';
    water.style.top = `${(y + 0.3) * gridCell}px`;
    water.style.left = `${(x + 0.4) * gridCell}px`;
    water.style.height = `${10 * pixel}px`;
    water.style.zIndex = '4';
    maze.appendChild(water);
}

window.addEventListener('click', (event) => {
    if (event.target.matches('.spawnDroplet')) {
        score++;
        event.target.remove();
        scoreDrops[score-1].style.display = "block";
    }
});

function endCelebration() {
    clearInterval(timerId); 
    alert("You won!");
}

function endLost() {
    clearInterval(timerId);
    alert("You lost")
}