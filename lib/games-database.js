// lib/games-database.js
// ساده‌ترین دیتابیس بازی برای TicTacToe در حافظه (global object)

const games = {};

function startGame(chatId, playerX) {
  if (!games[chatId]) {
    games[chatId] = {
      board: ['1','2','3','4','5','6','7','8','9'],
      playerX,
      playerO: null,
      turn: 'X',
      playing: true
    };
  }
  return games[chatId];
}

function joinPlayer(chatId, playerO) {
  const game = games[chatId];
  if (!game) return false;
  if (!game.playerO && playerO !== game.playerX) {
    game.playerO = playerO;
    return true;
  }
  return false;
}

function getGame(chatId) {
  return games[chatId];
}

function move(chatId, player, pos) {
  const game = games[chatId];
  if (!game) return { error: "No game found." };
  if (!game.playing) return { error: "Game over." };
  if ((game.turn === 'X' && player !== game.playerX) || (game.turn === 'O' && player !== game.playerO)) {
    return { error: "Not your turn." };
  }
  if (game.board[pos-1] === '❌' || game.board[pos-1] === '⭕') {
    return { error: "Position taken." };
  }
  game.board[pos-1] = game.turn === 'X' ? '❌' : '⭕';
  
  if (checkWin(game.board, game.turn)) {
    const winner = game.turn === 'X' ? game.playerX : game.playerO;
    delete games[chatId];
    return { win: true, winner, board: game.board };
  }
  
  if (game.board.every(c => c === '❌' || c === '⭕')) {
    delete games[chatId];
    return { draw: true, board: game.board };
  }
  
  game.turn = game.turn === 'X' ? 'O' : 'X';
  return { board: game.board, turn: game.turn };
}

function cancel(chatId) {
  if (games[chatId]) {
    delete games[chatId];
    return true;
  }
  return false;
}

function checkWin(board, turn) {
  const sym = turn === 'X' ? '❌' : '⭕';
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(line => line.every(i => board[i] === sym));
}

function printBoard(board) {
  return (
    `┄┄┄┄┄┄┄┄┄┄┄\n` +
    `┃ ${board[0]} ┃ ${board[1]} ┃ ${board[2]} ┃\n` +
    `┄┄┄┄┄┄┄┄┄┄┄\n` +
    `┃ ${board[3]} ┃ ${board[4]} ┃ ${board[5]} ┃\n` +
    `┄┄┄┄┄┄┄┄┄┄┄\n` +
    `┃ ${board[6]} ┃ ${board[7]} ┃ ${board[8]} ┃\n` +
    `┄┄┄┄┄┄┄┄┄┄┄`
  );
}

module.exports = {
  startGame,
  joinPlayer,
  getGame,
  move,
  cancel,
  printBoard
};