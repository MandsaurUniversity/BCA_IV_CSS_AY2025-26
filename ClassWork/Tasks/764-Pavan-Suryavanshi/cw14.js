// Method 2: using string method to do substring operations (Capitilize First Letter of a string)

//method 2.1: using a function 
function capitalizeFirstLetter(str){
    if(str.length === 0)
        return str;

    return str[0].toUpperCase() + str.slice(1);
}
const someString = "this is a string";
console.log(`Capitalizing 'pavan suryavanshi' : ${capitalizeFirstLetter('pavan suryavanshi')}`);
console.log(`Capitalizing 'this is a string' : ${capitalizeFirstLetter('this is a string')}`);

// Method 2.2: Using Arrow Function

let capitalize = (str) => str[0].toUpperCase() + str.slice(1);
console.log("\nMethod 2.2: Using Arrow Function");
console.log(capitalize("this is a string"));

//Method 2.3.1: Capitalize all the words 
function capitalizeAllWords(str){
    const newStr = str.split(" ").map( word => word[0].toUpperCase() + word.slice(1)).join(" ");
    return newStr;
}
console.log("\nMethod 2.3.1: Capitalize all words");
console.log("String: 'this is a string'");
console.log(capitalizeAllWords('this is a string'));

//Method 2.3.2: Same Using arrow function
console.log("\nMethod 2.3.2: Capitalize all words using arrow function: ");
const capAllWords = str => str.split("").map( word => word[0].toUpperCase() + word.slice(1)).join("");
const strToCap = "i am studying in mandsaur university"
console.log("String: i am studying in mandsaur university'");
console.log(capAllWords(capAllWords(strToCap)))
