// Start And End Points Of Snakes
const snakesPositions = {
    28: 10,
    37: 3,
    48: 16,
    75: 32,
    94: 71,
    96: 42,
};

// Start And End Points Of Ladders
const laddersPositions = {
    4: 56,
    12: 50,
    14: 55,
    22: 58,
    41: 79,
    54: 88,
};

// Storing Players Name And Positions
const playersPositions = {
    'X': 0,
    'Y': 0,
};

// For Storing The Previous Position Of Both Players
const playersPreviousPositions = {
    'X': 0,
    'Y': 0,
}

// Storing The Turn
let turn = 'X';

// Getting All The HTML Elements
const xPosition = document.getElementById('player-x-position');
const yPosition = document.getElementById('player-y-position');
const rollDiceButton = document.getElementById('roll-dice-button');
const infoDiv = document.getElementById('info');
const resetButton = document.getElementById('reset-button');
const cells = document.getElementsByClassName('cell');
const playerX = document.getElementsByClassName('player-x');
const playerY = document.getElementsByClassName('player-y');

// Game Sounds
const gameStartSound = new Audio('./assets/gameStartSound.mp3');
const stepSound = new Audio('./assets/stepSound.mp3');
const snakeSound = new Audio('./assets/snakeSound.mp3');
const ladderSound = new Audio('./assets/ladderSound.mp3');
const victorySound = new Audio('./assets/victorySound.mp3');
const resetSound = new Audio('./assets/resetSound.mp3');

// Playing Game Start Sound
gameStartSound.play();

// Function To Move Players On Board
const move = () => {
    // Hiding The Player's Previous Position And Then Displaying Current Position On Table And Board After Rolling The Dice
    if (turn === 'X') {
        xPosition.innerHTML = playersPositions[turn];
        if (playersPreviousPositions[turn] !== 0) {
            (playerX[100 - playersPreviousPositions[turn]]).style.display = 'none';
        }
        if (playersPositions[turn] !== 0) {
            (playerX[100 - playersPositions[turn]]).style.display = 'inline';
        }
    }
    else {
        yPosition.innerHTML = playersPositions[turn];
        if (playersPreviousPositions[turn] !== 0) {
            (playerY[100 - playersPreviousPositions[turn]]).style.display = 'none';
        }
        if (playersPositions[turn] !== 0) {
            (playerY[100 - playersPositions[turn]]).style.display = 'inline';
        }
    }

    // Playing Step Sound
    stepSound.play();
}

// Function To Handle The Operations When Player Lands On A Snake Or Ladder Cell
const handleSnakeOrLadder = () => {
    // Storing Snake Or Ladder Cell Position
    const cellPosition = playersPositions[turn];

    const originalColor = (cells[100 - cellPosition]).style.backgroundColor;
    const temporaryColor = (cellPosition in snakesPositions) ? '#FF3232' : '#B4FF44';

    // Changing The Snake's Or Ladder's Cell Color Temporarily For Interactive Gameplay
    (cells[100 - cellPosition]).style.backgroundColor = temporaryColor;

    // Reverting The Color After 3 Seconds
    setTimeout(() => {
        (cells[100 - cellPosition]).style.backgroundColor = originalColor;
    }, 3000);

    if ((playersPositions[turn]) in snakesPositions) {
        playersPositions[turn] = snakesPositions[playersPositions[turn]];
        // Playing Snake Sound
        snakeSound.play();
    }
    else {
        playersPositions[turn] = laddersPositions[playersPositions[turn]];
        // Playing Ladder Sound
        ladderSound.play();
    }
}

// Gameplay Logic Function
const play = () => {
    // Generating Random Dice Value
    const steps = Math.floor(Math.random() * 6 + 1);
    // Displaying Dice Value On Info Div
    infoDiv.innerHTML = turn + ' : ' + steps;

    // Storing The Current Position Of Player Before Advancing Forward
    playersPreviousPositions[turn] = playersPositions[turn];

    // If Player Has Already Entered The Board
    if (playersPositions[turn] !== 0) {
        // Advance The Player By The Dice Value, Provided Player's Current Position Plus Dice Value Is Under 100
        if (playersPositions[turn] + steps < 100) {
            playersPositions[turn] = playersPositions[turn] + steps;
        }
        // If Player Wins
        else if (playersPositions[turn] + steps === 100) {
            playersPositions[turn] = 100;

            // Displaying The Win Message On Info Div
            infoDiv.innerHTML = turn + ' Wins!!!';

            // Playing Victory Sound
            victorySound.play();

            // Removing The Event Listener From Roll Dice Button
            rollDiceButton.removeEventListener('click', play);
        }

        // If Player Enters The Snake's Head Cell Or The Ladder's Foot Cell
        if ((playersPositions[turn]) in snakesPositions || (playersPositions[turn]) in laddersPositions) {
            handleSnakeOrLadder();
        }

        // Moving The Player On Board
        move();
    }
    // If Player Has Yet To Enter The Board
    else {
        // Player Enters the Board Only If The Dice Value Is 6 or 1
        if (steps === 6 || steps === 1) {
            playersPositions[turn] = 1;
            move();
        }
    }

    // Player Has To Repeat The Turn If Dice Value Is 6
    if (steps !== 6) {
        // Changing The Turn
        turn = (turn === 'X') ? 'Y' : 'X';
    }
}

// Adding Event Listener To Roll Dice Button
rollDiceButton.addEventListener('click', play);

// Reset Game Function
const reset = () => {
    if (playersPositions['X'] !== 0) {
        (playerX[100 - playersPositions['X']]).style.display = 'none';
    }
    if (playersPositions['Y'] !== 0) {
        (playerY[100 - playersPositions['Y']]).style.display = 'none';
    }
    playersPositions['X'] = 0;
    playersPositions['Y'] = 0;
    playersPreviousPositions['X'] = 0;
    playersPreviousPositions['Y'] = 0;
    turn = 'X';
    xPosition.innerHTML = 0;
    yPosition.innerHTML = 0;
    infoDiv.innerHTML = 'Play';
    rollDiceButton.addEventListener('click', play);

    // Playing Reset Sound
    resetSound.play();
}

// Adding Event Listener To Reset Button
resetButton.addEventListener('click', reset);