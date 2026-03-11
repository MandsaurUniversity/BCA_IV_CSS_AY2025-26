//Experiment no. 17 : javascript program to display current Date
//Task : Display the current date in different formats (DD/MM/YYYY, MM/DD/YYYY,YYYY-MM-DD, etc.)

//Method 1: Manual components Extraction 

const date = new Date();

const day  = date.getDate();
const month = date.getMonth()+1;
const year = date.getFullYear();

console.log(day, month , year);

function padZero(x){
    return x < 10 ? "0" + x : x;
}

function getMonthName (mon){
    const months = ["jan","feb","mar","apr","may","june","july","aug","sep","oct","nov","dec"];
    return months[mon];

}

console.log("First Formate (DD/MM/YYYY) : ",padZero(day),padZero(month),year);
console.log("Second Formate (MM/DD/YYYY): ",padZero(month),padZero(day),year);
console.log("Third Formate (YYYY/DD/MM): ",year,padZero(month),padZero(day));
console.log("Forth Formate (DD-MONTH-YYYY) : ",padZero(day),getMonthName(month-1),year);

console.log(day, month, year);

