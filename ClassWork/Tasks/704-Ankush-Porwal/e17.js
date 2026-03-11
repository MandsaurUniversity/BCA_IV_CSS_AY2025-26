// Experiment 17: JavaScript Program to display Current Date...
// Task: Display the current date in the  different format...

// Method 1: manual component extraction 
// extract date components manually and format them
const date = new Date();
// Extracting components from this date
const day = date.getDate();
const month = date.getMonth() + 1; // Months are zero-indexed
const year = date.getFullYear();
function padzero(x){
    return x < 10 ? '0' + x : x;
}
function getmonthname(mon){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[mon];
}
// print dates in different formats
console.log("First Format: DD/MM/YYYY:" + padzero(day) + "/" + padzero(month) + "/" + year);
console.log("Second Format: MM-DD-YYYY:" + padzero(month) + "-" + padzero(day) + "-" + year);
console.log("Third Format: YYYY/MM/DD:" + year + "/" + padzero(month) + "/" + padzero(day));
console.log("Fourth Format: DD-MONTH-YYYY:" + padzero(day) + "-" + getmonthname(month-1) + "-" + year);

console.log(day,month,year);


