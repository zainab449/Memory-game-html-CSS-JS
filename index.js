const emojis = ["😀", "😀", "😂", "😂", "🥰", "🥰", "🤔", "🤔", "😎", "😎", "😜", "😜"];
const gameContainer = document.querySelector('.game');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
// shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// createBoard

function createBoard() {
    const shuffledEmojis = [...emojis];
    shuffle(shuffledEmojis);

    gameContainer.innerHTML = '';
    shuffledEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.className = 'item';
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}
// flipCard
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;
    this.classList.add('flipped');
    this.innerHTML = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}
//  checkForMatch
function checkForMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        disableCards();
    } else {
        unflipCards();
    }
    checkForCompletion(); // Check if all cards are matched after each move
}
// disableCards
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}
// unflipCards
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        resetBoard();
    }, 1000);
}
// resetBoard
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
// checkForCompletion
function checkForCompletion() {
    const allCards = document.querySelectorAll('.item');
    const allMatched = Array.from(allCards).every(card => card.classList.contains('matched'));
    if (allMatched) {
        setTimeout(() => alert('Congratulations! You have completed the game!'), 200);
    }
}

document.querySelector('.reset').addEventListener('click', createBoard);

createBoard();