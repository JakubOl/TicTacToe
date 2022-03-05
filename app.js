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

const Game = () => {
  const board = Array.from(fields);
  let currentPlayer;
  let winner;
  let player1;
  let player2;
  let ties = 0;

  const player1ChoosenMark = (e) => {
    if (!e.target.classList.contains("choosen")) {
      player1Mark.forEach((el) => el.classList.toggle("choosen"));
      player1Mark.forEach((el) => el.classList.toggle("notchoosen"));
    }
  };
  const playGame = () => {
    ties = 0;
    player1Mark.forEach((mark) =>
      mark.addEventListener("click", player1ChoosenMark)
    );
    quitGame.forEach((btn) => btn.addEventListener("click", exitGame));
    newGameBtnCpu.addEventListener("click", pvcpuGame);
    newGameBtnPvp.addEventListener("click", pvpGame);
    reset.addEventListener("click", resetBoard);
    nextRound.addEventListener("click", function () {
      resetBoard();
      winnerBoardToggle();
    });

    fields.forEach((field) => {
      field.addEventListener("click", function (e) {
        fieldsUpdate(e);
      });
    });
  };
  const fieldsUpdate = (e) => {
    if (
      !e.target.classList.contains("o") &&
      !e.target.classList.contains("x") &&
      !winner
    ) {
      if (player2.name === "cpu" && currentPlayer === player2) return;
      e.target.classList.add(currentPlayer.mark);
      board[e.target.id] = currentPlayer;
      checkBoard();
      switchPlayer();
      updateTurn();
      if (winner) {
        return updateScores(), displayWinner();
      }
      if (player2.name === "cpu" && currentPlayer === player2) {
        setTimeout(cpuMove, 1000);
      }
    }
  };
  const pvpGame = () => {
    player1 = new Player(
      document.querySelector(".choosen").id,
      player1Name.value
    );
    player2 = new Player(
      document.querySelector(".notchoosen").id,
      player2Name.value
    );
    player1.mark === "x"
      ? (currentPlayer = player1)
      : (currentPlayer = player2);
    resetBoard();
    toggleMenu();
  };
  const cpuMove = () => {
    let move = player2.makeMove(board);
    board[move] = currentPlayer.mark;
    console.log(move);
    document.getElementById(`${move}`).classList.add(currentPlayer.mark);
    checkBoard();
    switchPlayer();
    updateTurn();
    if (winner) {
      return updateScores(), displayWinner();
    }
  };
  const pvcpuGame = () => {
    player1 = new Player(
      document.querySelector(".choosen").id,
      player1Name.value
    );
    player2 = new Cpu(document.querySelector(".notchoosen").id);
    player1.mark === "x"
      ? (currentPlayer = player1)
      : (currentPlayer = player2);
    resetBoard();
    toggleMenu();
    checkBoard();
    if (player2.name === "cpu" && currentPlayer === player2) {
      setTimeout(cpuMove, 1000);
    }
  };
  const resetBoard = () => {
    player1.mark === "x"
      ? (currentPlayer = player1)
      : (currentPlayer = player2);
    board.fill("");
    winner = "";
    fields.forEach((field) => {
      field.classList.remove("x", "o");
    });
    updateScores();
  };
  const switchPlayer = () => {
    currentPlayer === player2
      ? (currentPlayer = player1)
      : (currentPlayer = player2);
  };

  updateTurn = () => {
    currentTurn.innerHTML = `<span>${currentPlayer.mark}</span> TURN`;
  };

  const toggleMenu = () => {
    menuScreen.classList.toggle("hidden");
  };
  const winnerBoardToggle = () => {
    winnerBoard.classList.toggle("hidden");
  };

  const checkBoard = () => {
    //Check columns
    for (let i = 0; i < board.length / 3; i++) {
      if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) {
        currentPlayer.addScore();
        return (winner = board[i]);
      }
    }
    //Check rows
    for (let j = 0; j < board.length; j += 3) {
      if (board[j] && board[j] === board[j + 1] && board[j] === board[j + 2]) {
        currentPlayer.addScore();
        return (winner = board[j]);
      }
    }
    //Check diagonal
    if (
      (board[0] && board[0] === board[4] && board[4] === board[8]) ||
      (board[2] && board[2] === board[4] && board[4] === board[6])
    ) {
      currentPlayer.addScore();
      return (winner = board[4]);
    }
    if (!board.includes("")) {
      ties++;
      return (winner = "tie");
    }
  };
  const exitGame = () => {
    ties = 0;
    resetBoard();
    toggleMenu();
    winnerBoard.classList.add("hidden");
  };
  const displayWinner = () => {
    if (winner === "tie") {
      winnerMark.textContent = `IT'S A TIE`;
    } else {
      console.log(winner, player1.mark);
      winnerMark.textContent = `${
        winner.mark === player1.mark ? player1.name : player2.name
      } TAKES THE ROUND`;
    }
    winnerBoardToggle();
  };
  const updateScores = () => {
    playerScoreDisplay.textContent = player1.score;
    cpuScoreDisplay.textContent = player2.score;
    tiesScoreDisplay.textContent = ties;
  };
  playGame();
};

class Player {
  constructor(mark, name) {
    this.score = 0;
    this.mark = mark;
    this.name = name;
  }
  addScore() {
    this.score++;
  }
  resetScore() {
    this.score = 0;
  }
}

class Cpu extends Player {
  constructor(mark) {
    super(mark);
    this.name = "cpu";
    this.score = 0;
    this.move;
  }
  randomMove() {
    return (this.move = Math.trunc(Math.random() * 9));
  }
  makeMove(board) {
    while (board.includes("")) {
      let number = this.randomMove();
      if (board[number] === "") {
        return number;
      }
    }
  }
}

const ticTacToe = Game();
