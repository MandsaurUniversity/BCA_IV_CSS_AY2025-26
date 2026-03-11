//USING filter ()on Array of String

const words = ["banana","apple","grapes","orange","kiwi","guava","blueberry","cherry"];

//word string with 'a'
const wordStartWithA= words.filter(word => word.startsWith("a"));
console.log("Starts With A: "+ wordStartWithA);
//WORDS STARTING THI 'B'
const wordStartWithB=words.filter(word=>word[0]==="b");
console.log("Starts With B: "+wordStartWithB );
//words containing 'rr'
const wordStartWithrr= words.filter(word =>word.includes("rr"));
console.log("Words contain rr: "+wordStartWithrr);
//words longer than 6 character
const longerThaneChar=words.filter(w=>w.length > 6);
console.log("words longer than: "+longerThaneChar);
//