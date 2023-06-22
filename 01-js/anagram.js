/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {

    let n1 = str1.length;

    let n2 = str2.length;

    //create a frequency array
    var freq = new Array(26).fill(0)

    for(var i = 0 ; i < str1.length ; i++) {
        freq[str1.charAt(i) - 'a'.charCodeAt(0)]++;
    }

}


var str = 'a';
var charCode = str.charCodeAt(0);
console.log(charCode);

