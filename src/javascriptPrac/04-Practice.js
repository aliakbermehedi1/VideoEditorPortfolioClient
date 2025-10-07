//src/javascriptPrac/04-Practice.js

// 🟢 Practice – 4: Conditionals

//📝 Practice Task for You

// 1. num = 10 → even না odd সেটা check করো (if-else দিয়ে)।
let num = 10;

if (num % 2 === 0) {
  console.log("Even Number");
} else {
  console.log("Odd Number");
}

// 2. score = 55 → grade বের করো (A, B, C, F) (if-else if দিয়ে)।
let score = 55;

if (score >= 80) {
  console.log("Grade A+");
} else if (score >= 60) {
  console.log("Grade B");
} else if (score >= 50) {
  console.log("Grade C");
} else {
  console.log("F");
}

// 3. day = 6 → কোন দিন সেটা বের করো (switch দিয়ে)।

let day = 6;

switch (day) {
  case 1:
    console.log("Saturday");
    break;

  case 2:
    console.log("Sunday");
    break;

  case 3:
    console.log("Monday");
    break;

  case 4:
    console.log("Tuesday");
    break;

  case 5:
    console.log("Wednesday");
    break;

  case 6:
    console.log("Thursday");
    break;

  case 7:
    console.log("Friday");
    break;

  default:
    console.log("Invalid Day");
}

// 4. isLoggedIn = false → টার্নারি অপারেটর ব্যবহার করে Welcome User! অথবা Please Login! দেখাও।

let isLoggedIn = false;

console.log(isLoggedIn ? "Welcome User!" : "Please Login!");
