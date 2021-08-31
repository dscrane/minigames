/* 
   ***
   \o/
    |
   / \
*/

const hangedMan = {
    head: " o ",
    headLeft: "\\o",
    headFull: "\\o/",
    body: " | ",
    legLeft: "/",
    legs: "/ \\"
}

const phrase = "Once upon a time";
console.log(phrase.split(" "));

const skeletonPhrase = phrase.split(" ").map(word => {
        skeletonWord = word.split("").map(char => "_").join("")
        console.log(skeletonWord);
}).join(" ")

console.log(skeletonPhrase);