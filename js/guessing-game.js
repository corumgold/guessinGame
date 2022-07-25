let newGameButton = document.getElementById("new-game");
let submitButton = document.getElementById("submit-guess");
let hintButton = document.getElementById("hint");
let guesses = document.getElementById("past-guesses");
let notifier = document.getElementById("notifier");
let guessInput = document.getElementById("guess-input");
let hints = document.getElementById("hints");
let guessBlocks = document.getElementById("guess-blocks");

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
  constructor() {
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
      let guessCt = this.pastGuesses.length;
      switch (true) {
        case guessCt === 0:
          document.getElementById("guess-1").innerHTML = num;
          break;
        case guessCt === 1:
          document.getElementById("guess-2").innerHTML = num;
          break;
        case guessCt === 2:
          document.getElementById("guess-3").innerHTML = num;
          break;
        case guessCt === 3:
          document.getElementById("guess-4").innerHTML = num;
          break;
        case guessCt === 4:
          document.getElementById("guess-5").innerHTML = num;
          break;
      }
      notifier.innerHTML = this.checkGuess();
      guessInput.value = "";
    }
  }

  checkGuess() {
    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    } else if (this.playersGuess === this.winningNumber) {
      return winScreen();
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
    } else return loseScreen();
  }

  provideHint() {
    return shuffle([
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ]).join(", ");
  }
}

function newGame() {
  let game = new Game();
  notifier.innerHTML = "";
  let nodes = guessBlocks.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].innerHTML = "-";
  }
  hints.innerHTML = game.provideHint();
  hintButton.style.display = "block";
  submitButton.style.display = "block";
  notifier.style.display = "block";
  guessBlocks.style.color = "#264653";
  return game;
}

function winScreen() {
  guessBlocks.style.color = "#2a9d8f";
  document.getElementById("guess-1").innerHTML = "W";
  document.getElementById("guess-2").innerHTML = "I";
  document.getElementById("guess-3").innerHTML = "N";
  document.getElementById("guess-4").innerHTML = ":";
  document.getElementById("guess-5").innerHTML = ")";
  hintButton.style.display = "none";
  submitButton.style.display = "none";
  notifier.style.display = "none";
  guess.style.display = "none";
}

function loseScreen() {
  guessBlocks.style.color = "#e76f51";
  document.getElementById("guess-1").innerHTML = "L";
  document.getElementById("guess-2").innerHTML = "O";
  document.getElementById("guess-3").innerHTML = "S";
  document.getElementById("guess-4").innerHTML = "E";
  document.getElementById("guess-5").innerHTML = "!";
  hintButton.style.display = "none";
  submitButton.style.display = "none";
  notifier.style.display = "none";
  guess.style.display = "none";
}

let game = newGame();

newGameButton.addEventListener("click", () => {
  game = newGame();
});

submitButton.addEventListener("click", () => {
  let guess = Number(guessInput.value);
  game.playersGuessSubmission(guess);
});

hintButton.addEventListener("mouseover", () => {
  hints.style.display = "block";
});

hintButton.addEventListener("mouseout", () => {
  hints.style.display = "none";
});
