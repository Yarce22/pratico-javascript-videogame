const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');

let canvasSize;
let elementsSize;
let timeStart;
let timePlayer;
let timeInterval;
let lvl = 0;
let lives = 3

const playerPosition = {
    x: undefined,
    y: undefined
};

const giftPosition = {
    x: undefined,
    y: undefined
};

let enemiesPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = Number((window.innerWidth * 0.8).toFixed(0));
    } else {
        canvasSize = Number((window.innerHeight * 0.8).toFixed(0));
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = Number((canvasSize / 10).toFixed(0));

    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[lvl];

    if (!map) {
        function gameFinish() {
            console.log('Terminaste el juego');
            clearInterval(timeInterval);
            const recordTime = localStorage.getItem('recordTime');
            const playerTime = spanTime.innerHTML;

            if (recordTime) {
                if (recordTime > playerTime) {
                    localStorage.setItem('recordTime', playerTime);
                    spanRecord.innerHTML = localStorage.getItem('recordTime');
                }
            } else {
                localStorage.setItem('recordTime', playerTime)
                spanRecord.innerHTML = localStorage.getItem('recordTime');
            }
        };
        gameFinish();
        return;
    };

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval (showTime, 100);
        function showRecord () {
            spanRecord.innerHTML = localStorage.getItem('recordTime')
        };
        showRecord();
    }

    
    showLives();

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    enemiesPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = Number((elementsSize * (colI + 1)).toFixed(0));
        const posY = Number((elementsSize * (rowI + 1)).toFixed(0));

        if (col == 'O') {
            if (!playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX;
                playerPosition.y = posY;
            };
        } else if (col == 'I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
        } else if (col == 'X') {
            enemiesPositions.push({
                x: posX,
                y: posY
            });
        };

        game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x == giftPosition.x;
    const giftCollisionY = playerPosition.y == giftPosition.y;
    const giftCollision = giftCollisionX && giftCollisionY;
    const enemyCollision = enemiesPositions.find(enemy => {
        const enemyCollisionX = enemy.x == playerPosition.x;
        const enemyCollisionY = enemy.y == playerPosition.y;
        return enemyCollisionX && enemyCollisionY;
    })

    if (giftCollision) {
        function lvlwin() {
            lvl++;
            startGame();
        };
        lvlwin();

    }

    if (enemyCollision) {
        function collision() {
            lives--;
            showLives();

            if ( lives <= 0) {
                lvl = 0;
                lives = 3;
            }

            playerPosition.x = undefined;
            playerPosition.y = undefined;
            startGame();
        };
        collision();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function showLives() {
    const livesArray = Array(lives).fill(emojis['LIVES']);
    spanLives.innerHTML = livesArray;
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp' || event.key == 'w' || event.key == 'W') moveUp();
    else if (event.key == 'ArrowLeft' || event.key == 'a' || event.key == 'A') moveLeft();
    else if (event.key == 'ArrowRight' || event.key == 'd' || event.key == 'D') moveRight();
    else if (event.key == 'ArrowDown' || event.key == 's' || event.key == 'S') moveDown();
}
function moveUp() {
    if ((playerPosition.y - elementsSize) < elementsSize) {
        return
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}
function moveLeft() {
    if ((playerPosition.x - elementsSize) < elementsSize) {
        return
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    if ((playerPosition.x + elementsSize) > canvasSize) {
        return
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    if ((playerPosition.y + elementsSize) > canvasSize) {
        return
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}