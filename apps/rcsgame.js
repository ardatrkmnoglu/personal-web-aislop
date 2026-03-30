const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {

    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    resultDisplay.classList.remove("greenText", "redText");

    if (playerChoice === computerChoice) {
        result = "It is a tie!";
    }
    else {
        switch (playerChoice) {
            case "rock":
                if (computerChoice === "scissors") {
                    resultDisplay.classList.add("greenText");
                    result = "You won!";
                    playerScore++;
                }
                else {
                    resultDisplay.classList.add("redText");
                    result = "You lost!";
                    computerScore++;
                }
                break;

            case "paper":
                if (computerChoice === "rock") {
                    resultDisplay.classList.add("greenText");
                    result = "You won!";
                    playerScore++;
                }
                else {
                    resultDisplay.classList.add("redText");
                    result = "You lost!";
                    computerScore++;
                }
                break;

            case "scissors":
                if (computerChoice === "paper") {
                    resultDisplay.classList.add("greenText");
                    result = "You won!";
                    playerScore++;
                }
                else {
                    resultDisplay.classList.add("redText");
                    result = "You lost!";
                    computerScore++;
                }
                break;

            default:
                break;
        }
    }

    playerDisplay.textContent = `Player (${playerScore}): ${playerChoice}`;
    computerDisplay.textContent = `Computer (${computerScore}): ${computerChoice}`;
    resultDisplay.textContent = result;

    if (playerScore != 0 || computerScore != 0) {
        resetBtn.classList.remove("hidden");
    }
}
