//Build a Countdown timer from a target date
function showRemainingTime(targetDate){
    const timeNow = new Date().getTime(); //Today's date &time in milliseconds
    const targetDateinMs = new Date(targetDate).getTime();
    return updateRemainingTime(timeNow,targetDateinMs);
   function updateRemainingTime(timeNow,targetDateinMs){
     const remainingTimeinMs = targetDateinMs - timeNow;
     if(remainingTimeinMs <0){
        console.log("Target date has been reached!");
        return;
     }
     //calculate time units
    //  const days = remainingTimeinMs /(1000 * 60 * 60 *24) ;
    //  const hours = remainingTimeinMs/(1000 * 60 * 60 *24);
    
    //by math
    const days= Math.floor(remainingTimeinMs/(1000* 60* 60* 24));
    const hours= Math.floor(remainingTimeinMs % (1000*60*60*24)/ (1000*60*60));
     const minutes = Math.floor(remainingTimeinMs % (1000*60*60*24)% (1000*60 *60) /(1000*60));
     const seconds=Math.floor(remainingTimeinMs %(1000*60*60*24)%(1000*60*60)%(1000*60)/(1000));
     return {"Days:" :days, "hours:" :hours ,"Minutes:" :minutes,"seconds:" :seconds};
   }
 return updateRemainingTime(timeNow,targetDateinMs);
}
console.log(showRemainingTime("2026-03-19"));