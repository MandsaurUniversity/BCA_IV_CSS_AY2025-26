//Methode converting first letter of string int uppercase
//Methode 1: 

//Ecpeccted output : 
    function upper(str){
    let arr=str.split("");
        let charcode = str.charCodeAt(0);
        
        if(charcode >= 97 || charcode >= 122   ){
        let upper = charcode-32;
        let firsletter = String.fromCharCode(upper)
        arr[0]=firsletter;
        return arr = arr.join('');
            
        } else 
            console.log("already ascii");
    return false;

    }
    console.log(upper("apple"));