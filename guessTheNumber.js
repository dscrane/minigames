
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const history = [];
let i = 0;
let code = generateCode();
let guessCode = "";


game();




function game() {
  console.log("\x1b[1m\x1b[35mWELCOME TO GUESS THE CODE\x1b[0m");
  console.log("\x1b[1m\x1b[36mYou have 10 chances to correctly guess the code!\x1b[0m");
  console.log("\x1b[1m\x1b[36mThere will not be any duplicate numbers.\x1b[0m");
  console.log("\x1b[1m\x1b[36mNumbers in \x1b[32mGREEN\x1b[036m are correct!\x1b[0m")
  console.log("\x1b[1m\x1b[36mNumbers in \x1b[31mRED\x1b[36m are incorrect.\x1b[0m");
  console.log("\x1b[1m\x1b[36mNumbers in \x1b[33mYELLOW\x1b[36m are present but in the incorrect position.\x1b[0m");
  getGuess();
}



function getGuess() {
  // console.log("[FOR TESTING]:", parseInt(guessCode) == code.join(""));
  if (i < 10) {      
    if (guessCode === code.join("")) {
      console.log("Congratulations you have guessed the correct code!");
      endGame()
    }
    guessCode = ""
    rl.question("Please guess a 4 digit number ex. (1234 or 8462)\n> ", (resp) => {
      let output = "";
      resp.split("").forEach((num, index) => {
        guessCode = guessCode + num;
        const guess = parseInt(num);
        if (code[index] === guess) {
          output = output + `\x1b[32m${num} \x1b[0m`;
        } else if (code.includes(guess)) {
          output = output + `\x1b[33m${num} \x1b[0m`;
        } else {
          output = output + `\x1b[31m${num} \x1b[0m`;
        }
      });
      for (let row of history) {
        console.log(row);
      }
      const formatRow = `[${i}] ` + output
      console.log(formatRow);
      history.push(formatRow);

        
      i++
      return getGuess();
    });
  } else {
    console.log("You could not guess the code in time :/")
    return endGame()
  }
}

function endGame() {
  return rl.question("Would you like to play again?", (resp) => {
    if (resp.startsWith("y" || "Y")) {
      code = generateCode();
      game();
    } else {
      console.log("Thank you for playing!");
      rl.close();
    }
  });
}

function generateCode() {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const code = [];
  for (let i = 0; i < 4; i++) {
    let toRemove = Math.floor(Math.random() * nums.length);
    code.push(nums[toRemove]);
    nums.splice(toRemove, 1);
  }
  return code;
};