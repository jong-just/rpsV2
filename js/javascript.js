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
        resultMsg.classList.add('resultMsg');
        resultMsg.textContent = `You tied! ${playerSelection} ties with ${computerSelection}`;
        ++tieScore;
        container.appendChild(resultMsg);
    }

}