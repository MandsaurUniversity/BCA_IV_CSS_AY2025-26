// Build a Countdown timer from a Target Date(Spandan Fest: 2026-03-19)...

function showremainingtime(targetdate){
    const timenow = new Date().getTime(); // Todays Date  & Timein Milliseconds
    const targetdateinms = new Date(targetdate).getTime();
    const remainingtimeinms = targetdateinms - timenow;
    const remainingtime = getremainingtime(remainingtimeinms);
    console.log("Remaining time is:", remainingtime);
    
}
function getremainingtime(remainingtimeinms){
    if(remainingtimeinms < 0){
        return "Target Date has Been Reached !";
    }
    // calculate time units
    const days = Math.floor(remainingtimeinms / (1000 * 60 * 60 *24));
    const remainingday = remainingtimeinms % (1000 * 60 * 60 * 24);
    const hours = Math.floor(remainingday / (1000 * 60 * 60 ));
    const remaininghour = remainingday % (1000 * 60 * 60)
    const minutes = Math.floor (remaininghour / (1000 * 60));
    const remainingmin = remaininghour  % (1000 * 60);
        const seconds = Math.floor(remainingmin / (1000));
    return {"Days:" : days , "hours": hours, "Minutes:":minutes, "Seconds":seconds};

}

showremainingtime("2026-03-19");
console.log("Time remaining in my birthday..");
showremainingtime("2026-02-19");
