// Method 2: Using String Methods to do  Substring Operations(Capitalize First Letter of String)...
// Method 2.1 using a function
function CapitalizeFirstLetter(str){
    if(str.length === 0)
        return str;

    return str[0].toUpperCase() + str.slice(1);
}

// Output:
console.log(`Capitalizing ' javascript': ${CapitalizeFirstLetter('javascript')}`);

// Method 2.2: Making it more concise using arrow function...
// Arrow function
 let capitalize =(str) => str[0].toUpperCase() + str.slice(1);
 console.log("Method 2.2: using Arrow Function")
 console.log(capitalize("this is Ankush Porwal"));

 // Method 2.3.1: Capitalize all the words(also known as title case)...
 function capitalizeallwords(str){
    const newstr = str.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
return(newstr);
 }
 console.log("Method 2.3.1: Capitalize all the words(also known as title case)...");
 console.log("string: 'this is string'");
 console.log(capitalizeallwords('this is a string'));

 