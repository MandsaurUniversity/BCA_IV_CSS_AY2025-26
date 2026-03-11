//experiment 17 : javaScript progress to Display Current date
//Task : Display date and time in diffrent formates

//Method 1: Manual Componenet extraction

const date = new Date();
//extracticng componenet
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

    function padZero(num){
        return (num <10)?  '0' +num : num ;
    }
function getMontname(mon){
const month = [ "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
                ]
                return month[mon]
    }   


// printing in format 
console.log("format (dd /mm /yyyy): "+ padZero(day)+ '/' + padZero(month)+ '/' + year)
console.log("format (mm  - dd - yyyy): "+ padZero(month)+ '-' + padZero(day)+ '-' + year)
console.log("format (yyyy / mm /dd): "+ year+ '/' + padZero(month)+ '/' + padZero(day))
console.log("format (dd - mm - yyyy): "+ padZero(day)+ '-' + getMontname(month)+ '-' + year)


