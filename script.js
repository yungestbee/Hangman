const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainButoon = document.querySelector(".play-again");

let currentWord;
let wrongGuessCount;
let correctLetters;
const maxGuesses = 6;

const resetGame = () => {
  wrongGuessCount = 0;
  correctLetters = [];
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  // Show modal 6 seconds ater completing game

  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word:`
      : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats!" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  //checking if clickedLetter exist in the currentWord
  if (currentWord.includes(clickedLetter)) {
    //Showing all correct letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // updating image and  guessCount if clicked letter doesnt exist
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // Calling game over function if any of these condition is met
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

//Creating keyboard buttons and adding event listeners
for (let index = 97; index <= 122; index++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(index);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(index))
  );
}
getRandomWord();
playAgainButoon.addEventListener("click", getRandomWord);
