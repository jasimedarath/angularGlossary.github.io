import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-learn-gettingstarted',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-gettingstarted.component.html',
  styleUrl: './learn-gettingstarted.component.scss'
})
export class LearnGettingstartedComponent {
  prerequisites = `Prerequisites for Angular Development

1. Node.js and npm
   - Node.js version 18.13 or newer (LTS recommended)
   - npm (comes with Node.js) or yarn
   - Download from: https://nodejs.org/

2. Code Editor
   - Visual Studio Code (recommended)
   - Extensions: Angular Language Service, ESLint, Prettier

3. Basic Knowledge
   - HTML, CSS, JavaScript
   - TypeScript fundamentals
   - Command line basics

4. Check Installations:
   node --version   # Should show v18.13+
   npm --version    # Should show 8.0+

5. Angular CLI
   npm install -g @angular/cli
   ng version       # Verify installation`;

  installation = `Installing Angular CLI

# Install Angular CLI globally
npm install -g @angular/cli

# Or using yarn
yarn global add @angular/cli

# Verify installation
ng version

# Update to latest version
npm update -g @angular/cli

# Check for updates
ng update

# Output will show:
#   Angular CLI: 18.x.x
#   Node: 18.x.x
#   Package Manager: npm 10.x.x
#   OS: windows/darwin/linux`;

  createApp = `Creating a New Angular Application

# Basic app creation
ng new my-angular-app

# You'll be prompted:
# ? Would you like to add Angular routing? (y/N) y
# ? Which stylesheet format would you like to use?
#   CSS
#   SCSS   (recommended)
#   Sass
#   Less

# Create with specific options (skip prompts)
ng new my-app --routing --style=scss --skip-git

# Additional options:
ng new my-app --routing --style=scss --skip-tests --strict

# Create with standalone components (Angular 14+)
ng new my-app --standalone --routing --style=scss

# Minimal setup (no routing, no tests)
ng new my-app --minimal --style=css

# Dry run (see what would be created)
ng new my-app --dry-run`;

  projectStructure = `Angular Project Structure

my-angular-app/
├── node_modules/          # Dependencies
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Root component
│   │   ├── app.component.html    # Root template
│   │   ├── app.component.scss    # Root styles
│   │   ├── app.component.spec.ts # Root tests
│   │   ├── app.config.ts         # App configuration
│   │   └── app.routes.ts         # Route definitions
│   ├── assets/            # Static files (images, fonts)
│   ├── index.html         # Main HTML file
│   ├── main.ts            # Entry point
│   └── styles.scss        # Global styles
├── public/                # Public assets
├── angular.json           # Angular CLI configuration
├── package.json           # npm dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TS config
└── README.md              # Project documentation

Key Files:
- angular.json: Project configuration (build, serve, test)
- package.json: Dependencies and npm scripts
- tsconfig.json: TypeScript compiler options
- main.ts: Bootstraps the application
- app.config.ts: Application providers and configuration`;

  basicCommands = `Essential Angular CLI Commands

# Development Server
ng serve                    # Start dev server (http://localhost:4200)
ng serve --open            # Open browser automatically
ng serve --port 4300       # Use different port
ng serve --host 0.0.0.0    # Make accessible on network

# Generate Components
ng generate component user           # or ng g c user
ng generate component user --skip-tests
ng generate component user --standalone
ng generate component admin/dashboard  # In subfolder

# Generate Services
ng generate service user             # or ng g s user
ng generate service services/auth

# Generate Other Elements
ng g module admin                    # Module
ng g directive highlight             # Directive
ng g pipe custom                     # Pipe
ng g guard auth                      # Guard
ng g interface user                  # Interface
ng g class models/user               # Class
ng g enum status                     # Enum

# Build for Production
ng build                    # Build in dist/
ng build --configuration production
ng build --prod            # Optimized production build
ng build --base-href /app/ # Set base path

# Testing
ng test                    # Run unit tests
ng test --code-coverage    # With coverage report
ng e2e                     # Run e2e tests

# Linting & Formatting
ng lint                    # Run linter

# Other Useful Commands
ng version                 # Show Angular versions
ng update                  # Check for updates
ng add @angular/material   # Add Angular Material
ng add @angular/pwa        # Add PWA support`;

  runningApp = `Running Your Angular Application

# Navigate to project directory
cd my-angular-app

# Install dependencies (if not already)
npm install

# Start development server
ng serve

# Development server will start at:
# http://localhost:4200

# The application will automatically reload on file changes

# Open in browser
ng serve --open

# Use different port
ng serve --port 4300

# Enable HTTPS
ng serve --ssl

# Production build
ng build --configuration production

# Serve production build locally
npm install -g http-server
http-server dist/my-angular-app/browser

# Common npm scripts (in package.json):
npm start          # Same as ng serve
npm run build      # Build production
npm test           # Run tests
npm run lint       # Run linter`;

  firstComponent = `Creating Your First Component

# Generate a new component
ng generate component hello-world

# This creates:
# src/app/hello-world/
#   ├── hello-world.component.ts
#   ├── hello-world.component.html
#   ├── hello-world.component.scss
#   └── hello-world.component.spec.ts

# hello-world.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.scss'
})
export class HelloWorldComponent {
  title = 'Hello, Angular!';
  message = 'Welcome to your first component';

  onClick() {
    alert('Button clicked!');
  }
}

# hello-world.component.html
<div class="container">
  <h1>{{ title }}</h1>
  <p>{{ message }}</p>
  <button (click)="onClick()">Click Me</button>
</div>

# Use in app.component.html
<app-hello-world></app-hello-world>

# For standalone components, import in app.config.ts or parent component`;

  commonIssues = `Common Issues and Solutions

1. Port Already in Use
   Error: Port 4200 is already in use
   Solution:
   ng serve --port 4300
   # Or kill process using port 4200

2. Node/npm Version Issues
   Error: Node version not supported
   Solution:
   # Update Node.js to LTS version
   # Check: node --version

3. Module Not Found
   Error: Cannot find module '@angular/core'
   Solution:
   npm install
   # Or: npm ci (clean install)

4. Compilation Errors
   Error: Property does not exist on type
   Solution:
   # Check TypeScript strict mode in tsconfig.json
   # Add proper type annotations

5. Style Not Applied
   Solution:
   # Check styleUrl path in component
   # Verify SCSS/CSS file exists
   # Check global styles in styles.scss

6. Routing Not Working
   Solution:
   # Verify app.routes.ts configuration
   # Check provideRouter in app.config.ts
   # Use routerLink instead of href

7. Build Errors
   Solution:
   # Clear cache
   rm -rf node_modules package-lock.json
   npm install
   
   # Clear Angular cache
   ng cache clean

8. Hot Reload Not Working
   Solution:
   # Restart ng serve
   # Check file watchers limit (Linux/Mac)`;

  packageJson = `Understanding package.json

{
  "name": "my-angular-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/animations": "^18.0.0",
    "@angular/common": "^18.0.0",
    "@angular/compiler": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/forms": "^18.0.0",
    "@angular/platform-browser": "^18.0.0",
    "@angular/platform-browser-dynamic": "^18.0.0",
    "@angular/router": "^18.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^18.0.0",
    "@angular/cli": "^18.0.0",
    "@angular/compiler-cli": "^18.0.0",
    "typescript": "~5.4.0"
  }
}

# Install dependencies
npm install

# Add new package
npm install package-name
npm install -D package-name  # Dev dependency

# Update packages
npm update
ng update @angular/cli @angular/core`;
}
