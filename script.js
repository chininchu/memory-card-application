"use strict";

const gameBoard = document.getElementById("gameBoard");
const cardValues = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];
const timerElement = document.getElementById("timer");
const movesElement = document.getElementById("moves");
const pairsElement = document.getElementById("pairs");
const statusElement = document.getElementById("gameStatus");
const startGameBtn = document.getElementById("startGameBtn");
const themeToggle = document.getElementById("themeToggle");

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timeLeft = 10 * 60;
let timerInterval = null;
let gameStarted = false;
let gameOver = false;
let roundId = 0;

function shuffle(array) {
  // Fisher-Yates produces an unbiased order; Web Crypto supplies the random values.
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    const randomIndex = randomValues[0] % (index + 1);
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
  return array;
}

function createCards() {
  gameBoard.replaceChildren();
  shuffle([...cardValues]).forEach((card) => {
    const cardElement = document.createElement("button");
    cardElement.type = "button";
    cardElement.classList.add("card");
    cardElement.setAttribute("aria-label", "Hidden card");
    cardElement.dataset.value = card;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard(event) {
  const target = event.currentTarget;
  if (
    !gameStarted ||
    gameOver ||
    flippedCards.length >= 2 ||
    target.classList.contains("flipped") ||
    target.classList.contains("matched")
  ) {
    return;
  }

  target.textContent = target.dataset.value;
  target.classList.add("flipped");
  target.setAttribute("aria-label", `Card ${target.dataset.value}`);
  flippedCards.push(target);

  if (flippedCards.length === 2) {
    moves += 1;
    movesElement.textContent = moves;
    const currentRound = roundId;
    // Capture the round so a delayed callback cannot alter a restarted game.
    setTimeout(() => checkMatch(currentRound), 700);
  }
}

function checkMatch(currentRound) {
  if (currentRound !== roundId || flippedCards.length !== 2) {
    return;
  }

  const [firstCard, secondCard] = flippedCards;
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard.setAttribute(
      "aria-label",
      `Matched card ${firstCard.dataset.value}`,
    );
    secondCard.setAttribute(
      "aria-label",
      `Matched card ${secondCard.dataset.value}`,
    );
    matchedPairs += 1;
    pairsElement.textContent = `${matchedPairs} / 8`;

    if (matchedPairs === 8) {
      endGame("You won! Great memory.");
    }
  } else {
    firstCard.textContent = "";
    secondCard.textContent = "";
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.setAttribute("aria-label", "Hidden card");
    secondCard.setAttribute("aria-label", "Hidden card");
  }
  flippedCards = [];
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startGame() {
  // Reset all round state so restarting never creates a second active game.
  roundId += 1;
  clearInterval(timerInterval);
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  timeLeft = 10 * 60;
  gameStarted = true;
  gameOver = false;
  movesElement.textContent = "0";
  pairsElement.textContent = "0 / 8";
  statusElement.textContent = "Find all eight pairs.";
  startGameBtn.textContent = "Restart game";
  createCards();
  updateTimer();

  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateTimer();
    if (timeLeft <= 0) {
      endGame("Time is up. Try again!");
    }
  }, 1000);
}

function endGame(message) {
  gameOver = true;
  gameStarted = false;
  clearInterval(timerInterval);
  timerInterval = null;
  statusElement.textContent = message;
  startGameBtn.focus();
}

createCards();
startGameBtn.addEventListener("click", startGame);

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark-mode") {
  document.body.classList.add("dark-mode");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
  if (themeToggle.checked) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.removeItem("theme");
  }
});
