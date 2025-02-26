#!/usr/bin/env node

const readline = require('readline');

// Random number generator LCG
function customRandom(seed) {
    const a = 120;
    const c = 11200;
    const m = 2 ** 5;
    seed = (a * seed + c) % m;
    return seed / m;
}

// Floor function using parseInt
function customFloor(number) {
    return parseInt(number.toString());
}

let seed = Date.now();
let randomNum = customFloor(customRandom(seed) * 10) * 5 + 5;
let initialScore = 50;
let numAttempts = 1;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('NUMBER GUESSING SYSTEM')

function askGuess() {
    rl.question('Enter your guess : ', (input) => {
        let userGuess = parseInt(input);
        
        if (isNaN(userGuess) || userGuess % 5 !== 0) {
            console.log('Invalid input. Please Try again.');
            askGuess();
            return;
        }
        
        numAttempts++;
        
        if (userGuess === randomNum) {
            console.log(`\nCongratulations! You guessed the correct Number: ${randomNum}`);
            console.log(`Attempts: ${numAttempts}, Final Score: ${initialScore}`);
            resetGame();
            return;
        } else {
            initialScore -= 2;
            if (initialScore <= 0) {
                console.log('Game Over. You ran out of points!');
                resetGame();
                return;
            }
            if (userGuess < randomNum) {
                console.log('Too low, Try again');
            } else {
                console.log('Too high, Try again');
            }
            console.log(`Current Score: ${initialScore}`);
            askGuess();
        }
    });
}

function resetGame() {
    seed = Date.now();
    randomNum = customFloor(customRandom(seed) * 10) * 5 + 5;
    initialScore = 50;
    numAttempts = 1;
    console.log('\nNew Game Started! Guess a number');
    askGuess();
}

askGuess();

