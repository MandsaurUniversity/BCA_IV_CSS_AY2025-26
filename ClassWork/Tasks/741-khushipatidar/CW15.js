// program to Reverse a String
// Method 1 : Manual Backward loop( without using any build-ins)
var str ="hello";
var rev ="";
for (var i = str.length -1;i>=0;i--){
    rev = rev + str[i];
}
console.log("original string :"+ str);
console.log("reversed string :"+ rev);