// Apply multiple transformation in sequence (chaining map() calls)

let number = [1,2,3,4,5,6];

// double  the numbers array : store array in result
let result = number.map(   function ( Par ){
    return Par*Par;

} )
//output: 
console.log("number : "+ number);
console.log("result: "+result);

// Double the number and + 5
 result = number.map(  (par) => (par*2)+5  )

console.log("number : "+ number);
console.log("result: "+result);