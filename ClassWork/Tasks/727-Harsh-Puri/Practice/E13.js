//check weather a String is Palindrome or not
// racecar
//Method 1 :
const str = "RaceCar"
let cleaned = str.toLowerCase();

let start =0; let end = cleaned.length-1;

console.log("using Method 1:")

while(start<end){
if(cleaned[start] == cleaned[end]){
    start++;end--;}
    else break;

}
if(start != end)console.log("string "+ str +"\nis not Palindrome.");
else console.log("string "+ str +"\nis  Palindrome.");

// Methode 2: use function to check more than 1 word
console.log("using Method 2:")
function pal(str){
let clean = str.toLowerCase()
let start =0; let end = clean.length-1;

while(start <end){
if(clean[start] !=  clean[end]){
    return false;
}
start++;end--;
}
return true;
}

console.log( ` Is "raceCar is palindrome ? => ${pal("raceCar")}    `) ;
//Palindrom String Line checking 
console.log("Method : 3")


function isLinePal(str){
let clean = str.toLowerCase();
clean = clean.replace(/[ ]/g,"");  // Removing Space ;
console.log(clean);
let start =0; let end = clean.length-1;

while(start <end){

 if(clean[start] ==  clean[end]){
    start++;
    end--;
    continue;
}   
return false;
}
return true;

}
console.log( ` Is "A man a Plan a Canal Panama" is palindrome ? => ${isLinePal("A man a Plan a Canal Panama")}    `) ;
console.log("A man a Plan a Canal Panama");
