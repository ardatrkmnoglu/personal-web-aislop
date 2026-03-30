const minNum = 1;
const maxNum = 100;
const randomNum = Math.ceil(Math.random() * (maxNum - minNum));
const attemptCount = document.getElementById("attemptCount");
const answer = document.getElementById("answer");

let attempts = 0;
let guess;
let running = true;

while (running) {
    guess = window.prompt(`Guess a number between ${minNum} and ${maxNum}`);
    guess = Number(guess);

    if (isNaN(guess)) {
        window.alert("Please enter a number");
    }

    if (guess < minNum || guess > maxNum) {
        window.alert("Please enter a valid number");
    }
    else {
        if (guess < randomNum) {
            window.alert("Too low!");
        }
        else if (guess > randomNum) {
            window.alert("Too big!");
        }
        else {
            window.alert(`You won! The answer is ${randomNum}. Attempts: ${attempts}`);
            running = false;
            attemptCount.textContent = attempts;
            answer.textContent = randomNum;
        }
        attempts++;
    }
}

