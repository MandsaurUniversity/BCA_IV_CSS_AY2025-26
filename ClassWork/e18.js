// Build a countdown timer from a target date (Spandan Fest: 2026-03-19)

function showRemainingTime(targetDate) {
    const timeNow = new Date().getTime();   // Today's date & time in milliseconds
    const targetDateinMs = new Date(targetDate).getTime();
    // Find the remaining time in milliseconds..
    const remainingTimeinMs = targetDateinMs - timeNow;
    // Convert the remaining time in number of Days, Hours, Minutes & Seconds...
    const remainingTime = getRemainingTime(remainingTimeinMs);

    console.log("Remaining Time is: ", remainingTime);
}

function getRemainingTime(remainingTimeinMs) {
    if( remainingTimeinMs < 0) {
        return "Target date has been reached!";
    }
    // Calculate time units
    const days = Math.floor(remainingTimeinMs / (1000 * 60 * 60 * 24));
    const remainingDay = remainingTimeinMs % (1000 * 60 * 60 * 24);
    const hours = Math.floor(remainingDay / (1000 * 60 * 60)) ;
    const remainingHour = remainingDay % (1000 * 60 * 60);
    const minutes = Math.floor(remainingHour / (1000 *60)) ;
    const remainingMin = remainingHour % (1000 *60);
    const seconds = Math.floor(remainingMin / (1000));

    return {"Days" : days, "hours" : hours, "minutes" : minutes, "seconds" : seconds};
}

showRemainingTime("2026-03-19");
console.log("Time Remaining in my birthday..");
showRemainingTime("2026-08-09");
