const display = document.getElementById("display");
const startStopButton = document.getElementById("start-btn")
const resetButton = document.getElementById("reset-btn")

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {

    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {

    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    startStopButton.style.backgroundColor = "hsl(120, 100%, 35%)";
    startStopButton.textContent = "Start";
}

function update() {

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, 0);
    let mins = Math.floor(elapsedTime / (1000 * 60) % 60).toString().padStart(2, 0);
    let secs = Math.floor(elapsedTime / 1000 % 60).toString().padStart(2, 0);
    let msecs = Math.floor(elapsedTime % 1000 / 10).toString().padStart(2, 0);

    display.textContent = `${hours}:${mins}:${secs}:${msecs}`;
}

addEventListener("keypress", function (event) {
    if (event.key === " ") {
        event.preventDefault();
        startStopButton.click();
    }
})

addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        resetButton.click();
    }
})

startStopButton.addEventListener("click", function (event) {

    if (!isRunning) {
        start();
        event.target.style.backgroundColor = "hsl(0, 100%, 30%)";
        event.target.textContent = "Stop";
    }
    else {
        stop();
        event.target.style.backgroundColor = "hsl(120, 100%, 25%)";
        event.target.textContent = "Start";
    }
});

startStopButton.addEventListener("mouseover", function (event) {
    if (isRunning) {
        event.target.style.backgroundColor = "hsl(0, 100%, 30%)";
        event.target.textContent = "Stop";
    }
    else {
        event.target.style.backgroundColor = "hsl(120, 100%, 25%)";
        event.target.textContent = "Start";
    }
});

startStopButton.addEventListener("mouseout", function (event) {
    if (isRunning) {
        event.target.style.backgroundColor = "hsl(0, 100%, 40%)";
        event.target.textContent = "Stop";
    }
    else {
        event.target.style.backgroundColor = "hsl(120, 100%, 35%)";
        event.target.textContent = "Start";
    }
});