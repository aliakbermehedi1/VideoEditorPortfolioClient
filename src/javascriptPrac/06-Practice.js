//src/javascriptPrac/05-Practice.js

// 🟢 JavaScript Functions
// 🚀 আমরা এখন পর্যন্ত শিখেছি:
// 1. Variables (let, const)
// 2. Data types
// 3. Operators
// 4. Conditionals (if-else, switch, ternary)
// 5. Loops (for, while, do-while, for…of, for…in)
// 👉 এখন সময় এসেছে Functions শেখার।
// কারণ function হলো JavaScript-এর হৃদপিণ্ড ❤️।
// _________________________________________________________
// _________________________________________________________

// 🔑 Functions নিয়ে আমরা কী কী শিখবো:
// Function Declaration (basic function বানানো)
// Function Expression (variable এ function assign করা)
// Arrow Function (ES6)
// Parameters vs Arguments
// Default Parameters
// Return Statement
// Real-life examples (Calculator, Discount price ইত্যাদি)

// ১) Function Declaration (classic)
programmer("Pabel");

function programmer(name) {
  console.log("Hello " + name);
}

programmer("Ali Akber Mehedi");

// ব্যাখ্যা: function fname(...) {} — এইভাবে ডিক্লেয়ার করলে hoisting থাকে (উপরেও কল করা যায়)। রিয়েল-লাইফ: গ্রিটিং মেসেজ পাঠানো।

// ২) Function Expression
// programmerName("Ms. Jolie"); //Wrong
const programmerName = function (name) {
  console.log("Hi " + name);
};

programmerName("Jolie");

// ব্যাখ্যা: এখানে ফাংশন ভ্যারিয়েবলের মত আচরণ করে—hoisting নেই। রিয়েল-লাইফ: UI-এ event handler হিসেবে ব্যবহার করা।

// ৩) Arrow Function (ES6+)
const sub = (a, b) => a - b;

console.log(sub(10, 7));

// Multi-line arrow
const fullName = (first, last) => {
  const name = first + " " + last;
  return name.toUpperCase();
};

console.log(fullName("Ali", "Akber"));

// ৪) Parameters vs Arguments, Default Parameters
function welcome(name = "Guest", role = "User") {
  console.log(`Welcome ${name} (${role})`);
}

welcome("Mehedi", "Admin"); // Welcome Mehedi (Admin)
welcome(); // Welcome Guest (User)

// ৫) Return statement (value ফেরত দেওয়া)
function multiply(a, b) {
  return a * b;
}

const total = multiply(10, 3);

console.log("Total: ", total);

// রিয়েল-লাইফ: calculator function, price * quantity → order subtotal।

function calculator(price, quantity) {
  return price * quantity;
}

const subTotal = calculator(200, 3);

console.log("Sub Total: ", subTotal);

// ৬) Rest parameters ও Spread (variable args)
// rest -> function multiple args নিতে পারে
function sum(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// spread -> arrayকে arguments হিসেবে পাঠানো
const arr = [5, 6, 7];
console.log(sum(...arr)); // 18

// রিয়েল-লাইফ: shopping cart এর সব আইটেমের প্রাইস যোগ করা।
function itemPrice(...prices) {
  return prices.reduce((a, b) => a + b, 0);
}

const array = [120, 78, 80, 90, 300];

console.log(itemPrice(...array));

// ৭) Higher-order functions (function as arg / return)

// a) function as argument (callback)
function multiplyNumber(arr, fn) {
  let res = [];
  for (let number of arr) {
    res.push(fn(number));
  }
  return res;
}

const allNumbers = [5, 8, 10, 13, 19, 20, 30, 40, 99];

console.log(
  "Total: ",
  multiplyNumber(allNumbers, (n) => n * 10)
);

// b) function returning function (factory)
function discountfactory(rate) {
  return function price(price) {
    return price - price * rate;
  };
}

const tenPercent = discountfactory(0.1);

console.log(tenPercent(2000));

const fourtyPercent = discountfactory(0.4);

console.log(fourtyPercent(1000));

console.log(
  "_________________________________________________________________"
);
console.log(
  "_________________________________________________________________"
);

// function taxFactory(rate) {
//   return function price(price) {
//     return price + price * rate;
//   };
// }

// const fivePercentTax = taxFactory(0.05);
// const fifteenPercentTax = taxFactory(0.15);

// console.log("5 % Tax: ", fivePercentTax(1000));
// console.log("15 % Tax: ", fifteenPercentTax(1000));

// function applyToItems(arr, fn) {
//   const res = [];
//   for (let item of arr) {
//     res.push(fn(item));
//   }
//   return res;
// }

// console.log(applyToItems([100, 200, 300], fivePercentTax));
// console.log(applyToItems([100, 200, 300], fifteenPercentTax));

console.log(
  "_________________________________________________________________"
);
console.log(
  "_________________________________________________________________"
);

// Discount + Tax Calculator
function discountFactory(rate) {
  return function price(price) {
    return price - price * rate;
  };
}

function taxFactory(tax) {
  return function price(price) {
    return price + price * tax;
  };
}

const tenPercentOff = discountFactory(0.1);
const fivePercentTax = taxFactory(0.05);

function applyPipeline(price, fns) {
  let result = price;
  for (let fn of fns) {
    result = fn(result);
  }
  return result;
}

console.log(applyPipeline(1000, [tenPercentOff, fivePercentTax]));

// রিয়েল-লাইফ: cart items-এ discount apply করা; middleware pattern।
const prices = [100, 200, 300, 400];

function discountPrice(disc) {
  return function priceDis(price) {
    return price - price * disc;
  };
}

function taxPrice(tax) {
  return function pricetx(price) {
    return price + price * tax;
  };
}

const tenPercentDiscount = discountPrice(0.1);
const fifteenPercentTax = taxPrice(0.15);

function applyPipelinefn(price, fns) {
  let result = price;
  for (let fn of fns) {
    result = fn(result);
  }
  return result;
}

console.log("_________HERE_________");

console.log(applyPipelinefn(100, [tenPercentDiscount, fifteenPercentTax]));

console.log("_________HERE_________");

function applyPipelineToAll(arr, fns) {
  let newArr = [];
  for (let price of arr) {
    newArr.push(applyPipelinefn(price, fns));
  }
  return newArr;
}

console.log("Cart Items Price After Discount & Tax");
console.log("Cart Items Price After Discount & Tax");

console.log(
  applyPipelineToAll(prices, [tenPercentDiscount, fifteenPercentTax])
);

console.log("_________HERE-START_________");
console.log(
  applyPipelineToAll(
    [100, 200, 300, 400],
    [tenPercentDiscount, fifteenPercentTax]
  )
);
console.log("_________HERE-START_________");
console.log("_________HERE-START_________");

// ৮) Callbacks vs Promises (quick note)
function getData(callback) {
  setTimeout(() => {
    callback("ডেটা আসলো ✅");
  }, 1000);
}

getData((result) => {
  console.log(result);
});

console.log("_________CLOSER_________");
// ৯) Closure (state রাখার সহজ উপায়)

function createCounterr() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounterr();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

function increment() {
  let num = 0;
  return function () {
    num += 1;
    return num;
  };
}

const incrementCounter = increment();

console.log(incrementCounter());
console.log(incrementCounter());
console.log(incrementCounter());



// ১০) Practical mini-examples (real life)
// a) Cart total + tax
function cartTotal(prices, taxRate = 0.05) {
  const subtotal = prices.reduce((s, p) => s + p, 0);
  const tax = subtotal * taxRate;
  return { subtotal, tax, total: subtotal + tax };
}

console.log(cartTotal([250, 500, 150])); 
// { subtotal: 900, tax: 45, total: 945 }


// b) Format user display (with default)
const formatUser = ({name="Guest", age=null, role="User"} = {}) => {
  return `${name} • ${role} ${age ? `• ${age}yrs` : ""}`;
};
console.log(formatUser({name:"Ali", role:"Admin", age:26}));
// Ali • Admin • 26yrs
