// program to check leap year 
function isLeapYear(year)
{
    if(year%400 === 0){
        return true;
    }
    else if (year% 100 === 0){
        return false;
    }
    else if( year%4 === 0){
        return true;
    }
    else 
        return false;

}
 console.log("Year 2000 a leap year?" + isLeapYear(2000));
 console.log("Year 2025 a leap year?" + isLeapYear(2025));