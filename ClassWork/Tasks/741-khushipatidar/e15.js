//Write a program to Reverse  a string
// Method 1 : Manual Backward loop( without using any build-ins)
function reverseString(str){
    let reversed ="";
    // starting from the last char and moving forward
    for (let i  = str.length -1;i>-1;i--){
    reversed +=str[i];
}
return reversed;
}
console.log("Reverse of 'khushi patidar' is: ",reverseString("khushi patidar"));

//Method 2: Using bulid-in methods like split,reverse ,join
//convert the string to array ,them reverse and then convert back to string 
function stringReverse(str){
    console.log("string is",str);
    console.log("converting into array:",str.split(""));
     console.log("reversing the array:",str.split("").reverse());
      console.log("converting  array back into string:",str.split("").reverse().join(""));
      console.log(str.split("").reverse().join());
      console.log(" final result:")
    return str.split("").reverse().join();
}
//using arrow function...
let arrowRev = str=> str.split("").reverse().join("");
console.log("Reverse of khushi patidar :",stringReverse("khushi patidar"));