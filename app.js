//Board Screen
const fields = document.querySelectorAll(".field");
const playerScoreDisplay = document.querySelector(".score-player");
const cpuScoreDisplay = document.querySelector(".score-cpu");
const tiesScoreDisplay = document.querySelector(".score-ties");
const currentTurn = document.querySelector(".turn");
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

let playersMark = "x";
let currentMark = "x";
let board = Array.from(fields);
let winner;
let ties = 0;
let player1Score = 0;
let player2Score = 0;

player1Mark.forEach((el) =>
  el.addEventListener("click", function (e) {
    if (!e.target.classList.contains("choosen")) {
      player1Mark.forEach((el) => el.classList.toggle("choosen"));
      playersMark === "x" ? (playersMark = "circle") : (playersMark = "x");
    }
  })
);

function toggleMenu() {
  menuScreen.classList.toggle("hidden");
}

function initGame() {
  resetBoard();
  toggleMenu();
  ties = 0;
  player1Score = 0;
  player2Score = 0;
}

function updateTurn() {
  currentTurn.innerHTML = `<span>${
    currentMark === "x" ? "X" : "O"
  }</span> TURN`;
}

newGameBtnCpu.addEventListener("click", initGame);
newGameBtnPvp.addEventListener("click", initGame);

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
      updateTurn();
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

  updateTurn();
}
let winnerName;
function displayWinner() {
  if (winner === "tie") {
    ties++;
    tiesScoreDisplay.textContent = ties;
    winnerMark.textContent = `IT'S A TIE`;
  } else {
    if (playersMark === winner) {
      player1Score++;
      winnerName = player1Name.value;
      playerScoreDisplay.textContent = player1Score;
    } else {
      player2Score++;
      winnerName = player2Name.value;
      cpuScoreDisplay.textContent = player2Score;
    }
    winnerMark.textContent = `${winnerName.toUpperCase()} TAKES THE ROUND`;
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
