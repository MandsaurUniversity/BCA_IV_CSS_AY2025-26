// Advance array operations using higher order functions
// 1. Removing elements from Arrays

// Method 1: using filter()- non destructive method
const numbers = [1,5,9,3,8,34,87,54];
const remove =8;
const without8 = numbers.filter(n => n!==remove );
console.log("Array:",numbers);
console.log(`without ${remove}, Array: ${without8}`);


// Method 2: splice()- destructive method
const arr = [1,5,9,3,8,34,87,54];
console.log(`Array before removal: ${arr}`);
//arr.splice(5,1);
console.log(`Removing: ${arr.splice(5,1)} from array`);
console.log(`Array after removal: ${arr}`);

// Method 3: Remove by value
function removebyvalue(arr,value){
    return arr.filter(item => item!= value);
}
const fruits = ['cherry','apple','tomato','chilli','banana'];
const fruitarr = removebyvalue(fruits,'chilli');
console.log("Original Array:",fruits);
console.log("After removing chilli:",fruitarr);
// Method 4: Remove first occurence using slice() method

function removefirstoccurence(arr,val){
    const index = arr.indexOf(val);
    if(index > -1){
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
    return arr;
}
const fruits2 = ['cherry','banana','apple','tomato','chilli','banana'];
console.log("Array before removal of first occcurence of banana:", fruits2);
console.log("Array after removal:");
console.log(removefirstoccurence(fruits2,"banana"));

// 2. Merging Arrays
// Method 1: using concat()
// Method 2: spread operator
// Method 3: using multiple arrays

// 3. Removing elements
// Method 1: using set
// Method 2: using filter()
// Method 3: using reduce()
const uniqueusingreduce = numbers.reduce((acc,num) =>{
    if(!acc.includes(num)){
        acc.push(num);
    }
    return acc;
},[]);
console.log("Array Containing Unique Values (created using reduce):");
console.log(uniqueusingreduce);
// 4. Sorting(arrays)
// Numeric sorting Arrays()
const numarr = [54,4,7,3,87,2,67,9];
console.log("Unsorted numeric array:",numarr);
const sortednumarr = [...numarr.sort((a,b) => a-b)];
console.log("unsorted numric array:",numarr);
console.log("numeric array after sorting in ascending order:",sortednumarr);
const sortednumarrindesc = [...numarr.sort((a,b) => b-a)];
console.log("numeric array after sorting in descending order:",sortednumarrindesc);
// sortednumarr.push(90)
console.log("Asc:",sortednumarr);
console.log("desc:",sortednumarrindesc);
console.log("orig:",numarr);

// Reverse order sorting
const sortednumarrindesc = [...numarr].sort((a,b) => b-a);
console.log("Number array after sorting in descending order:",sortednumarrindesc);
console.log("Desc:",sortednumarrindesc);
// String sorting(alphabetical)
const words = ["potato","zebra","apple","cow","banana","fish"];
const sortedwords = words.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()));
// Case-insensitive sorting

// 5. Sorting objects
// sort by property
// sort in ascending order (numbers)
// sort by name