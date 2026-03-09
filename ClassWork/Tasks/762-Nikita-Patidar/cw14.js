//Method 2 : Using string Methods to do substring Operations(Capitalize 1st letter of string)
//Method 2.1: using a fucntion

function capitalizeFristLetter(str){
    if(str.length===0){
        return str;
    }
    return str[0].toUpperCase()+str.slice(1);
}
console.log("....Method 2.1 Using  function....");
console.log(`Capitalizing 'javascript' :${capitalizeFristLetter('javascript')}`);

//Method 2.2: Making it more concise using arrow function...

let capitalized= str=>str[0].toUpperCase()+str.slice(1);

console.log("....Method 2.2 Using Arrow function....");
console.log(capitalized("this is a string"));

//Method 2.3.1 : Capitalize all the words

function capitalizeAllWords(str){
    const newStr=str.split(" ").map( word=>word[0].toUpperCase()+word.slice(1)).join(" ");
    return newStr;
}
console.log("....Method 2.3.1: Capitalize all the words....");
console.log("String : 'this is a string'");
console.log(capitalizeAllWords('this is a string'));

//Method 2.3.2 : Same using Arrow function
console.log("....Method 2.3.2: Capitalize all the words using Arrow function....");
const capAllWords= str=> str.split(" ").map(word => word[0].toUpperCase()+word.slice(1)).join(" ");
const strToCap="i am studying in bca sem iv";
console.log("String :",strToCap);
console.log(capAllWords(strToCap));

