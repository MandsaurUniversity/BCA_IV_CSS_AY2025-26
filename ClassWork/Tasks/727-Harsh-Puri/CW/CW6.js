console.log("Method : 3")


function isLinePal(str){
    let clean = str.toLowerCase();
    // clean = clean.replace(" ","");  // Removing Space ;

    let start =0; let end = clean.length-1;

    while(start <end){
        if(clean[start] !==  clean[end]){    
            
            if(clean[start] == " " ){
                    start++;
                continue; }
            else if (clean[end] === " "){
            end-- ;
            continue;
            }

        }
            
        if(clean[start] ===  clean[end]){
            start++;
            end--;
            continue;
        }   
        return false;
    }
    return true;
}
console.log( ` Is "A man a Plan a Canal Panama" is palindrome ? => ${isLinePal("A man a Plan a Canal Panama")}    `) ;
console.log( ` Is "Dac Cad ? => ${isLinePal("Dac Cad")}    `) ;
