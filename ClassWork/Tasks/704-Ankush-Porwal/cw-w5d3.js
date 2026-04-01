// File Extension Operations

// Getting File Extensions
const filename = "some-doc-c.pdf";
const parts = filename.split(".");
console.log("File name:",filename,",parts:",parts);
const extension = parts[parts.length-1];
console.log("File Extensions:",extension);

// Another way to determine file extensions...(more efficient way)
// create a function first...
function getfileextension(fn){
    console.log("fn",fn);
    console.log(fn.lastIndexOf("."));
    return fn.substring(fn.lastIndexOf(".") + 1).toLowerCase();
}
console.log("Using Function...");
console.log(getfileextension(filename));