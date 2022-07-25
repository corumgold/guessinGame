/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.floor(Math.random() * (100 - 1 + 1) + 1);
}

function shuffle(array) {
  let m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

class Game {
  constructor(guess) {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (num < 1 || num > 100 || typeof num !== "number") {
      throw "That is an invalid guess.";
    } else this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    } else if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    } else if (this.pastGuesses.length < 4) {
      this.pastGuesses.push(this.playersGuess);
      let diff = this.difference();
      switch (true) {
        case diff < 10:
          return "You're burning up!";
        case diff < 25:
          return "You're lukewarm.";
        case diff < 50:
          return "You're a bit chilly.";
        default:
          return "You're ice cold!";
      }
    } else return "You Lose.";
  }

  provideHint() {
    return shuffle([
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ]);
  }
}

function newGame() {
  return new Game();
}

let game = newGame();

let newGameButton = document.getElementById("new-game");
let submitButton = document.getElementById("submit-guess");
let hintButton = document.getElementById("hint");

newGameButton.addEventListener("click", () => {
  game = newGame();
});
submitButton.addEventListener("click", () => {
  let guess = Number(document.getElementById("guess-input").value);
  game.playersGuessSubmission(guess);
});
