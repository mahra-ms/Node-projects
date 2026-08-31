const readline = require("readline");

const choices = ["rock", "paper", "scissors"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getWinner(user, computer) {
    if (user === computer) {
        return "draw";
    }

    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        return "user";
    }

    return "computer";
}

function playGame() {
    rl.question("Choose rock, paper, or scissors: ", (input) => {

        const userChoice = input.trim().toLowerCase();

        if (!choices.includes(userChoice)) {
            console.log("❌ Invalid choice!");
            playGame();
            return;
        }

        const computerChoice = getComputerChoice();
        const winner = getWinner(userChoice, computerChoice);

        console.log(`\nYou chose: ${userChoice}`);
        console.log(`Computer chose: ${computerChoice}`);

        if (winner === "draw") {
            console.log("🤝 It's a draw!");
        } 
        else if (winner === "user") {
            console.log("🎉 You win!");
        } 
        else {
            console.log("💻 Computer wins!");
        }

        rl.close();
    });
}

console.log("🪨 ROCK 📄 PAPER ✂️ SCISSORS");
playGame();
