let body = document.querySelector(".main-body");
let heading = document.querySelector(".game-heading");
let playground = document.querySelector(".game-area");
let boxes = document.querySelectorAll(".game-box");
let startBtn = document.querySelector(".start-btn");
let helpBtn = document.querySelector(".help-btn");

let started = false, memArr = [], userArr = [], level = 0, score = 0;

playground.addEventListener("click", (event) => {
    if (!started || !event.target.classList.contains("game-box")) return;
    userArr.push(event.target.id);
    flash(event.target, "user-highlight");
    checkUserInput();
});

startBtn.addEventListener("click", startGame);
helpBtn.addEventListener("click", showHelp);

function startGame() {
    if (started) return;
    started = true;
    level = 1;
    score = 0;
    memArr = [];
    userArr = [];
    heading.innerText = "Game Started!";
    nextLevel();
}

function nextLevel() {
    heading.innerText = `Level ${level++}`;
    userArr = [];
    memArr.push(boxes[Math.floor(Math.random() * 4)].id);
    playSequence();
}

function playSequence() {
    memArr.forEach((id, i) => setTimeout(() => flash(document.getElementById(id), "game-flash"), i * 600));
}

function checkUserInput() {
    if (userArr[userArr.length - 1] !== memArr[userArr.length - 1]) return gameOver();
    if (userArr.length === memArr.length) {
        score += 10;
        setTimeout(nextLevel, 1000);
    }
}

function flash(element, className) {
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), 400);
}

function gameOver() {
    heading.innerText = `Game Over! Score: ${score}`;
    started = false;
    body.classList.add("game-over");
    setTimeout(() => body.classList.remove("game-over"), 500);
}

function showHelp() {
    let tempText = heading.innerText;
    heading.innerText = `Memory: ${memArr.join(", ")}`;
    setTimeout(() => heading.innerText = tempText, 2000);
}
