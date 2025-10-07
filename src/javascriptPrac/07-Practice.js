// ১২) Practice tasks

console.log("____READY FOR PRAC____");

// 1. লিখো calculateCartTotal(items) — যেখানে items array of objects {price, qty} এবং function {subtotal, tax, total} রিটার্ন করবে।
function calculateCartTotal(items, taxrate = 0.1) {
  const subTotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subTotal * taxrate;

  const total = subTotal + tax;

  return { subTotal, tax, total: total };
}

// Example usage:
const items = [
  { price: 100, qty: 2 },
  { price: 50, qty: 3 },
  { price: 500, qty: 50 },
];

console.log(calculateCartTotal(items));

// 2. লিখো capitalizeWords(str) — একটা sentence নেবে এবং প্রত্যেক শব্দের প্রথম অক্ষর বড় করে রিটার্ন করবে।
console.log("________capitalizeWords________");
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const sentence = "my Name is ali akber Mehedi";

console.log(capitalizeWords(sentence));

console.log("________array filter________");
// 3. লিখো filterExpensive(products, minPrice) — products array filter করবে price >= minPrice দিয়ে।

function filterExpensive(products, minPrice) {
  return products.filter((product) => product.price >= minPrice);
}

// Example usage
const products = [
  { name: "Laptop", price: 50000 },
  { name: "Phone", price: 15000 },
  { name: "Tablet", price: 25000 },
];

console.log(filterExpensive(products, 20000));

console.log("________make Id Generator________");
// 4. লিখো makeIdGenerator(prefix) — closure ব্যবহার করে unique id generate করবে: ID-1, ID-2,...

function makeIdGenerator(prefix) {
  let count = 0;

  return function () {
    count += 1;
    return `${prefix}-${count}`;
  };
}

const userID = makeIdGenerator("User");

console.log(userID());
console.log(userID());
console.log(userID());
console.log(userID());
