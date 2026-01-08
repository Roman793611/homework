
let celsius = 25;
let fahrenheit = celsius * 9 / 5 + 32;
console.log("Температура у Фаренгейтах:", fahrenheit);

let daysInMonth = 30;
let hoursInMonth = daysInMonth * 24;
let minutesInMonth = hoursInMonth * 60;
console.log("Годин у місяці:", hoursInMonth);
console.log("Хвилин у місяці:", minutesInMonth);

let health = 100;
let energy = 80;
health = health - 20;
energy = energy - 15;
console.log("Рівень здоров'я:", health);
console.log("Рівень енергії:", energy);

let totalPrice = 1000;
let discount = 0.10;
let discountedPrice = totalPrice * (1 - discount);
console.log("Ціна зі знижкою:", discountedPrice);

const floatNumber = 12.78;
let roundedDown = Math.floor(floatNumber);
console.log("Округлене число:", roundedDown);

const floatString = "45.67";
let parsedFloat = parseFloat(floatString);
console.log("Десяткове число:", parsedFloat);

const intString = "123";
let parsedInt = parseInt(intString);
console.log("Ціле число:", parsedInt);

let number = 81;
let sqrtNumber = Math.sqrt(number);
console.log("Квадратний корінь:", sqrtNumber);

const integer = 42;
const stringNumber = "256";

let convertedInt = parseInt(stringNumber);
console.log("Перетворений у число:", convertedInt);

let convertedString = integer.toString();
console.log("Перетворений у рядок:", convertedString);
