// Experiment 11:Check Leap Year
/*
Leap year rules:
divisible by 400
divisible by 100
divisible by 4
otherwise,not a leap year
*/
function isleapyear(year = 2028) {
    if (year % 400 === 0) {
        console.log("year is a leap year");
        return true;
    } 
    else if (year % 100 === 0) {
        console.log("Year is not a leap year");
        return false;
    } 
    else if (year % 4 === 0) {
        console.log("Year is a leap year");
        return true;
    } 
    else {
        console.log("Year is not a leap year");
        return false;
    }
}

// 👇 Function ko bahar call karo
isleapyear(2028);