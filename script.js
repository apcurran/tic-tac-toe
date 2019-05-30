const gameBoard = document.querySelector(".board-container");
const cells = Array.from(document.querySelectorAll(".cell"));
const jumbotron = document.querySelector(".jumbotron");
const resetBtn = document.querySelector(".reset");

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

const enableClickability = () => {
    cells.forEach((cell) => {
        cell.addEventListener("click", clickFunc)
    });
};

const disableClickability = () => {
    cells.forEach((cell) => {
        cell.removeEventListener("click", clickFunc)
    });
};

const clickFunc = (event) => {
    // First, check if the spot is taken yet.
    if (event.target.textContent === "") {
        if (playerOne.hasTurn) {
            // Place marker in designated cell, then switch turns.
            event.target.textContent = playerOne.marker;
            if (checkForWinner(playerOne.marker)) {
                playerOne.displayWinner();
                disableClickability();
                return;
            }
            playerOne.hasTurn = false;
            playerTwo.hasTurn = true;
            playerTwo.displayTurn();
        } else {
            // Place marker in designated cell, then switch turns.
            event.target.textContent = playerTwo.marker;
            if (checkForWinner(playerTwo.marker)) {
                playerTwo.displayWinner();
                disableClickability();
                return;
            }
            playerTwo.hasTurn = false;
            playerOne.hasTurn = true;
            playerOne.displayTurn();
        }
    } else {
        jumbotron.textContent = "Sorry, that space is already taken.";
    }
};

const checkForWinner = (playerMarker) => {
    let result = false;
    if  (checkForTriple(0, 1, 2, playerMarker) ||
         checkForTriple(3, 4, 5, playerMarker) ||
         checkForTriple(6, 7, 8, playerMarker) ||
         checkForTriple(0, 3, 6, playerMarker) ||
         checkForTriple(1, 4, 7, playerMarker) ||
         checkForTriple(2, 5, 8, playerMarker) ||
         checkForTriple(0, 4, 8, playerMarker) ||
         checkForTriple(6, 4, 2, playerMarker)) {
            result = true;
        }
    return result;

};

const checkForTriple = (a, b, c, playerMarker) => {
    let result = false;
    if (getBoxVal(a) === playerMarker && getBoxVal(b) === playerMarker && getBoxVal(c) === playerMarker) {
        result = true;
        // Add the winner class to highlight winning combo.
        getBox(a).classList.add("winner");
        getBox(b).classList.add("winner");
        getBox(c).classList.add("winner");
    }
    
    return result;
};

// Get the value of the given square.
const getBoxVal = (number) => {
    return document.getElementById(number).textContent;
};

// Get box to then use later for adding the winner class.
const getBox = (number) => {
    return document.getElementById(number);
}

const resetBoard = (event) => {
    if (window.confirm("Are you sure you want to reset your game?")) {
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });

        playerOne.hasTurn = true;
        playerOne.displayTurn();
        enableClickability();
    }
};

resetBtn.addEventListener("click", resetBoard);
enableClickability();