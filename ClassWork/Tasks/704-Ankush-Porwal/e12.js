// Experiment 12: Random number between two numbers
function getRandombetween(min, max) {
    // Math.random() gives 0 to 0.9999...
    // formula: min+(random*range)
    const random=Math.random();
    const range=max-min+1;
    const randominrange=Math.floor(random*range);
    return min+randominrange;
}
// Test cases
console.log("\n===Experiment 12:Random number generator===");
 // Random number between 1 and 10
console.log(" five random numbers between 1-10:");
for(let i=0;i<5;i++){
    console.log(getRandombetween(1,10));
}
// Random number between 50 and 100
console.log("\n five random numbers between 50-100:");
for(let i=0;i<5;i++){
    console.log(getRandombetween(50,100));
}
