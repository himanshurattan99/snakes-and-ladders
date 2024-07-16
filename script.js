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

// Storing The Turn
let turn = 'X';

// Getting All The HTML Elements
const xPosition = document.getElementById('player-x');
const yPosition = document.getElementById('player-y');
const rollDiceButton = document.getElementById('roll-dice-button');
const infoDiv = document.getElementById('info');
const cells = document.getElementsByClassName('cell');

// Gameplay Logic Function
const play = () => {
    // Generating Random Dice Value
    const steps = Math.floor(Math.random() * 6 + 1);
    // Displaying Dice Value On Info Div
    infoDiv.innerHTML = turn + ' : ' + steps;

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
        }

        // If Player Enters The Snake's Head Cell
        if ((playersPositions[turn]) in snakesPositions) {
            playersPositions[turn] = snakesPositions[playersPositions[turn]];
        }
        // If Player Enters The Ladder's Foot Cell
        else if ((playersPositions[turn]) in laddersPositions) {
            playersPositions[turn] = laddersPositions[playersPositions[turn]];
        }
    }
    // If Player Has Yet To Enter The Board
    else {
        // Player Enters the Board Only If The Dice Value Is 6 or 1
        if (steps === 6 || steps === 1) {
            playersPositions[turn] = 1;
        }
    }

    // Displaying The Player's Position After Rolling The Dice
    if (turn === 'X') {
        xPosition.innerHTML = playersPositions[turn];
    }
    else {
        yPosition.innerHTML = playersPositions[turn];
    }

    // Player Has To Repeat The Turn If Dice Value Is 6
    if (steps !== 6) {
        turn = (turn === 'X') ? 'Y' : 'X';
    }
}

// Adding Event Listener To Roll Dice Button
rollDiceButton.addEventListener('click', play);