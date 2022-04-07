var reverseString = function (str) {
    return str.split('').reverse().join('');
};
var uniqueCharacters = function (str) {
    return str
        .split('')
        .filter(function (char, index, arr) { return arr.indexOf(char) === index; })
        .join('');
};
var countEachUniqueCharacter = function (str) {
    var charMap = new Map();
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        if (charMap[char]) {
            charMap[char]++;
        }
        else {
            charMap[char] = 1;
        }
    }
    return JSON.stringify(charMap);
};
export { reverseString, uniqueCharacters, countEachUniqueCharacter };
