//Experiment 11 : leap Year;
let year = 1900;

function isLeapYear( year){

    if( year % 400 == 0  && year % 100 != 0 ){
        return true;
    }else if(year %4 == 0  && year % 100 != 0)return true;
    else return false;

}
if(isLeapYear(year)){ 
    console.log( year + " is a Leap Year ");
}else console.log( year + " is a Not Leap Year ");