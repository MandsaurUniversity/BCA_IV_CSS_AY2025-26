// 1. Removing elements from array
// method 1 : using filter non destructive method
console.log("Method 1 : ");
const numbers =[1,5,9,3,8,34,87,54];
console.log(" " + numbers);
let remove = 8;
function removeByValue (arr,value){
    return arr.filter(element=>element!=value);
}
let removed = removeByValue(numbers,remove);
console.log(" " + removed);

// Method 2:  splice destructive method
console.log("\nMethod 2 : ");
const numbers1 =[1,5,9,3,8,34,87,54];
console.log(" " + numbers1);
remove = 4;
numbers1.splice(remove,1);
console.log(" " + numbers1);

//Method 3: remove by value
console.log("\nMethod 3 : ");
const fruits = [''];

//3. Removing duplicates
const nums =[7,9,1,2,3,3,4,5,6,7,7,6,8,3,2,9];
//  Method one using Set
const uniqueSet = new Set(nums);
const uniqueArr = [...uniqueSet];
console.log(" Original Array : ",nums);
console.log(" Array with only unique values : ",uniqueArr);
// Combining the above two lines into one line
const unique = [...new Set(nums)];
console.log("Unique Values : ",unique);

const fruitSet = new Set (["Banana"," mango","Apple","guava","strawberry","kiwi","grapes"]);
console.log(typeof(fruitSet));
console.log(fruitSet[2]);
for(const fruit of fruitSet){
    console.log(fruit);
}

console.log("Using forEach...");
fruitSet.forEach((f)=>{
    console.log(f);
})

console.log("--------------");
console.log();


//Method 3 : Using reudce()
const uniqueUsingReduce = nums.reduce((acc,num)=> {
    if(!acc.includes(num)){
        acc.push(num);
    }
    return acc;
},[]);
console.log(uniqueUsingReduce);