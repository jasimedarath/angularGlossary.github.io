import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-expressjs-gettingstarted',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './expressjs-gettingstarted.component.html',
  styleUrl: './expressjs-gettingstarted.component.scss'
})
export class ExpressjsGettingstartedComponent {
  prerequisites = `Prerequisites for Express.js Development

1. Node.js and npm
   - Node.js v14 or higher
   - npm v6 or higher
   
   # Check versions
   node --version
   npm --version

2. Basic Knowledge
   - JavaScript ES6+
   - Node.js fundamentals
   - HTTP protocol basics
   - REST API concepts

3. Development Tools
   - Code editor (VS Code)
   - API testing tool (Postman/Thunder Client)
   - Terminal/Command line`;

  installation = `Installing Express.js

# Create a new project directory
mkdir my-express-app
cd my-express-app

# Initialize npm project
npm init -y

# Install Express.js
npm install express

# Install development dependencies
npm install --save-dev nodemon

# Update package.json scripts
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}

# Install additional common packages
npm install dotenv cors body-parser morgan`;

  firstApp = `Your First Express.js Application

// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// JSON response
app.get('/api/data', (req, res) => {
  res.json({ message: 'API Response', status: 'success' });
});

// Route with parameter
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(\`User ID: \${userId}\`);
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});

# Run the application
npm run dev`;

  basicRouting = `Basic Routing

const express = require('express');
const app = express();

// GET request
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]);
});

// POST request
app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// PUT request
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: \`User \${id} updated\` });
});

// DELETE request
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: \`User \${id} deleted\` });
});

// Multiple HTTP methods
app.route('/api/product/:id')
  .get((req, res) => res.send('Get product'))
  .put((req, res) => res.send('Update product'))
  .delete((req, res) => res.send('Delete product'));`;

  middleware = `Middleware Basics

const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public'));          // Serve static files

// Custom middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass control to next middleware
});

// Route-specific middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected resource' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});`;

  requestResponse = `Request and Response Objects

// Request object (req)
app.get('/example', (req, res) => {
  // Query parameters: /example?name=John&age=30
  console.log(req.query);  // { name: 'John', age: '30' }
  
  // Route parameters: /user/:id
  console.log(req.params); // { id: '123' }
  
  // Request body (with express.json())
  console.log(req.body);
  
  // Headers
  console.log(req.headers);
  console.log(req.get('Content-Type'));
  
  // Other properties
  console.log(req.method);    // GET, POST, etc.
  console.log(req.path);      // /example
  console.log(req.protocol);  // http or https
  console.log(req.ip);        // Client IP
});

// Response object (res)
app.get('/response', (req, res) => {
  // Send text
  res.send('Hello World');
  
  // Send JSON
  res.json({ data: 'value' });
  
  // Set status code
  res.status(404).send('Not Found');
  
  // Redirect
  res.redirect('/home');
  
  // Set headers
  res.set('Content-Type', 'text/html');
  res.setHeader('X-Custom-Header', 'value');
  
  // Send file
  res.sendFile(__dirname + '/index.html');
  
  // Download file
  res.download('/path/to/file.pdf');
});`;

  projectStructure = `Project Structure

my-express-app/
├── node_modules/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── src/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── productController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── utils/
│   │   └── helpers.js
│   └── config/
│       └── database.js
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md

# app.js - Express configuration
# server.js - Server startup
# .env - Environment variables`;

  bestPractices = `Express.js Best Practices

1. Use Environment Variables
   // .env
   PORT=3000
   DB_URL=mongodb://localhost:27017/mydb
   JWT_SECRET=mysecret
   
   // app.js
   require('dotenv').config();
   const PORT = process.env.PORT || 3000;

2. Error Handling
   // Async error handling wrapper
   const asyncHandler = fn => (req, res, next) => {
     Promise.resolve(fn(req, res, next)).catch(next);
   };
   
   app.get('/data', asyncHandler(async (req, res) => {
     const data = await fetchData();
     res.json(data);
   }));

3. Organize Routes
   // routes/users.js
   const express = require('express');
   const router = express.Router();
   
   router.get('/', getAllUsers);
   router.post('/', createUser);
   
   module.exports = router;
   
   // app.js
   app.use('/api/users', require('./routes/users'));

4. Use Helmet for Security
   const helmet = require('helmet');
   app.use(helmet());

5. Enable CORS
   const cors = require('cors');
   app.use(cors());

6. Logging
   const morgan = require('morgan');
   app.use(morgan('combined'));

7. Input Validation
   const { body, validationResult } = require('express-validator');
   
   app.post('/user', [
     body('email').isEmail(),
     body('password').isLength({ min: 6 })
   ], (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
   });`;
}
