const gameBoard = document.querySelector(".board-container");
const cells = Array.from(document.querySelectorAll(".cell"));
const jumbotron = document.querySelector(".jumbotron");
const resetBtn = document.querySelector(".reset");
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

const PlayerFactory = (name, marker, hasTurn) => {
    const sayHi = () => {
        console.log(`Hi ${name}!`);
    };
    const displayWinner = () => {
        jumbotron.textContent = `Status: ${name} wins!`;
    };

    const displayTurn = () => {
        jumbotron.textContent = `Status: ${name}'s turn`;
    };

    return {
        name,
        marker,
        sayHi,
        displayWinner,
        displayTurn,
        hasTurn
    };
};

const playerOne = PlayerFactory("Player One", "X", true);
const playerTwo = PlayerFactory("Player Two", "O", false);

// Start with Player One's turn
playerOne.displayTurn();

// Enable clicks
const enableClickability = () => {
    cells.forEach((cell) => {
        cell.addEventListener("click", clickFunc)
    });
};

// Disable clicks
const disableClickability = () => {
    cells.forEach((cell) => {
        cell.removeEventListener("click", clickFunc)
    });
};

const clickFunc = (event) => {
    // First, check if the spot is taken yet.
    // const selectedCell = 
    if (event.target.textContent !== "X" && "O") {
        if (playerOne.hasTurn) {
            // Place marker in designated cell, then switch turns.
            event.target.textContent = playerOne.marker;
            playerOne.hasTurn = false;
            playerTwo.hasTurn = true;
            playerTwo.displayTurn();
        } else {
            // Place marker in designated cell, then switch turns.
            event.target.textContent = playerTwo.marker;
            playerTwo.hasTurn = false;
            playerOne.hasTurn = true;
            playerOne.displayTurn();
        }
    }
    checkForWinner();
};

const allSame = (arr) => {
    // Return true if this passes and all elements in a row, col, or diag are the same.
    arr.every((cellElement) => {
        cellElement.textContent === arr[0].textContent && cellElement.textContent !== "";
    });
};

const endGame = (winningCombo) => {
    winningCombo.forEach(comboElement => {
        comboElement.classList.add("winner");
        disableClickability();
    });
};

/* const checkForWinner = () => {
    let winner = false;

    winningCombinations.forEach((combo) => {
        const currentBoard = cells;
        console.log(currentBoard[8]);
        const sequence = [ currentBoard[combo[0]], currentBoard[combo[1]], currentBoard[combo[2]] ];
        if (allSame(sequence)) {
            winner = true;
            endGame(sequence);
        }
    });
}; */

enableClickability();

const resetBoard = (event) => {
    if (window.confirm("Are you sure you want to reset your game?")) {
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });

        playerOne.hasTurn = true;
        playerOne.displayTurn();
    }
};

resetBtn.addEventListener("click", resetBoard);