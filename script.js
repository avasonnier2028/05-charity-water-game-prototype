// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//Elements
const maze = document.getElementById("map");
const character = document.getElementById("characterContainer");
const characterSheet = document.getElementById("characterSheet");
const camera = document.getElementById('camera');
const text = document.getElementById("text-container");
const textbox = document.getElementById("textbox");
const jerryCan = document.getElementById("jerry-can")
const min = document.getElementById('minutes');
const sec = document.getElementById('seconds');
const scoreBoard = document.getElementById('scoreboard');
const scoreDrops = document.getElementsByClassName('drop');
const btnUp = document.getElementById('btnUp');
const btnDown = document.getElementById('btnDown');
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');
const btnStart = document.getElementById('btnStartGame');
const startScreen = document.getElementById('startScreen');
const btnRestart = document.getElementById('btnRestartGame');
const endScreen = document.getElementById('endScreen');
const endMsg = document.getElementById('endMessage');

let pixel = parseFloat(getComputedStyle(scoreBoard).left);
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

const camera_offsety = gridCell * parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cameraOffsetY"));
const camera_offsetx = gridCell * parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cameraOffsetX"));
const offsetY =  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--offsetY"));
const offsetX =  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--offsetX"));
let x = 6; 
let y = 12;
let keysPressed = [];
let shift = 1;

//play conditions
const max_score = 6;
let score = 0;
let timer = 120; //120s = 2m
let timerId;
let entered = false;
let win = false;
let moveID;

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

    console.log("setting position");
    character.style.top = `${(y-offsetY) * gridCell}px`;
    character.style.left = `${(x-offsetX) * gridCell}px`;


    maze.style.top = `${-(y - offsetY) * gridCell + camera_offsety}px`;
    maze.style.left = `${-(x - offsetX) * gridCell + camera_offsetx}px`;


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
    moveID = requestAnimationFrame(() => {
        if(!win){
            move(); 
        }else{return;}
    });
    return;
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

function addButtonListeners(){
    btnUp.addEventListener('pointerdown', btnPushDown.bind(null, directions.up));
    btnUp.addEventListener('pointerup', btnPushUp.bind(null, directions.up));
    btnDown.addEventListener('pointerdown', btnPushDown.bind(null, directions.down));
    btnDown.addEventListener('pointerup', btnPushUp.bind(null, directions.down));
    btnLeft.addEventListener('pointerdown', btnPushDown.bind(null, directions.left));
    btnLeft.addEventListener('pointerup', btnPushUp.bind(null, directions.left));
    btnRight.addEventListener('pointerdown', btnPushDown.bind(null, directions.right));
    btnRight.addEventListener('pointerup', btnPushUp.bind(null, directions.right));
}
function btnPushDown(direct){
    if (keysPressed.indexOf(direct) === -1) {
        keysPressed.unshift(direct);
    }
}
async function btnPushUp(direct){
    await sleep(150);
    let index = keysPressed.indexOf(direct);
    if (index > -1) {
        keysPressed.splice(index, 1);
    }
}

function startGameplay(){
    character.setAttribute("data-can", "true");
    characterSheet.setAttribute("src", "./img/assets/Drop_characterSheet_Can.png")
    window.addEventListener('keydown', detectKeyDown);
    window.addEventListener('keyup', detectKeyUp);
    addButtonListeners();
    move();

    startGameTimer();
}

function tutorialRound() {
    textbox.addEventListener('click', () => {
        if (shift < 2) {
            text.style.transform = `translateY(calc(-16.5vh * ${shift}))`;
        } else{
            textbox.style.display = "none";
            jerryCan.addEventListener('click', startGameplay);
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
    jerryCan.addEventListener('click', startGameplay);

    createDrop(16, 17);
    createDrop(1, 10);
    createDrop(11, 20);
    createDrop(8, 17);
    createDrop(18, 10);
    createDrop(3, 27);
}

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

//drop collection
window.addEventListener('click', (event) => {
    if (event.target.matches('.spawnDroplet')) {
        score++;
        event.target.remove();
        scoreDrops[score-1].style.display = "block";
    }
});

async function endCelebration() {
    clearInterval(timerId);
    await sleep(600);
    window.removeEventListener('keydown', detectKeyDown);
    window.removeEventListener('keyup', detectKeyUp);
    camera.style.display = 'none';
    endScreen.style.display = 'flex';


    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const paddedSeconds = String(seconds).padStart(2, '0');
    endMsg.innerText = `You collected enough water with ${minutes}:${paddedSeconds} minutes left!`;
}

function endLost() {
    clearInterval(timerId);
    camera.style.display = 'none';
    endScreen.style.display = 'flex';

    window.removeEventListener('keydown', detectKeyDown);
    window.removeEventListener('keyup', detectKeyUp);

    endMsg.innerText = `You had ${score}/${max_score} water drops`;
}


//Start Game on Start Button
btnStart.addEventListener('click', ()=>{
    startScreen.style.display = 'none';
    camera.style.display = 'block';
    character.style.animation = 'introScene 4s ease-in-out';
    tutorialRound();
})
//Restart Game on Restart Button
btnRestart.addEventListener('click', ()=>{
    window.location.reload();
})
