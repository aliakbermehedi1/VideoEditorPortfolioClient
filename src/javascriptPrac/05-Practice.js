//src/javascriptPrac/05-Practice.js

// 🟢 JavaScript Loops

// ৪ ধরনের loop শিখবে (ধাপে ধাপে):
// 1. for loop → নির্দিষ্ট সংখ্যা পর্যন্ত repeat করার জন্য।
// 2. while loop → কোনো condition true থাকা পর্যন্ত repeat করার জন্য।
// 3. do…while loop → অন্তত একবার চলবেই, তারপর condition চেক হবে।
// 4. for…of এবং for…in → array এবং object এর ওপর loop চালানোর জন্য।

// Q1: for loop দিয়ে ১ থেকে ১০ পর্যন্ত সংখ্যা প্রিন্ট করো।
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
console.log("_________________________________");

// Q2: while loop দিয়ে ১ থেকে ৫ পর্যন্ত সংখ্যা প্রিন্ট করো।
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}

console.log("_________________________________");

// Q3: do…while দিয়ে ১ থেকে ৩ পর্যন্ত প্রিন্ট করো।
let j = 1;
do {
  console.log(j);
  j++;
} while (j <= 3);

console.log("_________________________________");

// Q4: for…of দিয়ে array এর প্রতিটি element প্রিন্ট করো।
let fruits = ["apple", "banana", "mango"];
for (let fruit of fruits) {
  console.log(fruit);
}

console.log("_________________________________");

// Q5: for…in দিয়ে object এর key এবং value প্রিন্ট করো।
let person = { name: "Ali", age: 25, city: "Dhaka" };
for (let key in person) {
  console.log(key, ":", person[key]);
}

let tasteMark = { awesome: "80", good: "60", okey: "50" };

for (let taste in tasteMark) {
  console.log(taste, ":", tasteMark[taste]);
}

console.log("_________________________________");
console.log("_________________________________");
console.log("_________________________________");
console.log("_________________________________");

// 📝 Practice Task:

// Task 1:
// তুমি একটা array বানাবে (students) যেখানে কয়েকজন ছাত্রের নাম থাকবে। for…of দিয়ে একে একে সব নাম প্রিন্ট করবে।

let students = ["Mehedi", "Pavel", "Rafi", "Fahim", "Fokhor"];

for (let nameofStudent of students) {
  console.log("Name: ", nameofStudent);
}

// Task 2:
// তুমি একটা object বানাবে (product) যেখানে থাকবে productName, price, quantity, location. for…in দিয়ে সব key আর value প্রিন্ট করবে।

let product = {
  productName: "Pen",
  price: 10,
  quantity: 200,
  location: "Dhaka",
};

for (let keyofproduct in product) {
  console.log(keyofproduct, ": ", product[keyofproduct]);
}

console.log("_________________________________");
