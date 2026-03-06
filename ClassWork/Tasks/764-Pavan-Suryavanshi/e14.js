function randomBetween(min, max) {
    // Math.random() gives 0 to 0.999...
    // Formula: min + (random * range)
    const random = Math.random();
    const range = max - min + 1;
    const randomInRange = Math.floor(random * range);
    return min + randomInRange;
}

// Test cases
console.log("\n=== Experiment 12: Random Number Generator ===");
console.log("Random between 1-10:");
for (let i = 0; i < 5; i++) {
    console.log(randomBetween(1, 10));
}

console.log("\nRandom between 50-100:");
for (let i = 0; i < 5; i++) {
    console.log(randomBetween(50, 100));
}

// Dice roller example
function rollDice() {
    return randomBetween(1, 6);
}

console.log("\n=== Dice Rolls ===");
console.log("Roll 1: " + rollDice());
console.log("Roll 2: " + rollDice());
console.log("Roll 3: " + rollDice());
console.log("Roll 4: " + rollDice());