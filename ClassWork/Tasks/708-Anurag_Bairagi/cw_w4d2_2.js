const words = ["banana","apple","strawberry","orange","grapes","mangoes","guava","kiwi","cherry","blueberry","Apricot"];
console.log("Words : " + words);

const startwithA = words.filter(word=>word.toLowerCase().startsWith("a"));
console.log("Words starts with 'A' : " + startwithA);

const havingpp = words.filter(word=>word.includes("pp"));
console.log("Words having 'pp' : " + havingpp);

const longerT6 = words.filter(word=> word.length>6 );
console.log("Words Longer than 6 character 6 : " + longerT6);

const startwithB = words.filter(word=> word[0].toLowerCase()=='b');
console.log("Words starts with 'B' : " + startwithB);
