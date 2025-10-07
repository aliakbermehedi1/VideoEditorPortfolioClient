//src/javascriptPrac/03-Practice.js

// 🟢 JavaScript Operators

// 🟢 1. Arithmetic Operators (গণিতের হিসাব করার জন্য)
// let x = 10;
// let y = 3;

// console.log("Addition:", x + y); // 13
// console.log("Subtraction:", x - y); // 7
// console.log("Multiplication:", x * y); // 30
// console.log("Division:", x / y); // 3.333..
// console.log("Modulus:", x % y); // 1 (ভাগশেষ)
// console.log("Exponent:", x ** y); // 1000 (10^3) ------> (10*10*10) = 1000

// 🟢 2. Assignment Operators (মান সেট করার জন্য)
// let a = 5;

// a += 2; // a = a + 2
// console.log("a =", a); // 7

// a *= 3; // a = a * 3
// console.log("a =", a); // 21

// 🟢 3. Comparison Operators (==, ===, >, < …)
// let num1 = 10;
// let num2 = "10";

// console.log(num1 == num2); // true (শুধু value check করে)
// console.log(num1 === num2); // false (value + type check করে)

// console.log(num1 > 5); // true
// console.log(num1 < 5); // false

// 🟢 4. Logical Operators (&&, ||, !)

// let isAdult = true;
// let hasID = false;

// console.log(isAdult && hasID); // false (দুটোই true হতে হবে)
// console.log(isAdult || hasID); // true (একটা true হলেও হবে)
// console.log(!isAdult); // false (উল্টে দিবে)

// 🟡 Practice Task
// 1. p = 20, q = 6 দিয়ে সব Arithmetic operators দেখাও।
let p = 20;
let q = 6;

console.log("Addition: ", p + q);
console.log("Subtraction: ", p - q);
console.log("Multiplication: ", p * q);
console.log("Division: ", p / q);
console.log("Modulus: ", p % q);
console.log("Exponent: ", p ** q);

// 2. r = 15, এর সাথে Assignment operators (+=, -=, *=, /=) প্র্যাকটিস করো।

let r = 15;
console.log((r += 2)); //r = r+2 or r = 15+2
console.log((r -= 2)); //r = r-2 or r = 15-2
console.log((r *= 2)); //r = r*2 or r = 15*2

// 3. Comparison operator দিয়ে 100 আর "100" compare করো। (==, ===, >, < …)

let k = 100;
let l = "100";

console.log("k == l :", k == l); //true
console.log("k === l :", k === l); //false
console.log("k > 60 :", k > 60); //true
console.log("k < 60 :", k < 60); //false

//4. Logical operator দিয়ে check করো –

let isLoggedIn = true;
let hasPermission = true;

if (isLoggedIn && hasPermission) {
  console.log("Access Granted");
} else {
  console.log("Access Denied");
}

