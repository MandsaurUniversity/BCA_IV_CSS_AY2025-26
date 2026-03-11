    //Method 2 : using string methods to do substring operatins{ Capitalize Letter of a String}\

    //Method 2.1 : Using a FUNCTION
    function capitalizeFirstChar(str){
        if (str.length ===0)
            return str;
        return str[0].toUpperCase() +str.slice(1); // rest of string
    }
    //output
    console.log(`Capitalizing 'javascript' : ${capitalizeFirstChar('javascript')}`);

    //Method 2.2 : Making it more concise using Arrow function.....
     const cap =(str) =>  str[0].toUpperCase() + str.slice(1);
     
     console.log(`Capitalizing 'divya' : ${cap('divya')}`);

     //Method 2.3 : Capitalize all the words (also known as Tital Case)
      console.log("Method 2.3 : Capitalize all the words (also known as Tital Case)");
     function capitalizeAllWords(str){
        const newStr =str.split(" ").map(word=> word[0].toUpperCase()+ word.slice(1)).join(" ");
        return newStr;
     }
       
        console.log("String:'this is a string' ");
        console.log (capitalizeAllWords('this is a string'));     

        // Method 2.3.2 : Same using arrow function..
         console.log("Method 2.3 : Capitalize all the words using arow function");
         const capAllWord = str => str.split(" ").map( word =>word[0].toUpperCase()+ word.slice(1)).join(" ");
         const strToCap ="i am divya";
         console.log(" String:".strToCap);
         console.log(capitalizeAllWords(capAllWord(strToCap)));