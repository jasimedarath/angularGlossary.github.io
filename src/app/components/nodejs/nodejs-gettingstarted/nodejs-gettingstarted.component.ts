import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-nodejs-gettingstarted',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nodejs-gettingstarted.component.html',
  styleUrl: './nodejs-gettingstarted.component.scss'
})
export class NodejsGettingstartedComponent {
  prerequisites = `Prerequisites for Node.js Development

1. Operating System
   - Windows 10/11, macOS, or Linux
   - Admin privileges for installation

2. Development Tools
   - Terminal/Command Prompt
   - Code Editor (VS Code recommended)
   - Git for version control

3. Check System
   # Windows
   winver  # Check Windows version
   
   # macOS/Linux
   uname -a  # Check system info

4. Basic Knowledge
   - JavaScript fundamentals
   - Command line basics
   - Basic networking concepts`;

  installation = `Installing Node.js

# Method 1: Official Installer
1. Visit https://nodejs.org/
2. Download LTS version (recommended)
3. Run installer and follow prompts
4. Verify installation

# Verify Installation
node --version    # Should show v18.x or newer
npm --version     # Should show 8.x or newer

# Method 2: Using NVM (Node Version Manager)
# Windows - Use nvm-windows
# Download from: https://github.com/coreybutler/nvm-windows

# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js using NVM
nvm install --lts
nvm use --lts
nvm list

# Method 3: Package Managers
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# macOS (Homebrew)
brew install node

# Windows (Chocolatey)
choco install nodejs`;

  firstProgram = `Your First Node.js Program

# Create a new file: app.js
console.log('Hello, Node.js!');

# Run the program
node app.js

# Interactive REPL
node
> console.log('Hello from REPL')
> 2 + 2
> .exit

# Example: Simple Server
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

# Run the server
node server.js

# Example: File Operations
// file-example.js
const fs = require('fs');

// Read file
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Write file
fs.writeFile('output.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});`;

  architecture = `Node.js Architecture

# Event Loop
Node.js uses a single-threaded event loop architecture
with non-blocking I/O operations

Components:
1. V8 Engine - JavaScript runtime
2. libuv - Event loop and async I/O
3. Core Modules - Built-in functionality
4. npm - Package manager

# Event Loop Phases
┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘

# Non-Blocking I/O Example
const fs = require('fs');

// Non-blocking (async)
fs.readFile('file.txt', (err, data) => {
  console.log('File content:', data);
});
console.log('This runs first');

// Blocking (sync)
const data = fs.readFileSync('file.txt');
console.log('File content:', data);
console.log('This runs after');`;

  coreModules = `Node.js Core Modules

# File System (fs)
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

# HTTP Module
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello!');
});
server.listen(3000);

# Path Module
const path = require('path');

console.log(path.join(__dirname, 'file.txt'));
console.log(path.extname('file.txt')); // .txt
console.log(path.basename('/path/to/file.txt')); // file.txt

# OS Module
const os = require('os');

console.log('Platform:', os.platform());
console.log('CPU Count:', os.cpus().length);
console.log('Free Memory:', os.freemem());
console.log('Total Memory:', os.totalmem());
console.log('Home Directory:', os.homedir());

# Events Module
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('Event occurred!');
});

myEmitter.emit('event');

# Util Module
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function read() {
  const data = await readFile('file.txt', 'utf8');
  console.log(data);
}`;

  globalObjects = `Global Objects in Node.js

# Global Object
console.log(global); // Global namespace

# __dirname and __filename
console.log(__dirname);  // Current directory path
console.log(__filename); // Current file path

# process Object
console.log(process.version);      // Node.js version
console.log(process.platform);     // Operating system
console.log(process.argv);         // Command line arguments
console.log(process.env);          // Environment variables
console.log(process.cwd());        // Current working directory

// Exit process
process.exit(0);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

# Buffer
const buf = Buffer.from('Hello');
console.log(buf);           // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // Hello

# setTimeout, setInterval
setTimeout(() => {
  console.log('Delayed message');
}, 1000);

const interval = setInterval(() => {
  console.log('Repeating message');
}, 2000);

clearInterval(interval);

# console
console.log('Log message');
console.error('Error message');
console.warn('Warning message');
console.time('timer');
// ... some code
console.timeEnd('timer');`;

  bestPractices = `Node.js Best Practices

1. Error Handling
   - Always handle errors in callbacks
   - Use try-catch with async/await
   - Implement global error handlers
   
   // Good
   fs.readFile('file.txt', (err, data) => {
     if (err) {
       console.error('Error:', err);
       return;
     }
     console.log(data);
   });
   
   // With async/await
   try {
     const data = await fs.promises.readFile('file.txt');
   } catch (err) {
     console.error('Error:', err);
   }

2. Use Environment Variables
   // Use dotenv package
   require('dotenv').config();
   
   const port = process.env.PORT || 3000;
   const dbUrl = process.env.DB_URL;

3. Avoid Blocking Code
   // Bad - blocking
   const data = fs.readFileSync('large-file.txt');
   
   // Good - non-blocking
   fs.readFile('large-file.txt', (err, data) => {
     // Handle data
   });

4. Use Async/Await
   // Cleaner async code
   async function getData() {
     const result = await fetchData();
     return result;
   }

5. Handle Process Events
   process.on('SIGTERM', () => {
     server.close(() => {
       console.log('Process terminated');
     });
   });

6. Use npm Scripts
   // package.json
   {
     "scripts": {
       "start": "node app.js",
       "dev": "nodemon app.js",
       "test": "jest"
     }
   }

7. Security
   - Keep dependencies updated
   - Use helmet for security headers
   - Validate user input
   - Use HTTPS
   - Set proper CORS policies`;
}
