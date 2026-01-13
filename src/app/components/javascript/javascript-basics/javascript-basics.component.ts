import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-javascript-basics',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './javascript-basics.component.html',
  styleUrl: './javascript-basics.component.scss'
})
export class JavascriptBasicsComponent {
  variables = `Variables in JavaScript

// var - function-scoped, hoisted (avoid)
var oldWay = "old";

// let - block-scoped, can be reassigned
let age = 25;
age = 26;  // OK

// const - block-scoped, cannot be reassigned
const name = "John";
// name = "Jane";  // Error

// const with objects (reference is const, not content)
const person = { name: "John" };
person.name = "Jane";  // OK
person.age = 30;       // OK
// person = {};        // Error

// Variable naming
let firstName = "John";     // camelCase (preferred)
let first_name = "John";    // snake_case
let FirstName = "John";     // PascalCase (for classes)

// Valid identifiers
let $jquery = "value";
let _private = "value";
let name123 = "value";`;

  dataTypes = `Data Types in JavaScript

// Primitive Types
let str = "Hello";           // String
let num = 42;                // Number
let bool = true;             // Boolean
let nothing = null;          // Null
let notDefined = undefined;  // Undefined
let sym = Symbol("id");      // Symbol
let big = 12345678901234567890n;  // BigInt

// typeof operator
console.log(typeof str);      // "string"
console.log(typeof num);      // "number"
console.log(typeof bool);     // "boolean"
console.log(typeof nothing);  // "object" (JS quirk)
console.log(typeof notDefined);  // "undefined"
console.log(typeof sym);      // "symbol"

// Reference Types
let arr = [1, 2, 3];         // Array
let obj = { name: "John" };  // Object
let func = function() {};    // Function

// Type Conversion
String(123);        // "123"
Number("123");      // 123
Boolean(1);         // true
parseInt("123");    // 123
parseFloat("12.5"); // 12.5`;

  operators = `Operators in JavaScript

// Arithmetic Operators
let a = 10, b = 3;
console.log(a + b);  // 13 - Addition
console.log(a - b);  // 7  - Subtraction
console.log(a * b);  // 30 - Multiplication
console.log(a / b);  // 3.333... - Division
console.log(a % b);  // 1  - Modulus (remainder)
console.log(a ** b); // 1000 - Exponentiation

// Increment/Decrement
let x = 5;
x++;  // 6 - Post-increment
++x;  // 7 - Pre-increment
x--;  // 6 - Post-decrement
--x;  // 5 - Pre-decrement

// Assignment Operators
let y = 10;
y += 5;  // y = y + 5
y -= 3;  // y = y - 3
y *= 2;  // y = y * 2
y /= 4;  // y = y / 4

// Comparison Operators
console.log(5 == "5");   // true  - Loose equality
console.log(5 === "5");  // false - Strict equality
console.log(5 != "5");   // false - Loose inequality
console.log(5 !== "5");  // true  - Strict inequality
console.log(5 > 3);      // true
console.log(5 < 3);      // false

// Logical Operators
console.log(true && false);  // false - AND
console.log(true || false);  // true  - OR
console.log(!true);          // false - NOT

// Ternary Operator
let age = 18;
let status = age >= 18 ? "adult" : "minor";`;

  controlFlow = `Control Flow Statements

// If-Else
let age = 20;
if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}

// Switch Statement
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("End of week");
    break;
  default:
    console.log("Middle of week");
}

// For Loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While Loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// Do-While Loop
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// For...of (iterate over values)
let numbers = [1, 2, 3];
for (let num of numbers) {
  console.log(num);
}

// For...in (iterate over keys)
let person = { name: "John", age: 30 };
for (let key in person) {
  console.log(key, person[key]);
}

// Break and Continue
for (let i = 0; i < 10; i++) {
  if (i === 5) break;     // Exit loop
  if (i === 3) continue;  // Skip iteration
  console.log(i);
}`;

  functions = `Functions in JavaScript

// Function Declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function Expression
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow Functions
const greet = (name) => \`Hello, \${name}!\`;

// With single parameter (parentheses optional)
const square = x => x * x;

// Multiple parameters
const add = (a, b) => a + b;

// Multiple statements
const calculate = (a, b) => {
  let sum = a + b;
  return sum * 2;
};

// Default Parameters
function greet(name = "Guest") {
  return \`Hello, \${name}!\`;
}

// Rest Parameters
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3, 4));  // 10

// IIFE (Immediately Invoked Function Expression)
(function() {
  console.log("IIFE executed");
})();

// Higher-Order Functions
function operate(a, b, operation) {
  return operation(a, b);
}

const result = operate(5, 3, (x, y) => x + y);`;

  arrays = `Arrays in JavaScript

// Creating Arrays
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "two", true, null];
let empty = [];
let created = new Array(3);  // [empty × 3]

// Accessing Elements
console.log(numbers[0]);     // 1
console.log(numbers.length); // 5

// Adding Elements
numbers.push(6);           // Add to end
numbers.unshift(0);        // Add to start

// Removing Elements
numbers.pop();             // Remove from end
numbers.shift();           // Remove from start
numbers.splice(2, 1);      // Remove at index

// Array Methods
let arr = [1, 2, 3, 4, 5];

// map - Transform elements
let doubled = arr.map(x => x * 2);  // [2, 4, 6, 8, 10]

// filter - Filter elements
let evens = arr.filter(x => x % 2 === 0);  // [2, 4]

// reduce - Reduce to single value
let sum = arr.reduce((acc, x) => acc + x, 0);  // 15

// find - Find first match
let found = arr.find(x => x > 3);  // 4

// forEach - Iterate
arr.forEach(x => console.log(x));

// some - Check if any match
let hasEven = arr.some(x => x % 2 === 0);  // true

// every - Check if all match
let allPositive = arr.every(x => x > 0);  // true

// includes - Check if contains
let hasThree = arr.includes(3);  // true

// Spread Operator
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = [...arr1, ...arr2];  // [1, 2, 3, 4]`;

  objects = `Objects in JavaScript

// Creating Objects
let person = {
  name: "John",
  age: 30,
  greet: function() {
    return \`Hello, I'm \${this.name}\`;
  }
};

// Accessing Properties
console.log(person.name);        // Dot notation
console.log(person["age"]);      // Bracket notation

// Adding/Modifying Properties
person.email = "john@example.com";
person.age = 31;

// Deleting Properties
delete person.age;

// Object Methods
let user = {
  name: "John",
  age: 30
};

// Get keys
console.log(Object.keys(user));    // ["name", "age"]

// Get values
console.log(Object.values(user));  // ["John", 30]

// Get entries
console.log(Object.entries(user)); // [["name", "John"], ["age", 30]]

// Object.assign() - Copy properties
let copy = Object.assign({}, user);

// Spread operator
let copy2 = { ...user };

// Destructuring
let { name, age } = person;
console.log(name);  // "John"

// Nested objects
let employee = {
  name: "John",
  address: {
    city: "New York",
    zip: "10001"
  }
};

console.log(employee.address.city);

// Optional Chaining
console.log(employee.address?.city);
console.log(employee.phone?.number);  // undefined (no error)`;
}
