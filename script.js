const gameBoard = document.querySelector(".board-container");
const cells = Array.from(document.querySelectorAll(".cell"));
const jumbotron = document.querySelector(".jumbotron");
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
        jumbotron.textContent += `${name} wins!`;
    };

    return {
        name,
        marker,
        sayHi,
        displayWinner,
        hasTurn
    };
};

const playerOne = PlayerFactory("Player One", "X", true);
const playerTwo = PlayerFactory("Player Two", "O", false);

const enableClickability = () => {
    cells.forEach((cell) => {
        cell.addEventListener("click", clickFunc)
    });
};

const clickFunc = (event) => {
    // First, check if the spot is taken yet.
    if (event.target.textContent !== "X" && "O") {
        if (playerOne.hasTurn) {
            // Place marker in designated cell, then switch turns.
            event.target.textContent = playerOne.marker;
            playerOne.hasTurn = false;
            playerTwo.hasTurn = true;
        } else {
            // Place marker in designated cell, then switch turns.
            event.target.textContent = playerTwo.marker;
            playerTwo.hasTurn = false;
            playerOne.hasTurn = true;
        }
    }
};

enableClickability();