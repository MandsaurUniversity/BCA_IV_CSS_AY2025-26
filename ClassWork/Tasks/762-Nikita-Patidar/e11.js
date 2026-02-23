//Experiment 11:Check Leap Year

function isleapyear(year){
    if(year%400==0){
        console.log("leap year");
    }
    else if(year%100==0){
        console.log("not leap year");
        }
    else if(year%4==0){
       console.log("leap year");
    }
    else{
        console.log("not a leap year");
    }
}
isleapyear(2027);

