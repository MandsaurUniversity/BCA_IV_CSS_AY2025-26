const emoji ="🐴";
console.log(emoji.charCodeAt(0));
console.log(String.fromCodePoint(128054));
console.log()

//apply multiple transforamtion in sequence ( chaining map() calls)

let numbers = [1,2,3,4,5];
console.log(numbers);

let result = numbers.map(function(parameter){
    return parameter * 2 ;

});
console.log(result);


result = numbers.map(parameter => parameter * 2 + 5);
console.log(result);
result = numbers.map(parameter => parameter * 2).map(parameter => parameter +5);
console.log(result);