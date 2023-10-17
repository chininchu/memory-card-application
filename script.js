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




