//Advance Array operstions using Higher-order Functions

//1. Removing Elements from Array

//Method 1 : Using filter() - non-destructive method

const numbers =[2,3,4,5,6,7,8,9];
const remove =8;
const withOut8 = numbers.filter(num => num!==remove);
console.log("Array: "+numbers);
console.log(`WithOut8 ${remove}, Array : ${withOut8}`);

//Method 2 : splice() - destructive method - Remove at index: 5
const arr =[1,2,3,4,35,36,7,8,9];
console.log(`Array after removal: ${arr}`);
//arr.splice(5,1);
console.log(`Removing: ${arr.splice(5,1)} from array`);
console.log(`Array after removal: ${arr}`);

//Method 3 : Remove by value
function removeByValue(arr , value){
   return arr.filter( item => item != value);
}
const fruits = ['cherry','apple','greaps','kiwi','banana'];
console.log("Original array: ",fruits);
console.log(removeByValue(fruits,'kiwi'));

//Method 4 : Remove first occurrence using slice() method
function removeFirstOccurrence(arr,val){
const index = arr.indexOf(val);
if(index >-1){
    return[...arr.slice(0,index),...arr.slice(index + 1)];
}
return arr;
}
const fruit2 = ['cherry','banana','apple','greaps','kiwi','banana'];
console.log("Array before removal of first occurence of 'banana' :",fruit2);
console.log("Array after removal: ");
console.log(removeFirstOccurrence(fruit2,"banana"));
//2.   Merging Array
//Method 1: Using concat()
//Method 2: spread operator
//Method 3: Using multiple Array


//3. Removing Duplicates
//Method 1: Using set
//Method 2: Using filter()
//Method 3: Using reduce()

//4 .Sorting Array
//Numeric sorting(array)
//Reverse Order sorting
//String sorting(alphabetical)
//case-insensitive sorting

//5. Sorting Object
//sort by property
//sort in ascending order(number)
//sort by name
