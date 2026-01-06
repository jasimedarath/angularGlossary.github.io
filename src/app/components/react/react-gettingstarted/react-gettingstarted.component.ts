import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-react-gettingstarted',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-gettingstarted.component.html',
  styleUrl: './react-gettingstarted.component.scss'
})
export class ReactGettingstartedComponent {
  prerequisites = `Prerequisites for React Development

1. Node.js and npm
   - Node.js version 18.0 or newer (LTS recommended)
   - npm (comes with Node.js) or yarn
   - Download from: https://nodejs.org/

2. Code Editor
   - Visual Studio Code (recommended)
   - Extensions: ES7+ React/Redux/React-Native snippets, Prettier, ESLint

3. Basic Knowledge
   - HTML, CSS, JavaScript (ES6+)
   - Modern JavaScript features (arrow functions, destructuring, modules)
   - Command line basics

4. Check Installations:
   node --version   # Should show v18.0+
   npm --version    # Should show 9.0+

5. Optional Tools
   - Git for version control
   - React Developer Tools (browser extension)
   - Redux DevTools (if using Redux)`;

  createReactApp = `Creating React App with Create React App (CRA)

# Create a new React app
npx create-react-app my-react-app

# Navigate to project
cd my-react-app

# Start development server
npm start

# With TypeScript
npx create-react-app my-app --template typescript

# Application will open at http://localhost:3000

# Create React App includes:
# - React, JSX, ES6+ support
# - Development server with hot reload
# - Webpack bundler (pre-configured)
# - Babel transpiler
# - Testing setup with Jest
# - Production build optimization`;

  viteSetup = `Creating React App with Vite (Modern & Faster)

# Create with Vite (recommended for new projects)
npm create vite@latest my-react-app -- --template react

# Or with TypeScript
npm create vite@latest my-react-app -- --template react-ts

# Navigate to project
cd my-react-app

# Install dependencies
npm install

# Start development server
npm run dev

# Application will open at http://localhost:5173

# Why Vite?
# - Faster cold start
# - Instant hot module replacement (HMR)
# - Optimized build with Rollup
# - Modern ESM-based dev server
# - Better performance`;

  projectStructure = `React Project Structure

my-react-app/
├── node_modules/          # Dependencies
├── public/
│   ├── index.html         # HTML template
│   └── favicon.ico        # App icon
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── hooks/             # Custom hooks
│   │   └── useAuth.js
│   ├── services/          # API services
│   │   └── api.js
│   ├── utils/             # Utility functions
│   │   └── helpers.js
│   ├── App.jsx            # Root component
│   ├── App.css            # App styles
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies & scripts
├── package-lock.json      # Dependency lock file
├── .gitignore             # Git ignore rules
└── README.md              # Documentation

Vite Structure:
my-react-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx           # Entry point (Vite)
│   └── index.css
├── index.html             # In root (Vite)
├── vite.config.js         # Vite configuration
└── package.json`;

  basicCommands = `Essential npm Commands

# Development
npm start              # Start dev server (CRA)
npm run dev            # Start dev server (Vite)

# Building
npm run build          # Create production build
npm run preview        # Preview production build (Vite)

# Testing
npm test               # Run tests
npm test -- --coverage # Run tests with coverage

# Dependencies
npm install            # Install all dependencies
npm install package    # Install specific package
npm install -D package # Install as dev dependency
npm uninstall package  # Remove package
npm update             # Update packages

# Useful Scripts (add to package.json)
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "lint": "eslint src/**/*.{js,jsx}",
  "format": "prettier --write src/**/*.{js,jsx,css}"
}`;

  firstComponent = `Creating Your First Component

# Create a new file: src/components/HelloWorld.jsx

import React from 'react';
import './HelloWorld.css';

// Function Component (Modern Approach)
function HelloWorld() {
  const name = 'React Developer';
  const message = 'Welcome to React!';

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="hello-world">
      <h1>{name}</h1>
      <p>{message}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default HelloWorld;

// HelloWorld.css
.hello-world {
  text-align: center;
  padding: 2rem;
}

.hello-world h1 {
  color: #61dafb;
}

// Use in App.jsx
import HelloWorld from './components/HelloWorld';

function App() {
  return (
    <div className="App">
      <HelloWorld />
    </div>
  );
}

export default App;

// With Props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

// Usage
<Greeting name="John" age={30} />`;

  runningApp = `Running Your React Application

# Create React App (CRA)
cd my-react-app
npm install          # Install dependencies (first time)
npm start            # Start development server

# Opens at http://localhost:3000
# Auto-reloads on file changes

# Vite
cd my-react-app
npm install          # Install dependencies
npm run dev          # Start development server

# Opens at http://localhost:5173
# Instant hot module replacement

# Environment Variables
# Create .env file in project root:
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your_key_here

# Access in code:
const apiUrl = process.env.REACT_APP_API_URL;

# Vite uses VITE_ prefix:
VITE_API_URL=https://api.example.com

const apiUrl = import.meta.env.VITE_API_URL;

# Production Build
npm run build        # Creates optimized build in build/ or dist/

# Serve production build locally
npx serve -s build   # CRA
npx serve dist       # Vite

# Deploy production build to hosting service`;

  packageJson = `Understanding package.json

{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version"]
  }
}

# Vite package.json
{
  "name": "my-react-app",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.0"
  }
}

# Common packages to add:
npm install react-router-dom    # Routing
npm install axios               # HTTP client
npm install @tanstack/react-query  # Data fetching
npm install zustand            # State management`;

  addingLibraries = `Adding Popular Libraries

# React Router (Navigation)
npm install react-router-dom

import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>

# Axios (HTTP Requests)
npm install axios

import axios from 'axios';
const response = await axios.get('/api/users');

# React Query (Data Fetching)
npm install @tanstack/react-query

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

# Zustand (State Management)
npm install zustand

import create from 'zustand';
const useStore = create((set) => ({ count: 0 }));

# Styled Components (Styling)
npm install styled-components

import styled from 'styled-components';
const Button = styled.button\`color: blue;\`;

# Tailwind CSS (Utility CSS)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# React Icons
npm install react-icons

import { FaHome } from 'react-icons/fa';`;

  commonIssues = `Common Issues and Solutions

1. Port Already in Use
   Error: Port 3000 is already in use
   Solution:
   # Kill process or use different port
   PORT=3001 npm start  # Mac/Linux
   set PORT=3001 && npm start  # Windows

2. Module Not Found
   Error: Cannot find module 'react'
   Solution:
   rm -rf node_modules package-lock.json
   npm install

3. Hooks Rules Violation
   Error: Invalid hook call
   Solution:
   # Only call hooks at top level
   # Only call hooks in function components
   # Check for duplicate React versions

4. JSX Not Transformed
   Error: Unexpected token '<'
   Solution:
   # Ensure file has .jsx extension
   # Or configure babel for .js files

5. Build Fails
   Solution:
   # Clear cache
   npm run build -- --no-cache  # Vite
   
   # Clean install
   rm -rf node_modules package-lock.json
   npm install

6. Hot Reload Not Working
   Solution:
   # Restart dev server
   # Check if file is saved
   # Verify file watchers (Linux)

7. Environment Variables Not Loading
   Solution:
   # Restart dev server after adding .env
   # Use REACT_APP_ prefix (CRA)
   # Use VITE_ prefix (Vite)

8. CSS Not Applied
   Solution:
   # Import CSS file in component
   # Check className (not class)
   # Verify CSS file path`;

  nextSteps = `Next Steps After Setup

1. Learn React Fundamentals
   ✓ Components (Function & Class)
   ✓ JSX syntax
   ✓ Props and State
   ✓ Event handling
   ✓ Conditional rendering
   ✓ Lists and keys

2. Master React Hooks
   ✓ useState - State management
   ✓ useEffect - Side effects
   ✓ useContext - Context API
   ✓ useReducer - Complex state
   ✓ useMemo & useCallback - Performance
   ✓ Custom hooks

3. Add Routing
   ✓ Install React Router
   ✓ Set up routes
   ✓ Navigation
   ✓ Protected routes

4. State Management
   ✓ Context API (built-in)
   ✓ Zustand (lightweight)
   ✓ Redux Toolkit (full-featured)

5. Styling Solutions
   ✓ CSS Modules
   ✓ Styled Components
   ✓ Tailwind CSS
   ✓ Sass/SCSS

6. Data Fetching
   ✓ Fetch API
   ✓ Axios
   ✓ React Query
   ✓ SWR

7. Testing
   ✓ Jest (test runner)
   ✓ React Testing Library
   ✓ Unit tests
   ✓ Integration tests

8. Build & Deploy
   ✓ Optimize production build
   ✓ Deploy to Vercel/Netlify
   ✓ Set up CI/CD

Resources:
- Official docs: react.dev
- React Router: reactrouter.com
- Community: reddit.com/r/reactjs`;
}
