import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-nodejs-modules',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nodejs-modules.component.html',
  styleUrl: './nodejs-modules.component.scss'
})
export class NodejsModulesComponent {
  commonjsModules = `CommonJS Modules

# Exporting
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// Or export single function
module.exports = function multiply(a, b) {
  return a * b;
};

# Importing
const { add, subtract } = require('./math');
const multiply = require('./multiply');

console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
console.log(multiply(5, 3)); // 15

# Module Caching
// Modules are cached after first load
const module1 = require('./myModule');
const module2 = require('./myModule'); // Uses cached version
console.log(module1 === module2); // true`;

  esModules = `ES Modules (ESM)

# Enable ESM
// Add to package.json
{
  "type": "module"
}

# Or use .mjs extension
// file.mjs

# Exporting
// math.mjs
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

// Default export
export default class Calculator {
  sum(a, b) {
    return a + b;
  }
}

# Importing
import Calculator, { add, PI } from './math.mjs';
import * as math from './math.mjs';

const calc = new Calculator();
console.log(calc.sum(5, 3));
console.log(add(5, 3));
console.log(PI);
console.log(math.add(2, 3));

# Dynamic Imports
async function loadModule() {
  const module = await import('./math.mjs');
  console.log(module.add(5, 3));
}`;

  builtinModules = `Built-in Node.js Modules

# File System (fs)
const fs = require('fs');

// Read file async
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Read file sync
const data = fs.readFileSync('file.txt', 'utf8');

// Promises API
const fsPromises = require('fs').promises;
async function readFile() {
  const data = await fsPromises.readFile('file.txt', 'utf8');
  console.log(data);
}

# Path Module
const path = require('path');

console.log(path.join('/users', 'admin', 'file.txt'));
console.log(path.resolve('file.txt'));
console.log(path.dirname('/users/admin/file.txt'));
console.log(path.basename('/users/admin/file.txt'));
console.log(path.extname('file.txt'));

# HTTP Module
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello World</h1>');
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

# URL Module
const url = require('url');

const myUrl = new URL('https://example.com:8080/path?id=100&status=active');
console.log(myUrl.hostname);  // example.com
console.log(myUrl.pathname);  // /path
console.log(myUrl.search);    // ?id=100&status=active
console.log(myUrl.searchParams.get('id')); // 100`;

  npmModules = `Working with npm Modules

# Installing Packages
npm install express        # Local install
npm install -g nodemon    # Global install
npm install lodash --save # Save as dependency
npm install jest --save-dev # Save as dev dependency

# package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^3.0.0"
  }
}

# Using npm Packages
const express = require('express');
const _ = require('lodash');

const app = express();

const numbers = [1, 2, 3, 4, 5];
const doubled = _.map(numbers, n => n * 2);
console.log(doubled);

# Popular npm Packages
// Express - Web framework
const express = require('express');
const app = express();

// Lodash - Utility library
const _ = require('lodash');

// Axios - HTTP client
const axios = require('axios');

// Moment - Date manipulation
const moment = require('moment');

// Dotenv - Environment variables
require('dotenv').config();`;

  modulePatterns = `Module Patterns

# Singleton Pattern
// database.js
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    Database.instance = this;
  }

  connect() {
    this.connection = 'Connected';
  }
}

module.exports = new Database();

# Revealing Module Pattern
const calculator = (function() {
  let result = 0;

  function add(x) {
    result += x;
    return this;
  }

  function getResult() {
    return result;
  }

  return {
    add,
    getResult
  };
})();

module.exports = calculator;

# Factory Pattern
function createUser(name, role) {
  return {
    name,
    role,
    sayHello() {
      console.log(\`Hello, I'm \${this.name}\`);
    }
  };
}

module.exports = createUser;

# Namespace Pattern
const app = {
  utils: {
    formatDate(date) {
      return date.toISOString();
    }
  },
  config: {
    apiUrl: 'https://api.example.com'
  }
};

module.exports = app;`;

  moduleResolution = `Module Resolution

# Module Resolution Order
1. Core modules (fs, http, path)
2. node_modules in current directory
3. node_modules in parent directories
4. Global node_modules

# require() Resolution
require('fs')              // Core module
require('express')         // node_modules
require('./myModule')      // Relative path
require('/abs/path/module')// Absolute path

# Module Search Paths
console.log(module.paths);
// Output:
// [
//   '/path/to/project/node_modules',
//   '/path/to/node_modules',
//   '/path/node_modules',
//   '/node_modules'
// ]

# require.resolve()
const modulePath = require.resolve('express');
console.log(modulePath); // Full path to module

# Module Wrapper
// Node.js wraps modules in:
(function(exports, require, module, __filename, __dirname) {
  // Module code here
});

# Circular Dependencies
// a.js
const b = require('./b');
console.log('In a, b.done =', b.done);
exports.done = true;

// b.js
const a = require('./a');
console.log('In b, a.done =', a.done);
exports.done = true;`;

  bestPractices = `Module Best Practices

1. File Organization
   project/
   ├── src/
   │   ├── controllers/
   │   ├── models/
   │   ├── routes/
   │   ├── services/
   │   └── utils/
   ├── tests/
   ├── config/
   └── node_modules/

2. Export Best Practices
   // Good - Named exports
   exports.add = (a, b) => a + b;
   exports.subtract = (a, b) => a - b;

   // Good - Multiple exports
   module.exports = { add, subtract };

   // Avoid mixing
   // Bad
   exports.add = () => {};
   module.exports = {}; // Overwrites exports

3. Import Best Practices
   // Good - Destructure imports
   const { add, subtract } = require('./math');

   // Good - Group imports
   // Core modules
   const fs = require('fs');
   const path = require('path');

   // Third-party modules
   const express = require('express');
   const lodash = require('lodash');

   // Local modules
   const config = require('./config');
   const utils = require('./utils');

4. Avoid Circular Dependencies
   // Use dependency injection
   // Or restructure code

5. Use index.js for Directories
   // models/index.js
   module.exports = {
     User: require('./User'),
     Post: require('./Post')
   };

   // Import
   const { User, Post } = require('./models');

6. Environment-Specific Modules
   // config/index.js
   const env = process.env.NODE_ENV || 'development';
   module.exports = require(\`./\${env}\`);`;
}
