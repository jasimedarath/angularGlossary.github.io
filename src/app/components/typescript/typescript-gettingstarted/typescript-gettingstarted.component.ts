import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-typescript-gettingstarted',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './typescript-gettingstarted.component.html',
  styleUrl: './typescript-gettingstarted.component.scss'
})
export class TypescriptGettingstartedComponent {
  prerequisites = `Prerequisites for TypeScript

1. JavaScript Knowledge
   - ES6+ features
   - Functions and objects
   - Async/await
   - Modules

2. Development Environment
   - Node.js v14 or higher
   - npm or yarn
   - Code editor (VS Code recommended)

3. Check installations
   node --version
   npm --version`;

  installation = `Installing TypeScript

# Global Installation
npm install -g typescript

# Check version
tsc --version

# Project Installation
npm install --save-dev typescript

# Initialize TypeScript project
tsc --init

# This creates tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}`;

  basicTypes = `Basic Types in TypeScript

// Primitive Types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Array Types
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuple
let tuple: [string, number] = ["John", 30];

// Enum
enum Color {
  Red,
  Green,
  Blue
}
let color: Color = Color.Red;

// Any (avoid when possible)
let anything: any = "string";
anything = 42;

// Unknown (safer than any)
let userInput: unknown = "hello";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

// Void (for functions returning nothing)
function log(message: string): void {
  console.log(message);
}

// Never (for functions that never return)
function error(message: string): never {
  throw new Error(message);
}`;

  interfaces = `Interfaces and Type Aliases

// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional property
  readonly createdAt: Date;  // Readonly property
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  createdAt: new Date()
};

// Type Alias
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// Extending Interfaces
interface Employee extends User {
  department: string;
  salary: number;
}

// Intersection Types
type Admin = User & {
  permissions: string[];
};

// Union Types
type Status = "active" | "inactive" | "pending";

function setStatus(status: Status) {
  console.log(status);
}

// Function Types
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;`;

  functions = `Functions in TypeScript

// Function Declaration
function add(a: number, b: number): number {
  return a + b;
}

// Optional Parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting || 'Hello'}, \${name}!\`;
}

// Default Parameters
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}

// Rest Parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// Arrow Functions
const multiply = (a: number, b: number): number => a * b;

// Function Overloading
function getValue(id: number): User;
function getValue(email: string): User;
function getValue(idOrEmail: number | string): User {
  // Implementation
  return {} as User;
}

// Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
const num = identity(42);  // Type inferred`;

  classes = `Classes in TypeScript

// Basic Class
class Person {
  // Properties
  private name: string;
  public age: number;
  protected address: string;
  readonly id: number;
  
  // Constructor
  constructor(name: string, age: number, id: number) {
    this.name = name;
    this.age = age;
    this.id = id;
    this.address = "";
  }
  
  // Methods
  getName(): string {
    return this.name;
  }
  
  setName(name: string): void {
    this.name = name;
  }
}

// Inheritance
class Employee extends Person {
  private salary: number;
  
  constructor(name: string, age: number, id: number, salary: number) {
    super(name, age, id);
    this.salary = salary;
  }
  
  getSalary(): number {
    return this.salary;
  }
}

// Abstract Class
abstract class Animal {
  abstract makeSound(): void;
  
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

// Static Members
class MathUtils {
  static PI = 3.14159;
  
  static calculateArea(radius: number): number {
    return this.PI * radius * radius;
  }
}`;

  generics = `Generics in TypeScript

// Generic Function
function toArray<T>(item: T): T[] {
  return [item];
}

toArray<number>(5);  // [5]
toArray("hello");    // ["hello"] - type inferred

// Generic Interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };

// Generic Class
class DataStore<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T {
    return this.items[index];
  }
  
  getAll(): T[] {
    return this.items;
  }
}

const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);

// Generic Constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length);
}

logLength("hello");     // OK
logLength([1, 2, 3]);  // OK
// logLength(42);      // Error: number doesn't have length

// Multiple Type Parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}`;

  advancedTypes = `Advanced TypeScript Types

// Utility Types

// Partial - Makes all properties optional
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;

// Required - Makes all properties required
type RequiredUser = Required<PartialUser>;

// Readonly - Makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - Exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Record - Create object type with specific keys
type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, string[]>;

// Mapped Types
type Optional<T> = {
  [P in keyof T]?: T[P];
};

// Conditional Types
type IsString<T> = T extends string ? true : false;

// Template Literal Types
type Greeting = \`Hello \${string}\`;
let greeting: Greeting = "Hello World";

// Type Guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

if (isString(value)) {
  console.log(value.toUpperCase());
}`;

  bestPractices = `TypeScript Best Practices

1. Enable Strict Mode
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true
     }
   }

2. Avoid 'any' Type
   // Bad
   let data: any = getData();
   
   // Good
   interface Data {
     id: number;
     name: string;
   }
   let data: Data = getData();

3. Use Type Inference
   // Unnecessary type annotation
   const name: string = "John";
   
   // Better - type is inferred
   const name = "John";

4. Use Interfaces for Objects
   // Good
   interface User {
     id: number;
     name: string;
   }

5. Use Enums for Constants
   enum Status {
     Active = 'ACTIVE',
     Inactive = 'INACTIVE'
   }

6. Enable NoImplicitAny
   // tsconfig.json
   {
     "compilerOptions": {
       "noImplicitAny": true
     }
   }

7. Use Type Guards
   function processValue(value: string | number) {
     if (typeof value === 'string') {
       return value.toUpperCase();
     }
     return value.toFixed(2);
   }

8. Prefer const over let
   const name = "John";  // Immutable
   let age = 30;         // Mutable`;
}
