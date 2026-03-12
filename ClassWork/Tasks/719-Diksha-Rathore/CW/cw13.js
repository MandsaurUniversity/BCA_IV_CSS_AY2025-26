console.log("Method-4: Palindrome check without regex");

// function
function isPalindromeWithSpaces(str){

    let lowered = str.toLowerCase();
    let withoutSpaces = "";

    // remove spaces
    for(let i = 0; i < lowered.length; i++){
        if(lowered[i] !== " "){
            withoutSpaces += lowered[i];
        }
    }

    // two pointer method
    let start = 0;
    let end = withoutSpaces.length - 1;

    while(start < end){
        if(withoutSpaces[start] !== withoutSpaces[end]){
            return false;
        }

        start++;
        end--;
    }

    return true;
}

// testing
let check = "Madam";
console.log(`${check} a palindrome? : ${isPalindromeWithSpaces(check)}`);

console.log(`A man a plan a canal Panama : ${isPalindromeWithSpaces("A man a plan a canal Panama")}`);