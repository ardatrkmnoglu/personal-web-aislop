const letters = [
    document.getElementById("p-letter"),
    document.getElementById("r-letter"),
    document.getElementById("i-letter"),
    document.getElementById("s-letter"),
    document.getElementById("m-letter")
];
const letterBoxes = [
    document.getElementById("p-box"),
    document.getElementById("r-box"),
    document.getElementById("i-box"),
    document.getElementById("s-box"),
    document.getElementById("m-box")
];

const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const guessBox = document.getElementById("guess-box");
const scoreContainer = document.getElementById("score");
const heartsContainer = document.getElementById("hearts");

const word = "prism";
let score = 0;
let lives = 3;
let openLetters = 0;

input = document.getElementById("guess-box");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submit-btn").click();
    }
})

function updateScore() {
    scoreContainer.textContent = `Score: ${score}`;
}

function updateHearts() {
    heartsContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement("img");
        heart.src = "../images/heart.svg";
        heart.classList.add("heart");
        heartsContainer.appendChild(heart);
    }
}

function revealLetter(guess) {
    let correctGuess = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess.toLowerCase() && letters[i].classList.contains("hidden")) {
            letters[i].classList.remove("hidden");
            letterBoxes[i].classList.remove("letter-container");
            letterBoxes[i].classList.add("open-letter-container");
            correctGuess = true;
            openLetters++;
        }
    }
    return correctGuess;
}

function checkWin() {
    if (openLetters === word.length) {
        alert("Congratulations! You won the game!");
        submitButton.disabled = true;
    }
}

resetButton.style.display = "none"

guessBox.addEventListener("keydown", () => {
    resetButton.style.display = "block"
});

submitButton.addEventListener("click", () => {
    const guess = guessBox.value.toLowerCase();
    if (guess.length !== 1 && guess.length !== 5) {
        alert("Please enter a single letter or the whole word.");
        return;
    }

    if (guess.length === 5 && guess === word) {
        score = 100;
        updateScore();
        letters.forEach(img => img.classList.remove("hidden"));
        letterBoxes.forEach(img => img.classList.remove("letter-container"));
        letterBoxes.forEach(img => img.classList.add("open-letter-container"));
        alert("Congratulations! You won the game!");
        submitButton.disabled = true;
        return;
    }
    else if (guess.length === 5 && guess !== word) {
        lives--;
        lives--;
        lives--;
        updateHearts();
        alert("Game Over! You guessed the wrong word.");
        submitButton.disabled = true;
        return;
    }

    const correctGuess = revealLetter(guess);
    if (correctGuess) {
        score += 20;
        updateScore();
        checkWin();
    } else {
        lives--;
        updateHearts();
        if (lives === 0) {
            alert("Game Over! You've run out of lives.");
            submitButton.disabled = true;
        }
    }

    guessBox.value = "";
});

resetButton.addEventListener("click", () => {
    score = 0;
    lives = 3;
    openLetters = 0;
    updateScore();
    updateHearts();
    submitButton.disabled = false;
    letters.forEach(img => img.classList.add("hidden"));
    letterBoxes.forEach(img => img.classList.remove("open-letter-container"));
    letterBoxes.forEach(img => img.classList.add("letter-container"));
    guessBox.value = "";
    resetButton.style.display = "none"
});

updateScore();
updateHearts();