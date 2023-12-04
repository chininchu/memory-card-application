"use strict";


const gameBoard = document.getElementById('gameBoard');
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);


}

shuffle(cards);

cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
});

function flipCard(event) {
    const target = event.currentTarget;
    if (flippedCards.length < 2 && !target.classList.contains('flipped')) {
        target.textContent = target.dataset.value;
        target.classList.add('flipped');
        flippedCards.push(target);
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        flippedCards[0].removeEventListener('click', flipCard);
        flippedCards[1].removeEventListener('click', flipCard);
        matchedPairs++;

        if (matchedPairs === 8) {
            alert('You won!');
        }
    } else {
        flippedCards[0].textContent = '';
        flippedCards[1].textContent = '';
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
    }

    flippedCards = [];
}

// Timer Logic
let timerInterval;

document.getElementById('startGameBtn').addEventListener('click', function () {
    // Start the timer
    let timeLeft = 10 * 60; // 10 minutes in seconds
    timerInterval = setInterval(function () {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Game over.');
            // Reset the game (if necessary)
            location.reload();
        }
    }, 1000);

    // Disable the start game button to prevent multiple timers
    this.disabled = true;
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const bodyElement = document.body;

// Check for saved theme preference in localStorage and apply
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    bodyElement.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeToggle.checked = true;
    }
}

// Add event listener to the theme toggle switch
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        bodyElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        bodyElement.classList.remove('dark-mode');
        localStorage.removeItem('theme');
    }
});


