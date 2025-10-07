//src/javascriptPrac/02-Practice.js

// 🟢 JavaScript Data Types
// 1. Primitive Types

// 👉 এগুলো হলো সরাসরি ভ্যালু ধারণ করে এমন ডেটা।
// (এগুলোর value copy হয়, reference হয় না)

// a) Number
let price = 250;
let pi = 3.1416;
console.log(`${price}, ${pi}`); //Output: 250, 3.1416

//b) String
let lastName = "Ali Akber";
let message = "Hello World";
console.log(lastName, message); // Ali Akber Hello World

// c) Boolean
let isLoggedIn = true;
let hasPermission = false;
console.log(isLoggedIn, hasPermission); // true false

//d) Undefined
// 👉 যেই ভেরিয়েবল ডিক্লেয়ার হয়েছে কিন্তু value দেয়া হয়নি।
let username;
console.log(username); // undefined

// e) Null
// 👉 কোনো ভেরিয়েবলের মধ্যে খালি/অস্তিত্বহীন ভ্যালু ইচ্ছাকৃতভাবে রাখা।
let user = null;
console.log(user); // null

//f) Symbol (Unique identity তৈরি করে)
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false (unique)

//g) BigInt (খুব বড় সংখ্যা handle করার জন্য)
let bigNumber = 1234567890123456789012345678901234567890n;
console.log(bigNumber); // 1234567890123456789012345678901234567890n

// _________________________________________________________________

// 2. Reference Types
// 👉 এগুলো object আকারে মেমোরিতে থাকে। (value না, reference/pass by reference হয়)
//a) Object
let person = { name: "Ali", age: 25 };
console.log(person); // { name: 'Ali', age: 25 }
console.log(person.name); // Ali

//b) Array
let numbers = [10, 20, 30];
console.log(numbers); // [10, 20, 30]
console.log(numbers[1]); // 20

//c) Function
function greet() {
  return "Hello!";
}
console.log(greet()); // Hello!

// _____________________________________________________________

//🟡 Key Difference:
// Primitive → Copy হয়।
// Reference → Reference/Pointer হয়।

let a = 10;
let b = a;
b = 20;
console.log(a, b); // 10, 20 (Primitive → copy)

let obj1 = { name: "Ali" };
let obj2 = obj1;
obj2.name = "Mehedi";
console.log(obj1.name, obj2.name); // Mehedi, Mehedi (Reference → same place)

// _____________________________________________________________

// 📝 Practice Task:
// 👉 Step 1: Primitive Example
let m = 50;
let n = 20;
let o = m + 100;
o = 90;

console.log("m =", m);
console.log("n =", n);
console.log("o =", o);

//👉 Step 2: Reference Example (Object)
let person1 = { name: "Ali" };
let person2 = person1; // copy of reference (same memory address)

person2.name = "Mehedi";

console.log("person1.name =", person1.name); // ?
console.log("person2.name =", person2.name); // ?

//Another Exmaple
let person7 = { name: "Ali Akber", age: 26 };
let person8 = person7;

person8.name = "Mehedi Hasan";

console.log("person7: ", person7);
console.log("person8: ", person8);

//👉 Step 3: Reference Example (Array)

let arr1 = [1, 2, 3];
let arr2 = arr1; // same reference

arr2.push(4);

console.log("arr1 =", arr1); // ?
console.log("arr2 =", arr2); // ?

//my Example
let arr5 = [1, 2, 3, 4, 5];
let arr6 = arr5;

arr6.push(90, 78);
arr6[4] = 10,
arr6.pop()

console.log("Testing_____________");
console.log(arr5);
console.log(arr6);
