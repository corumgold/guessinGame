let newGameButton = document.getElementById("new-game");
let submitButton = document.getElementById("submit-guess");
let hintButton = document.getElementById("hint");
let guesses = document.getElementById("past-guesses");
let notifier = document.getElementById("notifier");
let guessInput = document.getElementById("guess-input");

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
      alert("That is an invalid guess.");
    } else {
      this.playersGuess = num;
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(`${this.playersGuess}`));
      guesses.appendChild(li);
      notifier.innerHTML = this.checkGuess();
      guessInput.value = "";
    }
  }

  checkGuess() {
    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    } else if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    } else if (this.pastGuesses.length < 4) {
      this.pastGuesses.push(this.playersGuess);
      let diff = this.difference();
      let updateText = "";
      switch (true) {
        case diff < 10:
          updateText = "You're burning up!";
          break;
        case diff < 25:
          updateText = "You're lukewarm.";
          break;
        case diff < 50:
          updateText = "You're a bit chilly.";
          break;
        default:
          updateText = "You're ice cold!";
          break;
      }
      if (this.playersGuess > this.winningNumber) {
        updateText += " Choose something smaller!";
      } else updateText += " Choose something larger!";
      return updateText;
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
  guesses.innerHTML = "";
  notifier.innerHTML = "";
  return new Game();
}

let game = newGame();

newGameButton.addEventListener("click", () => {
  game = newGame();
});
submitButton.addEventListener("click", () => {
  let guess = Number(guessInput.value);
  game.playersGuessSubmission(guess);
});
