function gameBoard() {
    let board = [];
    const cells =9;
    for (let i = 0; i < cells; i++) {
        board.push(Cell());
    }
   const winningCombinations = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
   ]

    const getBoard = () => board;
    const playMove = (index, player) => {
        if (emptyCells().length === 0) {
            return false;
        }
        if (board[index].getValue() !== "_") {
            return false;
        }
        board[index].playMove(player);
        return true;
    }
    const checkWin = () => {
        for (let i = 0; i < winningCombinations.length; i++) {
            let [a, b, c] = winningCombinations[i];
            if (board[a].getValue() === board[b].getValue() && board[b].getValue() === board[c].getValue() && board[a].getValue() !== "_") {
                return true;
            }
        }
        return false;
    }
    const checkDraw = () => emptyCells().length === 0 ? true : false ;
    const displayBoard = () => {
    const rows = [0, 3, 6];
    let displayString = '';
    rows.forEach(start => {
        displayString += board.slice(start, start + 3).map(cell => cell.getValue()).join('|') + '\n';
    });
    console.log(displayString);

    }
    const clearBoard = () => {
        board = [];
        for (let i = 0; i < cells; i++) {
            board.push(Cell());
        }
    }
    const emptyCells = () => board.filter(cell => cell.getValue() === "_");
    return {getBoard, playMove, checkDraw,checkWin,clearBoard,displayBoard};
}

function Cell() {
    let cellValue ="_";
    const getValue = () => cellValue;
    const playMove = (player) => {
        cellValue = player.value;
    }
    return {getValue, playMove};
}
function GameController(){
    let player1 = "X";
    let player2 = "O";
    const board = gameBoard();
    const players =[
        {name : player1
        ,value :"X"
        },{
            name : player2
            ,value : "O"
        }
    ]
    const gameOver = false;
    let currentPlayer = players[0];
    const switchTurn = () => {
        currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0];
    }
    const reset = () => {
        board.clearBoard();
        currentPlayer = players[0];
    }
    const getCurrentPlayer = () => currentPlayer;
    const playRound = ( index) => {
        if (board.playMove(index, currentPlayer)) {
            if (board.checkWin()) {
                return currentPlayer.name;
            } else if (board.checkDraw()) {
                return "Draw";
            }
            switchTurn();
            return false;
        }
    }
    return { playRound, getCurrentPlayer,getBoard:board.getBoard,reset};
}

function ScreenController(){
    const game = GameController();
    const playerTurn = document.querySelector(".currentPlayer");
    const boardDiv = document.querySelector(".Board");
    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const turn =game.getCurrentPlayer();
        playerTurn.textContent = turn.name;
        board.forEach(cell => {
            const square = document.createElement('button');
            square.classList.add("square");
            square.dataset.index = board.indexOf(cell);
            square.textContent = cell.getValue();
            boardDiv.appendChild(square);
        })
    }
    const reset = document.querySelector("#reset");
    function clearBoard(){
        game.reset();
        updateScreen();
    }
    const StartGame = document.querySelector(".start")
    StartGame.addEventListener("click", () => {
        const name = document.querySelector(".name");
        name.showModal();
    });
const submit = document.querySelector(".submit");
function setPlayerNames(e) {
    e.preventDefault();
    const name = document.querySelector(".name");
    const player1 = document.querySelector(".name1").value;
    const player2 = document.querySelector(".name2").value;
    console.log(player1, player2);
    const player1Element = document.querySelector(".player1");
    const player2Element = document.querySelector(".player2");
    player1Element.textContent = player1;
    player2Element.textContent = player2;
    name.close();
}
submit.addEventListener("click", setPlayerNames);
    reset.addEventListener("click", () => {
        clearBoard();

    });
    function clickHandler(event){
        const index = event.target.dataset.index;
        const winner = game.playRound(index);
        updateScreen();
        if (winner) {
            alert(`${winner} wins`);
            }
        if ("Draw" === winner) {
            alert("Draw");
        }
    }
    boardDiv.addEventListener("click", clickHandler);
    updateScreen();
}

ScreenController();