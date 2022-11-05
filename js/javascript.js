const messages = document.querySelector("#messages");
const messageBoard = document.querySelector("#messageBoard");
const buttons = document.querySelectorAll("button");
const yourScore = document.querySelector("#yourScore");
const bigContainer = document.querySelector("#bigContainer");
const tyScore = document.querySelector("#tieScore");
const yourScoreContainer = document.querySelector("#yourScoreContainer");
const compScores = document.querySelector("#compScore");
const compScoreContainer = document.querySelector("#compScoreContainer");
const tieScoreContainer = document.querySelector("#tieScoreContainer");

//creating buttons for replay options
const yesBtn = document.createElement('button');
yesBtn.textContent = "Yes";
const noBtn = document.createElement('button');
noBtn.textContent = 'No';
yesBtn.classList.add("resetButtons");
noBtn.classList.add("resetButtons");

let playerHand = '';
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

function getComputerChoice() {
    //create a integer variable called randomNumber
    let randomNumber;

    //create a string variable called computerHand
    let computerHand;

    //get random number between 1-3 (3 choices) and input to randomNumber
    randomNumber = getRandomInt(1,4);

    //convert numbers 0-2 to rock, paper, scissors and input to computerHand
    if (randomNumber === 1) {
        computerHand = 'rock';
    } else if (randomNumber === 2) {
        computerHand = 'paper';
    } else computerHand = 'scissors'
    
    //return computerHand
    return computerHand;


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function gameRound(playerSelection, computerSelection) {
    //run through game logic to determine winner
    if (playerSelection === 'rock' && computerSelection === 'paper') {
        winnerOutput(playerSelection, computerSelection, 0);
    } else if (playerSelection === 'rock' && computerSelection === 'scissors') {
        winnerOutput(playerSelection, computerSelection, 1);
    } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        winnerOutput(playerSelection, computerSelection, 1);
    } else if (playerSelection === 'scissors' && computerSelection === 'rock') {
        winnerOutput(playerSelection, computerSelection, 0);
    } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
        winnerOutput(playerSelection, computerSelection, 0);
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        winnerOutput(playerSelection, computerSelection, 1);
    } else if (playerSelection === computerSelection) {
        //for tied game

        messages.textContent = `You tied! ${playerSelection} ties with ${computerSelection}`;
        ++tieScore;
        messageBoard.appendChild(messages);
    }

}

function winnerOutput (playerHand, computerHand, results) {
    if (results) {
        messages.textContent = `You win! ${playerHand} beats ${computerHand}`;
        ++playerScore;
        messageBoard.appendChild(messages);
    } else {
        messages.textContent = `You lose! ${computerHand} beats ${playerHand}`;
        ++computerScore;
        messageBoard.appendChild(messages);
    }
}

function gameStart() {

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            playerHand = button.id;
            gameRound(playerHand, getComputerChoice());
            scoreOutput(playerScore, computerScore, tieScore);
            checkWinner(playerScore, computerScore);
        });
    });
}

//outputs current score to DOM
function scoreOutput(playScore, compScore, tScore) {
    // messages.textContent = `You: ${playScore} | Computer: ${compScore} | Tied: ${tScore}`;
    // messageBoard.appendChild(messages);

    yourScore.textContent = `${playScore}`;
    yourScoreContainer.appendChild(yourScore);
    tyScore.textContent = `${tScore}`;
    tieScoreContainer.appendChild(tyScore);
    compScores.textContent = `${compScore}`;
    compScoreContainer.appendChild(compScores);
}

//function that checks if winner has been found and triggers replay option function
function checkWinner(playScore, compScore) {
    if (playScore === 5) {
        messages.textContent = "You won!";
        messageBoard.appendChild(messages);
        playAgain();
    } else if (compScore === 5) {
        messages.textContent = "You lost!";
        messageBoard.appendChild(messages);
        playAgain();
    }
}

function playAgain() {
    resetMessageOutput();
    buttons.forEach((button) => {
        button.classList.add("disabled");
        document.querySelector("#rock").disabled = true;
        document.querySelector("#paper").disabled = true;
        document.querySelector("#scissors").disabled = true;
    })
    yesBtn.addEventListener("click", () => {
        gameReset();
        scoreOutput(playerScore, computerScore, tieScore);
    });
    noBtn.addEventListener("click", () => {
        bigContainer.textContent = "Goodbye";
    });
}

function gameReset() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    messageBoard.removeChild(messages);
    buttons.forEach((button) => {
        button.classList.remove("disabled");
        document.querySelector("#rock").disabled = false;
        document.querySelector("#paper").disabled = false;
        document.querySelector("#scissors").disabled = false;
    })
}

//function that will output the buttons and message of replaying the game
function resetMessageOutput() {
    // buttons.forEach((button) => container.removeChild(button));
    // container.removeChild(choiceButtons);
    // container.removeChild(resultMsg);
    messages.textContent = "Do you want to play again?"
    messages.appendChild(yesBtn);
    messages.appendChild(noBtn);
    messageBoard.appendChild(messages);
}

scoreOutput(playerScore, computerScore, tieScore);
gameStart();