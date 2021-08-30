// Utility constants  
const prompt = "\n\x1b[36m> \x1b[0m";
const redX = " \x1b[31mX\x1b[0m ";
const whiteBox = " \u25A1 ";
const yellowO = " \x1b[33mO\x1b[0m ";
const bgeTag = "\x1b[32m[BGE]\x1b[0m:"

// Configure game
let board = null;
let ships = [];
let hits = [];
let misses = [];
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});;

init();
// initializeShips();

// Initalize session
function init() {
  // Prompt the user to begin the game
  console.log("Welcome to the Battleship Game Engine!");
  rl.question(`${bgeTag} Would you like to begin a game of Battleship (yes/no)? ${prompt}`, resp => {
    // If user responds with yes -> begin game
    if (resp.startsWith("y" || "Y")) {
      initializeShips();
      initializeBoard();
      startGame();
    } else {
      // Otherwise display a goodbye message
      console.log("Please come back for a game at any time :)")
    }
  })
}

// Begin game session
function startGame() {
  console.log(`${bgeTag} Here is the current board...`);
  displayCurrentBoard(board);
  getUserGuess();
}

// Handle functionality for a round
function playRound(point) {
  // Escape round if "hits" includes "point"
  if (hits.includes(point)) {
    console.log("This point has already been guessed. Please pick a new point.")
    return getUserGuess();
  }

  // Update game board
  updateGameBoard(point);

  // Display current game board
  displayCurrentBoard();

  // Handle end of round
  if (ships.length) {
    getUserGuess();
  } else {
    handleEndOfGame();
  }
}

// Get user input
function getUserGuess() {
  rl.question(`${bgeTag} Choose a point to attack (ex. C5). ${prompt}`, resp => {
    handleGuess(resp);
  })
}

// Handle the guess input by the user
function handleGuess(resp) {
  // Ensure valid entry
  if (resp.match(/[A-z][0-9]/)) {
    playRound(resp.toUpperCase());
  } else {
    console.log("That is not a valid point.");
    return getUserGuess();
  }
  
}

// Update game board
function updateGameBoard(point) {
  const row = point[0];
  const col = point[1] - 1;
  // Add a colored character to the board depending on hit or miss
  if (ships.includes(point)) {
    ships = ships.filter(ship => ship !== point)
    hits.push(point);
    console.log(`${bgeTag} HIT!`)
    board[row][col] = redX;
  } else {
    misses.push(point)
    console.log(`${bgeTag} MISS!`);
    board[row][col] = yellowO;
  }
}

// End of game
function handleEndOfGame() {
  console.log(`${bgeTag} You have destroyed all the enemy ships!!`);
  console.log(`${bgeTag} Congratulations on your decisive naval victory!`);
  rl.question(`${bgeTag} Would you like to play again? ${prompt}`, resp => {
    if (resp.startsWith("y" || "Y")) {
      startGame()
    } else {
      console.log("Thank you for playing!!")
      rl.close();
    }
  })
}

// Log game board to console
function displayCurrentBoard() {
  console.log("  \x1b[34m+  1  2  3  4  5  6  7  8 \x1b[0m")
  for (let row in board) {
      console.log(`  \x1b[34m${row}\x1b[0m ${board[row].join("")}`)
  }
}

// Set locations of ships 
function initializeShips() {
  // TODO: 
  //  randomize positioning of the ships
  ships = ["A2", "B2", "H7", "H6", "H5", "E4", "D4", "B4", "F4"];

  /*   
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
  for (let i = 2; i < 5; i++) {
    const direction = Math.floor(Math.random() * 2);
    const startPoint = Math.floor(Math.random() * 8)
    if (direction) {
      // if horizontal 
      const row = Math.floor(points.length / 8) - 1;
      console.log(row);
      const shipLocal = "" + rows[row] + Math.floor(64/(row - 1)) 
      console.log(shipLocal)
      points.splice(startPoint, 1);
      console.log(points);
    } else {
      console.log("false");
    } 
  }
*/
}

// Set the board arrays
function initializeBoard() {
  board = {
    A: new Array(8).fill(whiteBox),
    B: new Array(8).fill(whiteBox),
    C: new Array(8).fill(whiteBox),
    D: new Array(8).fill(whiteBox),
    E: new Array(8).fill(whiteBox),
    F: new Array(8).fill(whiteBox),
    G: new Array(8).fill(whiteBox),
    H: new Array(8).fill(whiteBox),
}
}