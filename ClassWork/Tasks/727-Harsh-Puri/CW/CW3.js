//Arrays and It's Fucntions
const arr=[70,30,10,46,90,60];
console.log("orignaal array: "+arr);
arr[2]=10;
//pushing elemnet 
arr.push(90);
console.log("After pushing 90 in array: "+arr);
//poping from last elemnet POP() 
arr.pop();
console.log("After Poping  in array: "+arr);
//pop elemnet from first shift
arr.shift();
console.log("After poping first element in array: "+arr);
//unshift elemnet 
arr.unshift(70);
console.log("After unshift  in array: "+arr);
//Index of 
// arr.indexOf(70);
console.log("indexx of 70  in array: "+arr.indexOf(70));
//using sort methode to sort array
console.log("Array Before Sort: "+arr);
// let desc= arr.sort( (a,b)=> {
// if(a<b)return 1;
// else if(a == b) return 0;
// else{
// return -1;
// }

// } );
// console.log("Array After Desc Sort: "+desc);
// // let Assce= arr.sort( (a,b)=> {
// // if(a<b)return -1;
// // else if(a == b) return 0;
// // else{
// // return 1;
// // }

// // } );

// console.log("Array After Assc Sort: "+Assce);

// Can try wi t turnery tooo
let Assce= arr.sort( (a,b)=>(a-b));

let desc= arr.sort( (a,b)=>(b-a));
console.log("Array After Assc Sort: "+Assce);
console.log("Array After Desc Sort: "+desc);