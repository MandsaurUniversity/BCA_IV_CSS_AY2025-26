//Tasks: Display the current date in  differemt formats (DD/MM/YYYY), (MM/DD/YYYY), (YYYY-MM-DD), stc.

//Method 1:
const date = new Date();

const day = date.getDate();
const month = date.getMonth() +1;
const year = date.getFullYear();

function padZero(x){
    return x <10 ? "0" + x : x;
}

function getMonthName(monIdx){
    const months = ["Jan","Feb","Mar","Apr","May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monIdx];
}

console.log("First format (DD/MM/YYYY): " + padZero(day) + "/" + padZero(month) + "/" + year)
console.log("Second format (MMDD-YYYY): " + padZero(month) + "-" + padZero(day) + "-" + year)
console.log("Third format (YYYY-MM-DD): " + year + "-" + padZero(month) + "-" + padZero(day))
console.log("Fourth format (DD-MM-YYYY): " + padZero(day) + "-" + getMonthName(month - 1) + "-" + year)