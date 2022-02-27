//Board Screen
const fields = document.querySelectorAll(".field");
const playerScoreDisplay = document.querySelector(".score-player");
const cpuScoreDisplay = document.querySelector(".score-cpu");
const tiesScoreDisplay = document.querySelector(".score-ties");
const currentTurn = document.querySelector(".turn-symbol");
//Winner screen
const winnerBoard = document.querySelector(".winner-screen");
const winnerText = document.querySelector(".winner-text");
const winnerMark = document.querySelector(".winner-mark");
//Menu screen
const menuScreen = document.querySelector(".menu-screen");
const player1Mark = document.querySelectorAll(".mark");
//Buttons
const newGameBtnCpu = document.querySelector(".new-game-cpu");
const newGameBtnPvp = document.querySelector(".new-game-pvp");
const reset = document.querySelector(".reset");
const nextRound = document.querySelector(".next-round");
const quitGame = document.querySelectorAll(".quit");
//Players
const player1Name = document.querySelector(".player1Name");
const player2Name = document.querySelector(".player2Name");

class Game {
  constructor() {
    this.board = Array.from(fields);

    this.currentPlayer;
    this.winner;
  }
  playGame() {}
  player1ChoosenMark(e) {
    if (!e.target.classList.contains("choosen")) {
      player1Mark.forEach((el) => el.classList.toggle("choosen"));
    }
  }
  newGame() {
    this.player1 = new Player(player1Name.value);
    this.player2 = new Player(
      player2Name.value,
      this.player1.mark === "x" ? "circle" : "x"
    );
    console.log(this.player1);
  }
  resetBoard() {
    board.fill("");
    winner = "";
    currentMark = "x";
    fields.forEach((field) => {
      field.classList.remove("x", "circle");
    });
  }
  switchPlayer(player1, player2) {
    this.currentPlayer === this.player2
      ? (this.currentPlayer = this.player1)
      : (this.currentPlayer = this.player2);
  }

  toggleMenu() {
    menuScreen.classList.toggle("hidden");
  }
  winnerBoardToggle() {
    winnerBoard.classList.toggle("hidden");
  }

  checkBoard() {
    //Check columns
    for (let i = 0; i < board.length / 3; i++) {
      if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) {
        return (winner = board[i]);
      }
    }
    //Check rows
    for (let j = 0; j < board.length; j += 3) {
      if (board[j] && board[j] === board[j + 1] && board[j] === board[j + 2]) {
        return (winner = board[j]);
      }
    }
    //Check diagonal
    if (
      (board[0] && board[0] === board[4] && board[4] === board[8]) ||
      (board[2] && board[2] === board[4] && board[4] === board[6])
    ) {
      return (winner = board[4]);
    }
    if (!board.includes("")) return (winner = "tie");
  }
}

class Player {
  constructor(mark) {
    this.score = 0;
    this.mark = mark;
    this.name = "";
  }

  plusScore() {
    this.score++;
  }
}

const ticTacToe = new Game();

player1Mark.forEach((el) =>
  el.addEventListener("click", function (e) {
    ticTacToe.player1ChoosenMark(e);
  })
);

// playersMark
// player1.mark === "x" ? "circle" : "x"
function initGame() {
  resetBoard();
  player1.changeMark();
  toggleMenu();
}

newGameBtnCpu.addEventListener("click", ticTacToe.newGame);
newGameBtnPvp.addEventListener("click", ticTacToe.newGame);

fields.forEach((field) => {
  field.addEventListener("click", function (e) {
    if (
      !e.target.classList.contains("circle") &&
      !e.target.classList.contains("x") &&
      !winner
    ) {
      e.target.classList.add(currentMark);
      board[e.target.id] = currentMark;
      currentMark === "circle" ? (currentMark = "x") : (currentMark = "circle");
      checkBoard();
    }
    if (winner) {
      displayWinner();
      winnerBoardToggle();
    }
  });
});

function checkBoard() {
  //Check columns
  for (let i = 0; i < board.length / 3; i++) {
    if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      return (winner = board[i]);
    }
  }
  //Check rows
  for (let j = 0; j < board.length; j += 3) {
    if (board[j] && board[j] === board[j + 1] && board[j] === board[j + 2]) {
      return (winner = board[j]);
    }
  }
  //Check diagonal
  if (
    (board[0] && board[0] === board[4] && board[4] === board[8]) ||
    (board[2] && board[2] === board[4] && board[4] === board[6])
  ) {
    return (winner = board[4]);
  }
  if (!board.includes("")) return (winner = "tie");
}
function resetBoard() {
  board.fill("");
  winner = "";
  currentMark = "x";
  fields.forEach((field) => {
    field.classList.remove("x", "circle");
  });
}

function displayWinner() {
  if (winner === "tie") {
    winnerMark.textContent = `IT'S A TIE`;
  } else {
    winnerMark.textContent = `${winner === "x" ? "X" : "O"} TAKES THE ROUND`;
  }
}

reset.addEventListener("click", function () {
  resetBoard();
});

function winnerBoardToggle() {
  winnerBoard.classList.toggle("hidden");
}

nextRound.addEventListener("click", function () {
  resetBoard();
  winnerBoardToggle();
});

quitGame.forEach((btn) =>
  btn.addEventListener("click", function () {
    resetBoard();
    toggleMenu();
    winnerBoard.classList.add("hidden");
  })
);
