//OBJECTIVE FILTER ARRAYS BASED ON CERTAIN CONDITIONS
const numbers = [1,2,3,4,5,6,7,8,9,10]

//creating array contaaining even values 
let even_arr = numbers.filter( num => num%2===0 )

console.log("even number array " +even_arr);

//number grater than 5
let greater5 = numbers.filter( num => num>5 )

console.log("number greater than five  :" + greater5);

//number divisible by 3

let div3 = numbers.filter( num => num%3===0 )

console.log("number divisible by 3  :" + div3);