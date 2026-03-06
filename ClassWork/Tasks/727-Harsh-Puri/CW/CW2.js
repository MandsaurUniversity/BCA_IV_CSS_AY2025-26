//Factorial Porogram BY RECUSRSION
function fact(num){
if(num == 0 || num == 1)return num;
return num*fact((num-1));
}
console.log("factorial by funtion calling: "+fact(5));
//Factorial Porogram BY Loop
let i=5,n=1;
while(i>0){
n= n*i;
i--;
}
console.log("Factorial by loop:"+n);