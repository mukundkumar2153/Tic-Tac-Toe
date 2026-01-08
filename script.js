// script.js
const board = document.getElementById("board");
const status = document.getElementById("status");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const gameTitle = document.getElementById("game-title");
const bgMusic = document.getElementById("bgMusic");
const resetSound = document.getElementById("resetSound");
const errorSound = document.getElementById("errorSound");
const startSound = document.getElementById("startSound");

errorSound.play(); // when invalid move is made

function resetGame() {
  playClick();          // click sound
  resetSound.play();    // ✅ new reset sound
  cells = Array(9).fill("");
  currentPlayer = "X";
  createBoard();
  updateStatus();
  updateScoreboard();
}


bgMusic.volume = 0.3; // Set between 0.0 (silent) and 1.0 (full volume)

// Start background music after first click (browsers allow it after user interaction)
window.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {}); // Avoid errors if blocked
  }
}, { once: true }); // Only once



let cells = Array(9).fill("");
let currentPlayer = "X";
let isAI = false;
let aiLevel = "easy";
let scores = { player: 0, ai: 0 };
let friendMode = false;
let player1Name = "Player A";
let player2Name = "Player B";

function showGameScreen() {
  document.getElementById("mode-screen").style.display = "none";
  document.getElementById("ai-screen").style.display = "none";
  document.getElementById("gender-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
}

function showAIMenu() {
  playClick();
  document.getElementById("mode-screen").style.display = "none";
  document.getElementById("ai-screen").style.display = "block";
}

function showFriendGender() {
  playClick();
  document.getElementById("mode-screen").style.display = "none";
  document.getElementById("gender-screen").style.display = "block";
}

function backToModeMenu() {
  playClick();
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("ai-screen").style.display = "none";
  document.getElementById("gender-screen").style.display = "none";
  document.getElementById("mode-screen").style.display = "block";
}

function chooseFriendGender(type) {
  playClick();
  isAI = false;
  friendMode = true;
  const maleNames = ["Rohan", "Arjun", "Karan", "Aman", "Raj", "Yash"];
  const femaleNames = ["Riya", "Anya", "Zoya", "Maya", "Kavya", "Neha"];

  if (type === "male") {
    player1Name = getRandomFrom(maleNames);
    player2Name = getRandomFrom(maleNames);
  } else if (type === "female") {
    player1Name = getRandomFrom(femaleNames);
    player2Name = getRandomFrom(femaleNames);
  } else {
    player1Name = getRandomFrom(maleNames);
    player2Name = getRandomFrom(femaleNames);
  }
  gameTitle.textContent = `${player1Name} vs ${player2Name}`;
  showGameScreen();
  resetGame();
}

function chooseAIMode(level) {
  playClick();
  isAI = true;
  friendMode = false;
  aiLevel = level;
  gameTitle.textContent = `You vs ${aiLevel.toUpperCase()} AI 🤖`;
  loadScores();
  showGameScreen();
  resetGame();
}

function createBoard() {
  board.innerHTML = "";
  cells = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = i;
    div.textContent = "";
    div.addEventListener("click", handleClick);
    board.appendChild(div);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] || checkWinner(cells, true) || isDraw(cells)) return;
  cells[index] = currentPlayer;
  playClick();
  updateBoard();
  const winner = checkWinner();
  if (winner) return handleWin(winner);
  if (isDraw()) return handleDraw();
  if (isAI && currentPlayer === "X") {
    setTimeout(() => {
      const move = getAIMove();
      cells[move] = "O";
      playClick();
      updateBoard();
      const winner = checkWinner();
      if (winner) return handleWin(winner);
      if (isDraw()) return handleDraw();
    }, 400);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function updateBoard() {
  document.querySelectorAll(".cell").forEach((cell, i) => {
    cell.textContent = cells[i];
  });
}

function updateStatus() {
  if (friendMode) {
    status.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn (${currentPlayer})`;
  } else {
    status.textContent = `Your turn (${currentPlayer})`;
  }
}

function checkWinner(boardToCheck = null, preventHighlight = false) {
  const board = boardToCheck || cells;
  const combos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let [a, b, c] of combos) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      if (!preventHighlight && boardToCheck === null) {
        highlightWin([a, b, c]);
        disableBoard();
      }
      return board[a];
    }
  }
  return null;
}

function highlightWin(indices) {
  const cellEls = document.querySelectorAll(".cell");
  indices.forEach(i => cellEls[i].classList.add("win"));
}

function isDraw(boardToCheck = null) {
  const board = boardToCheck || cells;
  return board.every(cell => cell !== "");
}

function handleWin(winner) {
  winSound.play();
  if (isAI) {
    if (winner === "X") scores.player++;
    else scores.ai++;
    saveScores();
  }
  document.getElementById("win-message").textContent = winner === "X"
    ? (friendMode ? `${player1Name} Wins! 🎉` : "🎉 You Win!")
    : (friendMode ? `${player2Name} Wins! 🎉` : "🤖 AI Wins!");
  document.getElementById("win-popup").style.display = "flex";
  updateScoreboard();
}

function handleDraw() {
  document.getElementById("win-message").textContent = "😐 It's a Draw!";
  document.getElementById("win-popup").style.display = "flex";
}

function resetGame() {
  playClick();
  cells = Array(9).fill("");
  currentPlayer = "X";
  createBoard();
  updateStatus();
  updateScoreboard();
}

function closePopup() {
  playClick();
  document.getElementById("win-popup").style.display = "none";
  resetGame();
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.removeEventListener("click", handleClick);
  });
}

function getAIMove() {
  if (aiLevel === "easy") {
    const empty = cells.map((v, i) => v === "" ? i : null).filter(i => i !== null);
    return empty[Math.floor(Math.random() * empty.length)];
  } else if (aiLevel === "medium") {
    return Math.random() < 0.5 ? getMinimaxMove() : getAIMove("easy");
  } else {
    return getMinimaxMove();
  }
}

function getMinimaxMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (cells[i] === "") {
      cells[i] = "O";
      let score = minimax(cells, 0, false);
      cells[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMax) {
  const winner = checkWinner(board, true);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (isDraw(board)) return 0;

  let bestScore = isMax ? -Infinity : Infinity;
  const player = isMax ? "O" : "X";

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = player;
      let score = minimax(board, depth + 1, !isMax);
      board[i] = "";
      bestScore = isMax ? Math.max(score, bestScore) : Math.min(score, bestScore);
    }
  }
  return bestScore;
}

function loadScores() {
  const saved = localStorage.getItem("tictactoe_scores");
  if (saved) scores = JSON.parse(saved);
}

function saveScores() {
  localStorage.setItem("tictactoe_scores", JSON.stringify(scores));
}

function updateScoreboard() {
  if (friendMode) {
    status.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn (${currentPlayer})`;
  } else {
    status.textContent = `You: ${scores.player} | AI: ${scores.ai}`;
  }
}

function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function playClick() {
  clickSound.play();
}

window.onload = () => {};
