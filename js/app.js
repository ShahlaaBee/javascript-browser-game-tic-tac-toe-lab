let board;
let turn;
let winner;
let tie;


const squareEls = document.querySelectorAll('.sqr'); 
const messageEl = document.getElementById('message');


const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];


init();


function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'Shahla';
  winner = false;
  tie = false;
  render();
}


function render() {
  updateBoard();
  updateMessage();
}


function updateBoard() {
  board.forEach((mark, idx) => {
    squareEls[idx].textContent = mark;
  });
}


function updateMessage() {
  if (winner) {
    messageEl.textContent = `${turn} wins! 🎉`;
  } else if (tie) {
    messageEl.textContent = `It's a tie! 🐱`;
  } else {
    messageEl.textContent = `It's ${turn}'s turn`;
  }
}


squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});


function handleClick(event) {
  const index = parseInt(event.target.id);


  if (board[index] !== '' || winner) return;

  board[index] = turn;


  checkForWinner();
  checkForTie();

  if (!winner) switchTurn();

  render();
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winner = true;
    }
  });
}


function checkForTie() {
  if (!winner && board.every(cell => cell !== '')) {
    tie = true;
  }
}


function switchTurn() {
  turn = turn === 'X' ? 'O' : 'X';
}


const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', init);