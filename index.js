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
        let availableCells = emptyCells();
        if (availableCells.length === 0 || index < 0 || index > 8 || board[index].getValue() !== "_") {
            console.log("Invalid move");
            return false;
        }
        board[index].playMove(player);
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
    return {getBoard, playMove, displayBoard,checkWin,clearBoard};
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
    let currentPlayer = players[0];
    const switchTurn = () => {
        currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0];
    }
    const getCurrentPlayer = () => currentPlayer;
    const playRound = ( index) => {
        console.log(board.displayBoard());
        if (board.playMove(index, currentPlayer) === false) {
            return;
        }else{
            board.displayBoard();
            if (board.checkWin()) {
                console.log(`Player ${currentPlayer.name} wins!`);
                board.clearBoard();
                console.log(board.displayBoard());
                return;
            }
            switchTurn();
        }
    }
    return { playRound, getCurrentPlayer,getBoard:board.getBoard};
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
    function clickHandler(event){
        const index = event.target.dataset.index;
        game.playRound(index);
        updateScreen();
    }
    boardDiv.addEventListener("click", clickHandler);
    updateScreen();
}
ScreenController();