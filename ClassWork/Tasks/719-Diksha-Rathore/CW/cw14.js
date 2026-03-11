//Method-2 using string Methods to do substring operations(Capitalize first letter of a string)
//Method-2.1 using a function
console.log("Method-2.1 using Function");

function capitalizeFirstLatter(str){
    if(str.length === 0)
        return str;

    return str[0].toUpperCase() + str.slice(1);
}
//output:
const someString = "this is a string";
console.log(`Capitalizing 'diksha' : ${capitalizeFirstLatter('diksha')}`)
console.log(`Capitalizing '${someString}' : ${capitalizeFirstLatter('someString')}`)


//Methode-2.2 Making it more consise using Arrow function...

let capitalized = str => str[0].toUpperCase()+ str.slice(1);
console.log("Method-2.2 using Arrow Function");
console.log(capitalized("this is a string"))

//Method-2.3.1 Capitalize all the words(also know as titale case)...
function capitalizeAllWords(str){
    const newStr = str.split(" ").map(word => word[0].toUpperCase() + word.slice(1));
    return newStr;

}
console.log("Method-2.3.1 Capitalize all the words(also know as titale case) Arrow Function");
console.log("String: 'this is a string'");
console.log(capitalizeAllWords("this is a string"))


//Method-2.3.2 Same using Arrow function...
console.log("Method-2.3.1 Capitalize all the words using Arrow Function");
const capAllWords = (str) => str.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")

const strTocap = "i am studing in bca"
console.log("String:", strTocap);
console.log(capitalizeAllWords(strTocap));
