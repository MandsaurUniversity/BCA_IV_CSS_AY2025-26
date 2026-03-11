//Experiment no. 17 : java Script program to Display Current Date 
//Task : Display the current date in different formats (DD/MM/YY, MM/DD/YY, YY-MM-DD,etc.)

//method 1: manual component Extraction n

const date = new Date();

const day = date.getDate();
const month = date.getMonth()+1;
const year = date.getFullYear();
console.log(day, month,year);

function padZero(x){
    return x < 10 ? "0" + x : x ;
}

function getMounthName(mon){
    const months = ["jan","feb", "march",
         "april", "may", "june","july"
        ,"aug","sep","oct","nov","dec"];
        return month[mon];
    
    }
console.log("First format (DD/MM/YYYY) : ",padZero(day), padZero(month),year);
console.log("Second format (MM/DD/YYYY) : ", padZero(month),padZero(day),year);
console.log("Third format (YYYY/MM/DD) : ",year,padZero(month),padZero(day));
console.log("fouth format : (DD-MOUNTH-YYYY)",padZero(day),getMounthName(month-1),year);