// Full abstraction — the action is a parameter
function rep(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}
// Now we can do ANYTHING n times:
rep(3, console.log);           // Logs 0, 1, 2
rep(3, i => console.log("*".repeat(i + 1)));  // Logs *, **, ***
console.log("UPPER".toLowerCase());