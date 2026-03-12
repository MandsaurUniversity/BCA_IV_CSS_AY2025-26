//Using filters on array  of string 
const  words = [ "apple","banana","strawberry" , "orange","grapes" , "mangos" , "apricot", "appy" ]
let fruits = words.filter(words => words.startsWith('a' || 'A') )
console.log("Fruits Start with 'A' ",fruits)
//word containing "pp"
let fruits_with_pp = words.filter(words => words.includes("pp") )
console.log("Fruits includes 'PP' ",fruits_with_pp)

//word longer than 6 latters
let fruits_6 = words.filter(words => words.length === 6 )
console.log("Fruits longer than 6 lattter ",fruits_6)