function createGameBoard() {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return board
}
function createPlayer(sign, color) {
    let score = 0;
    const addScore = () => {
        score++;
    };
    const getScore = () => score;

    return {
        sign,
        color,
        addScore,
        getScore
    }
}
let board = createGameBoard();
let player1 = createPlayer("X", "red");
let player2 = createPlayer("O", "blue");

function renderBoard(board) {
   for (i in board) {
       let square = document.createElement("div");
       square.classList.add("square");
       let sign = document.createElement("span");
       sign.classList.add("sign");
       square.appendChild(sign);
       canvas.appendChild(square);
   }

}
function checkWin(board) {
    for (let i = 0; i < winningCombinations.length; i++) {
        if (
            board[winningCombinations[i][0]] === board[winningCombinations[i][1]] &&
            board[winningCombinations[i][1]] === board[winningCombinations[i][2]] &&
            board[winningCombinations[i][0]] !== 0
        ) {
            return {true : true, winningCombinations: winningCombinations[i]};
        }
    }
    return false;
}
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
function checkDraw(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            return false;
        }
    }
    return true;
}
let move = 0;
const canvas = document.querySelector(".Board");

renderBoard(board);
const cells = document.querySelectorAll(".square");

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", () => {
        move = i;
})}

function renderScore(player1, player2){
    document.querySelector(".player1 .score").textContent = player1.getScore();
    document.querySelector(".player2 .score").textContent = player2.getScore();
}
function updateBoard(board,index,currentPlayer){
    board[index] = currentPlayer.sign;
    cells[index].querySelector("span").textContent = currentPlayer.sign;
    cells[index].style.color = currentPlayer.color;
}

/* Event listenr for each cell */
function playGame(board, player1, player2) {
    let currentPlayer = player1;
    renderScore(player1, player2);
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => {
            if (board[i] === 0) {
                updateBoard(board, i, currentPlayer);
                if (checkWin(board)) {
                    renderScore(player1, player2);
                    alert(`Player ${currentPlayer.sign} wins!`);
                    for (i in checkWin(board).winningCombinations) {
                        cells[checkWin(board).winningCombinations[i]].style.backgroundColor = "green";
                    }
                    return;
                }
    
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
        });
    }       
}
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    clear();
});
function clear(){
    for (let i = 0; i < cells.length; i++) {
        board[i] = 0;
        cells[i].querySelector("span").textContent = "";
    }
}

playGame(board, player1, player2);

