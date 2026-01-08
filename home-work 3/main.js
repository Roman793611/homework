let result = 5 + 5 + '5';
console.log(result);          
console.log(typeof result);   


let email = "example@gmail.com";

let hasAtSymbol = email.includes('@');
let emailLength = email.length;

console.log(hasAtSymbol);     
console.log(emailLength);     



let word1 = "My";
let word2 = "name";
let word3 = "is";

let fullName = `${word1} ${word2} ${word3}`;
fullName += " Viktor";

console.log(fullName);        



let userName = "Roman";
let payment = 300;

alert(`Дякуємо, ${userName}! До сплати ${payment} гривень`);
