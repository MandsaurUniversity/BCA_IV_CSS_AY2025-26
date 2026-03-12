    //Experiment 16 : to replace characters in String 
    // Method 1 
    console.log("-- Method 1 --")
    function substitute_str(str,key,rep){
        let word = str.split("")

        for(let i =0; i<word.length;i++)
            if(word[i] == key) word[i] = rep


        return word.join("");
    }
    let str = "Buns And Roses"
    console.log( `${str} word latter replace  :  ${substitute_str(str , 'B' , 'G')}`)

    // Method 2 
    console.log("-- Method 2 --")
    function replace(str , key ,rep ){

        return   str.split(key).join(rep)

    }
    let str2 = "Bat and Ball"
    console.log( `${str} word latter replace  :  ${replace(str2 ,  'a' , 'o')}`)

    //Mehtod 3 : line replacement
    console.log("-- Method 3 --")
    function Line_replace(Line , key , rep ){
        let result = "";
        for (let i = 0; i < key.length; i++){
            Line = Line.split(key[i]).join(rep);
            console.log(Line);
        }

        // for(let i = 0 ; i < result.length -1 ;i++) {
        //     for(let j = 0 ; j<key.length-1 ; j++)
        // result = substitute_str(result[i] , key[j], rep);

        // }
        for(let i =0; i< result.length ; i++){
            result[i] = substitute_str(result[i], key[i], rep);
        }

   console.log(result);
        return  result;
    }
    let Line = "Abusive Words"
    console.log( `${Line} word latter replace  :  ${Line_replace(Line , ['a', 'e' , 'i' ,'o', 'u'] , '*')}`)