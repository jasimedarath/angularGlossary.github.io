import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-webpack',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-webpack.component.html',
  styleUrl: './learn-webpack.component.scss'
})
export class LearnWebpackComponent implements AfterViewChecked {
  
  introduction: string = `// What is Webpack in Angular?
// Webpack is a powerful module bundler that Angular CLI uses under the hood
// It transforms, bundles, and packages your source code and assets

// Angular CLI abstracts Webpack configuration, but understanding it helps with:
// - Custom build configurations
// - Performance optimization
// - Troubleshooting build issues
// - Advanced customization

// Key Webpack Concepts in Angular:
// 1. Entry Points: Main.ts is the entry for Angular apps
// 2. Loaders: Transform files (TypeScript \u2192 JavaScript)
// 3. Plugins: Optimize bundles, inject scripts, minify code
// 4. Output: Bundled files in dist/ folder

// Angular Build Process:
// Source Files \u2192 TypeScript Compiler \u2192 Webpack Bundler \u2192 Optimized Bundles

// Build Commands:
// ng build              // Development build
// ng build --configuration production  // Production build with optimizations
// ng serve              // Development server with live reload

// Generated Bundles:
// - main.js: Your application code
// - polyfills.js: Browser compatibility code
// - runtime.js: Webpack runtime and module loading logic
// - vendor.js: Third-party libraries (in older configs)
// - styles.css: Compiled stylesheets

// Production Build Optimizations:
// optimization: scripts, styles, fonts - minify all assets
// outputHashing: "all" - add hash to filenames for cache busting
// sourceMap: false - disable source maps for smaller bundles
// namedChunks: false - use numeric IDs instead of names
// aot: true - Ahead-of-Time compilation
// buildOptimizer: true - Angular-specific optimizations`;

  bundleOptimization: string = `// angular.json - Bundle Optimization Configuration
// Configuration in projects > my-app > architect > build > configurations > production

Key production settings:
- optimization: true (enables all optimizations)
- outputHashing: "all" (cache busting)
- sourceMap: false (smaller bundles)
- namedChunks: false (numeric IDs)
- extractLicenses: true (separate license file)
- vendorChunk: false (better caching)
- buildOptimizer: true (Angular optimizations)

Budget configuration to warn/error on large bundles:
- type: "initial" - maximumWarning: "500kb", maximumError: "1mb"
- type: "anyComponentStyle" - maximumWarning: "6kb", maximumError: "10kb"

// Analyzing Bundle Size
// Install: npm install --save-dev webpack-bundle-analyzer
// Add script to package.json:
"analyze": "ng build --stats-json && webpack-bundle-analyzer dist/my-app/stats.json"

// Bundle Size Reduction Techniques:

// 1. Tree Shaking (automatic with production builds)
// Only import what you need
import &#123; map, filter &#125; from 'rxjs/operators'; // ✅ Good
// import * as operators from 'rxjs/operators';  // ❌ Bad - imports everything

// 2. Lazy Loading Routes
const routes: Routes = [
  &#123;
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  &#125;
];

// 3. Lazy Load Heavy Libraries
// Instead of:
import * as moment from 'moment';

// Use dynamic import:
async loadMoment() &#123;
  const moment = await import('moment');
  return moment.default();
&#125;

// 4. Use Lighter Alternatives
// moment (231 KB) → date-fns (15 KB)
// lodash (72 KB) → lodash-es with tree-shaking
// rxjs (full) → import specific operators

// 5. Optimize Images and Assets
&#123;
  "assets": [
    &#123;
      "glob": "**/*.&#123;png,jpg,svg&#125;",
      "input": "src/assets/",
      "output": "/assets/",
      "optimization": true  // Optimize images during build
    &#125;
  ]
&#125;

// 6. Remove Unused CSS
// Angular automatically removes unused component styles
// For global styles, use PurgeCSS

// 7. Enable Compression
// Configure server to serve gzip/brotli compressed files
// Angular CLI generates .gz files with --optimization`;

  codeSplitting: string = `// Code Splitting Strategies in Angular

// 1. Route-based Code Splitting (Lazy Loading)
// This is the primary code splitting strategy in Angular
const routes: Routes = [
  &#123; path: '', component: HomeComponent &#125;,
  &#123;
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  &#125;,
  &#123;
    path: 'profile',
    loadChildren: () => import('./profile/profile.module')
      .then(m => m.ProfileModule)
  &#125;
];

// Result: Separate chunks for each lazy-loaded module
// - main.js (core app)
// - dashboard-dashboard-module.js (loaded on demand)
// - profile-profile-module.js (loaded on demand)

// 2. Component-level Code Splitting
// Standalone components can be lazy-loaded
const routes: Routes = [
  &#123;
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(c => c.AdminComponent)
  &#125;
];

// 3. Preloading Strategies
import &#123; PreloadAllModules, RouterModule &#125; from '@angular/router';

@NgModule(&#123;
  imports: [
    RouterModule.forRoot(routes, &#123;
      preloadingStrategy: PreloadAllModules  // Preload all lazy modules
    &#125;)
  ]
&#125;)
export class AppRoutingModule &#123;&#125;

// Custom Preloading Strategy
import &#123; PreloadingStrategy, Route &#125; from '@angular/router';
import &#123; Observable, of &#125; from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy &#123;
  preload(route: Route, load: () => Observable<any>): Observable<any> &#123;
    // Only preload routes marked with data.preload = true
    return route.data?.['preload'] ? load() : of(null);
  &#125;
&#125;

const routes: Routes = [
  &#123;
    path: 'important',
    loadChildren: () => import('./important/important.module'),
    data: &#123; preload: true &#125;  // This will be preloaded
  &#125;,
  &#123;
    path: 'rarely-used',
    loadChildren: () => import('./rarely/rarely.module')
    // This won't be preloaded
  &#125;
];

// 4. Vendor Chunk Splitting (legacy)
// In older Angular versions, configure in angular.json:
&#123;
  "optimization": &#123;
    "scripts": true
  &#125;,
  "vendorChunk": true,  // Split vendor libraries
  "commonChunk": true   // Extract common code
&#125;

// 5. Manual Code Splitting with Dynamic Imports
export class HeavyFeatureComponent &#123;
  async loadHeavyLibrary() &#123;
    // Load library only when needed
    const &#123; default: Chart &#125; = await import('chart.js');
    this.initChart(Chart);
  &#125;
  
  async loadHeavyComponent() &#123;
    // Dynamically load component
    const &#123; HeavyComponent &#125; = await import('./heavy.component');
    // Manually create component
  &#125;
&#125;

// 6. Shared Chunks Configuration
// Webpack will automatically create shared chunks for code used in multiple places
// Configure in angular.json for fine-tuning:
&#123;
  "optimization": &#123;
    "scripts": &#123;
      "minify": true,
      "inlineCritical": true
    &#125;,
    "styles": &#123;
      "minify": true,
      "inlineCritical": true
    &#125;
  &#125;
&#125;

// Best Practices:
// ✅ Use lazy loading for feature modules
// ✅ Keep main bundle under 500KB
// ✅ Preload critical routes after initial load
// ✅ Monitor bundle sizes with budgets
// ❌ Don't over-split (too many requests hurt performance)
// ❌ Don't lazy-load immediately needed features`;

  treeShaking: string = `// Tree Shaking in Angular

// Tree shaking removes unused code from the final bundle
// It's enabled automatically in production builds

// How Tree Shaking Works:
// 1. Code Analysis: Webpack analyzes import/export statements
// 2. Dead Code Detection: Identifies unused exports
// 3. Elimination: Removes unused code from bundle

// ===== WRITING TREE-SHAKEABLE CODE =====

// ✅ Use ES6 Imports/Exports
export class UserService &#123; &#125;
import &#123; UserService &#125; from './user.service';

// ❌ Avoid require() - not tree-shakeable
const UserService = require('./user.service');

// ✅ Import Specific Items
import &#123; map, filter &#125; from 'rxjs/operators';
import &#123; HttpClient &#125; from '@angular/common/http';

// ❌ Avoid Namespace Imports
import * as rxjs from 'rxjs';  // Imports everything!
import * as _ from 'lodash';    // Imports entire library!

// ===== ANGULAR-SPECIFIC TREE SHAKING =====

// 1. Providable Services (Tree-shakeable)
@Injectable(&#123;
  providedIn: 'root'  // Tree-shakeable if unused
&#125;)
export class OptionalService &#123;
  // If no component injects this, it won't be in bundle
&#125;

// 2. Standalone Components (Tree-shakeable)
@Component(&#123;
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule]  // Only imports what's used
&#125;)
export class FeatureComponent &#123;&#125;

// ===== LIBRARY-SPECIFIC TREE SHAKING =====

// RxJS - Use Pipeable Operators
import &#123; map, filter, take &#125; from 'rxjs/operators';

source$.pipe(
  map(x => x * 2),
  filter(x => x > 10),
  take(5)
).subscribe();

// Lodash-ES - Import Specific Functions
import map from 'lodash-es/map';
import filter from 'lodash-es/filter';
// NOT: import _ from 'lodash';

// Angular Material - Import Specific Modules
import &#123; MatButtonModule &#125; from '@angular/material/button';
import &#123; MatCardModule &#125; from '@angular/material/card';
// NOT: import &#123; MaterialModule &#125; from '@angular/material';

// ===== SIDE EFFECTS AND TREE SHAKING =====

// Mark side-effect-free code in package.json
&#123;
  "name": "my-library",
  "sideEffects": false  // Entire package is side-effect free
&#125;

// Or specify files with side effects:
&#123;
  "sideEffects": [
    "*.css",
    "*.scss",
    "src/polyfills.ts"
  ]
&#125;

// ===== VERIFYING TREE SHAKING =====

// 1. Build with source maps and analyze
ng build --source-map --configuration production

// 2. Check bundle sizes
ls -lh dist/my-app/*.js

// 3. Use webpack-bundle-analyzer
npm run analyze

// 4. Search for unused code in bundle
// Look for dead code in main.js

// ===== COMMON TREE-SHAKING ISSUES =====

// Issue 1: Dynamic Property Access
// ❌ This prevents tree shaking
const feature = features['featureName'];

// ✅ Use static imports
import &#123; featureName &#125; from './features';

// Issue 2: Export All Pattern
// ❌ Barrel exports can prevent tree shaking
export * from './module-a';
export * from './module-b';

// ✅ Explicit exports
export &#123; FeatureA &#125; from './feature-a';
export &#123; FeatureB &#125; from './feature-b';

// Issue 3: Side Effects in Initialization
// ❌ This code always runs
export const config = initializeConfig();  // Side effect!

// ✅ Lazy initialization
let config: Config;
export function getConfig(): Config &#123;
  if (!config) &#123;
    config = initializeConfig();
  &#125;
  return config;
&#125;

// Best Practices:
// ✅ Use providedIn: 'root' for services
// ✅ Import specific items, not namespaces
// ✅ Mark libraries as side-effect free
// ✅ Use Angular's standalone components
// ✅ Verify tree shaking with bundle analysis
// ❌ Avoid dynamic imports with variables
// ❌ Avoid export * patterns in barrel files`;

  buildConfiguration: string = `// Custom Webpack Configuration in Angular

// Angular CLI 8+ uses angular.json for most config
// For advanced customization, use @angular-builders/custom-webpack

// 1. Install custom webpack builder
// npm install --save-dev @angular-builders/custom-webpack

// 2. Update angular.json
&#123;
  "architect": &#123;
    "build": &#123;
      "builder": "@angular-builders/custom-webpack:browser",
      "options": &#123;
        "customWebpackConfig": &#123;
          "path": "./custom-webpack.config.js",
          "mergeStrategies": &#123; "externals": "replace" &#125;
        &#125;
      &#125;
    &#125;,
    "serve": &#123;
      "builder": "@angular-builders/custom-webpack:dev-server"
    &#125;
  &#125;
&#125;

// 3. Create custom-webpack.config.js
module.exports = &#123;
  // Add custom plugins
  plugins: [
    new webpack.DefinePlugin(&#123;
      'process.env.VERSION': JSON.stringify(require('./package.json').version)
    &#125;)
  ],
  
  // Add custom loaders
  module: &#123;
    rules: [
      &#123;
        test: /\.txt$/,
        use: 'raw-loader'
      &#125;
    ]
  &#125;,
  
  // Add custom resolve aliases
  resolve: &#123;
    alias: &#123;
      '@shared': path.resolve(__dirname, 'src/app/shared'),
      '@core': path.resolve(__dirname, 'src/app/core')
    &#125;
  &#125;,
  
  // External dependencies (don't bundle)
  externals: &#123;
    'jquery': 'jQuery',
    'moment': 'moment'
  &#125;
&#125;;

// ===== COMMON CUSTOMIZATIONS =====

// Environment-specific Webpack Config
module.exports = (config, options) => &#123;
  if (options.configuration === 'production') &#123;
    config.optimization.minimize = true;
  &#125;
  return config;
&#125;;

// Add Custom Loader
&#123;
  module: &#123;
    rules: [
      &#123;
        test: /\\.md$/,
        use: [
          &#123;
            loader: 'html-loader'
          &#125;,
          &#123;
            loader: 'markdown-loader'
          &#125;
        ]
      &#125;
    ]
  &#125;
&#125;

// Configure Dev Server
&#123;
  devServer: &#123;
    proxy: &#123;
      '/api': &#123;
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      &#125;
    &#125;,
    port: 4200,
    open: true,
    historyApiFallback: true
  &#125;
&#125;

// Bundle Splitting
&#123;
  optimization: &#123;
    splitChunks: &#123;
      chunks: 'all',
      cacheGroups: &#123;
        vendor: &#123;
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          priority: 10
        &#125;,
        common: &#123;
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        &#125;
      &#125;
    &#125;
  &#125;
&#125;

// Source Maps Configuration
&#123;
  devtool: 'eval-source-map',  // Fast rebuilds in dev
  // Production options:
  // false - no source maps
  // 'source-map' - separate .map files
  // 'hidden-source-map' - for error reporting only
&#125;

// Performance Hints
&#123;
  performance: &#123;
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: 'warning'  // or 'error' to fail build
  &#125;
&#125;

// Copy Custom Assets
const CopyWebpackPlugin = require('copy-webpack-plugin');

&#123;
  plugins: [
    new CopyWebpackPlugin(&#123;
      patterns: [
        &#123; from: 'src/custom-assets', to: 'assets/custom' &#125;
      ]
    &#125;)
  ]
&#125;

// Compression Plugin
const CompressionPlugin = require('compression-webpack-plugin');

&#123;
  plugins: [
    new CompressionPlugin(&#123;
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    &#125;)
  ]
&#125;`;

  productionOptimizations: string = `// Production Build Optimizations

// ===== ANGULAR.JSON PRODUCTION CONFIG =====
// Configuration object for production builds
// Key settings:
// - optimization: Enable minification and optimizations
// - aot: Ahead-of-Time compilation
// - buildOptimizer: Angular-specific optimizations
// - outputHashing: Cache busting with file hashes
// - budgets: Size limits and warnings

// Example configuration:
angular.json > projects > yourApp > architect > build > configurations > production

optimization: true
aot: true
buildOptimizer: true
outputHashing: "all"
sourceMap: false
namedChunks: false
extractLicenses: true
vendorChunk: false
serviceWorker: true

// Bundle budgets to control size:
budgets: [
  type: "initial",
  maximumWarning: "500kb",
  maximumError: "1mb"
]

// ===== RUNTIME OPTIMIZATIONS =====

// 1. OnPush Change Detection
@Component(&#123;
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush
&#125;)
export class UserListComponent &#123;
  @Input() users: User[] = [];
&#125;

// 2. Track By Functions
trackByFn(index: number, item: any): any &#123;
  return item.id;  // Use unique identifier
&#125;

// 3. Lazy Loading Images
<img [src]="imageUrl" loading="lazy" />

// 4. Virtual Scrolling for Large Lists
<cdk-virtual-scroll-viewport itemSize="50">
  <div *cdkVirtualFor="let item of items">
    item content
  </div>
</cdk-virtual-scroll-viewport>

// 5. Preconnect to External Resources
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.example.com">

// ===== BUILD-TIME OPTIMIZATIONS =====

// 1. Remove Console Logs in Production
// Uses Terser plugin configuration
terserOptions: &#123;
  compress: &#123;
    drop_console: true,
    drop_debugger: true
  &#125;
&#125;

// 2. Differential Loading
// Generates ES5 and ES2015+ bundles automatically
<script src="main-es2015.js" type="module"></script>
<script src="main-es5.js" nomodule></script>

// 3. Compression Configuration (nginx)
gzip on;
gzip_types text/plain text/css application/json application/javascript;
brotli on;
brotli_types text/plain text/css application/json application/javascript;

// ===== CACHING STRATEGY =====

// 1. Long-term Caching with Hashing
// Files have hash in name: main.a1b2c3d4.js
// Cache-Control: max-age=31536000, immutable

// 2. Service Worker for App Shell Caching
// Configure in ngsw-config.json
// - prefetch: Load immediately
// - lazy: Load on demand
// - installMode/updateMode settings

// ===== MONITORING & METRICS =====

// 1. Webpack Bundle Analyzer
npm run analyze

// 2. Lighthouse CI
lhci autorun --upload.target=temporary-public-storage

// 3. Angular CLI Build Stats
ng build --stats-json

// 4. Bundle Size Checking with bundlesize
npm install -g bundlesize
// Set size limits in package.json`;

  performanceTips: string = `// Performance Tips & Best Practices

// ===== BUILD PERFORMANCE =====

// 1. Incremental Builds
ng build --watch  // Rebuilds only changed files

// 2. Parallel Builds (for monorepos)
// Use Nx or other build tools for parallel compilation

// 3. Build Cache
// Angular 13+ has persistent build cache
&#123;
  "cli": &#123;
    "cache": &#123;
      "enabled": true,
      "path": ".angular/cache",
      "environment": "all"
    &#125;
  &#125;
&#125;

// 4. Reduce Template Type Checking
// tsconfig.json (use carefully!)
&#123;
  "angularCompilerOptions": &#123;
    "fullTemplateTypeCheck": false,
    "strictTemplates": false
  &#125;
&#125;

// ===== BUNDLE SIZE OPTIMIZATION =====

// 1. Analyze and Remove Unused Dependencies
npm install -g depcheck
depcheck

// 2. Use Lighter Alternatives
// moment → date-fns (10x smaller)
// lodash → lodash-es + tree-shaking
// rxjs → import specific operators only

// 3. Remove Duplicate Dependencies
npm dedupe

// 4. Code Splitting
// Split large features into lazy-loaded modules
const routes: Routes = [
  &#123;
    path: 'heavy-feature',
    loadChildren: () => import('./heavy-feature/heavy-feature.module')
      .then(m => m.HeavyFeatureModule)
  &#125;
];

// ===== RUNTIME PERFORMANCE =====

// 1. OnPush Change Detection
@Component(&#123;
  changeDetection: ChangeDetectionStrategy.OnPush
&#125;)
export class OptimizedComponent &#123;
  // Only checks when @Input changes or events occur
&#125;

// 2. Detach Change Detection for Static Content
constructor(private cd: ChangeDetectorRef) &#123;&#125;

ngOnInit() &#123;
  this.cd.detach();  // Stop automatic change detection
  
  // Manually trigger when needed
  this.updateData().then(() => &#123;
    this.cd.detectChanges();
  &#125;);
&#125;

// 3. Use Pure Pipes
@Pipe(&#123;
  name: 'customPipe',
  pure: true  // Default: only recalculates when input changes
&#125;)
export class CustomPipe implements PipeTransform &#123;
  transform(value: any): any &#123;
    return value;
  &#125;
&#125;

// 4. Avoid Complex Template Expressions
// ❌ Bad: Complex logic in template
<div>&#123;&#123; calculateComplexValue(item) &#125;&#125;</div>

// ✅ Good: Pre-calculate in component
ngOnInit() &#123;
  this.displayValue = this.calculateComplexValue(this.item);
&#125;
<div>&#123;&#123; displayValue &#125;&#125;</div>

// 5. Virtual Scrolling for Large Lists
import &#123; ScrollingModule &#125; from '@angular/cdk/scrolling';

<cdk-virtual-scroll-viewport itemSize="50">
  <div *cdkVirtualFor="let item of items">&#123;&#123; item &#125;&#125;</div>
</cdk-virtual-scroll-viewport>

// ===== NETWORK PERFORMANCE =====

// 1. HTTP Caching
import &#123; HttpClient, HttpHeaders &#125; from '@angular/common/http';
import &#123; shareReplay &#125; from 'rxjs/operators';

private cache$ = this.http.get('/api/data').pipe(
  shareReplay(1)  // Cache the result
);

// 2. Preload Data
export class DataResolver implements Resolve<any> &#123;
  resolve(): Observable<any> &#123;
    return this.dataService.getData();  // Loads before route activates
  &#125;
&#125;

// 3. Image Optimization
<img 
  [src]="imageUrl" 
  loading="lazy"
  srcset="image-320w.jpg 320w, image-640w.jpg 640w"
  sizes="(max-width: 320px) 280px, 640px"
/>

// 4. Service Worker for Offline Support
ng add @angular/pwa
// Automatically caches app shell and assets

// ===== MEMORY OPTIMIZATION =====

// 1. Unsubscribe from Observables
private destroy$ = new Subject<void>();

ngOnInit() &#123;
  this.dataService.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);
&#125;

ngOnDestroy() &#123;
  this.destroy$.next();
  this.destroy$.complete();
&#125;

// 2. Avoid Memory Leaks
// Use async pipe in templates (auto-unsubscribe)
<div *ngIf="data$ | async as data">&#123;&#123; data &#125;&#125;</div>

// 3. Lazy Load Heavy Components
async loadHeavyComponent() &#123;
  const &#123; HeavyComponent &#125; = await import('./heavy.component');
  // Create component dynamically
&#125;

// ===== DEVELOPMENT PERFORMANCE =====

// 1. Use Incremental Build
ng serve --hmr  // Hot Module Replacement

// 2. Reduce Watched Files
// .gitignore / .dockerignore
node_modules/
dist/
*.log

// 3. Use SSD for node_modules
// Faster file I/O improves build times

// ===== MONITORING =====

// 1. Use Chrome DevTools Performance Tab
// Record page load and interaction

// 2. Lighthouse Audits
// Run in Chrome DevTools or CI/CD

// 3. Bundle Size Monitoring
// Set up CI checks for bundle size regressions

// 4. Real User Monitoring (RUM)
// Use tools like Google Analytics, Sentry`;

  commonIssues: string = `// Common Webpack Issues and Solutions

// ===== ISSUE 1: Bundle Size Too Large =====

// Problem: Initial bundle exceeds budget
// Error: "Initial exceeded maximum budget"

// Solutions:
// 1. Analyze bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json

// 2. Lazy load routes
const routes: Routes = [
  &#123; path: 'feature', loadChildren: () => import('./feature/feature.module') &#125;
];

// 3. Remove unused dependencies
npm uninstall unused-package

// 4. Use lighter alternatives
// Replace moment with date-fns
// Replace lodash with lodash-es

// ===== ISSUE 2: Module Not Found =====

// Error: "Module not found: Error: Can't resolve 'module-name'"

// Solutions:
// 1. Install missing package
npm install module-name

// 2. Check import path
// ❌ import &#123; Component &#125; from 'component';
// ✅ import &#123; Component &#125; from './component';

// 3. Add path alias in tsconfig.json
&#123;
  "compilerOptions": &#123;
    "paths": &#123;
      "@app/*": ["src/app/*"],
      "@shared/*": ["src/app/shared/*"]
    &#125;
  &#125;
&#125;

// ===== ISSUE 3: Memory Issues =====

// Error: "JavaScript heap out of memory"

// Solutions:
// 1. Increase Node memory
// package.json:
&#123;
  "scripts": &#123;
    "build": "node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build"
  &#125;
&#125;

// 2. Clear cache
rm -rf .angular/cache
rm -rf node_modules/.cache

// 3. Reduce parallel builds
// angular.json:
&#123;
  "cli": &#123;
    "cache": &#123;
      "enabled": true
    &#125;
  &#125;
&#125;

// ===== ISSUE 4: Slow Build Times =====

// Problem: Builds take too long

// Solutions:
// 1. Enable build cache (Angular 13+)
// Automatic with persistent cache

// 2. Use incremental builds
ng build --watch

// 3. Disable source maps in dev
&#123;
  "sourceMap": false
&#125;

// 4. Reduce type checking
&#123;
  "angularCompilerOptions": &#123;
    "strictTemplates": false
  &#125;
&#125;

// ===== ISSUE 5: CORS Errors in Development =====

// Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

// Solution: Configure proxy in angular.json
&#123;
  "serve": &#123;
    "options": &#123;
      "proxyConfig": "proxy.conf.json"
    &#125;
  &#125;
&#125;

// proxy.conf.json:
&#123;
  "/api": &#123;
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  &#125;
&#125;

// ===== ISSUE 6: Production Build Fails =====

// Error: Various errors only in production build

// Solutions:
// 1. Test production build locally
ng build --configuration production
ng serve --configuration production

// 2. Check AOT compilation errors
// Fix template type errors

// 3. Enable build optimizer carefully
// May cause issues with some libraries

// ===== ISSUE 7: Source Maps Not Working =====

// Problem: Can't debug production issues

// Solution: Use hidden source maps
&#123;
  "sourceMap": &#123;
    "scripts": true,
    "styles": true,
    "hidden": true  // Separate .map files not linked in code
  &#125;
&#125;

// ===== ISSUE 8: CSS Not Loading =====

// Problem: Styles not applied after build

// Solutions:
// 1. Check styleUrl vs styleUrls
@Component(&#123;
  styleUrls: ['./component.scss']  // Note: styleUrls (plural)
&#125;)

// 2. Import global styles in angular.json
&#123;
  "styles": [
    "src/styles.scss",
    "node_modules/library/styles.css"
  ]
&#125;

// 3. Check CSS file paths are correct

// ===== ISSUE 9: Environment Variables =====

// Problem: Environment variables not working

// Solution: Use file replacements
// angular.json:
&#123;
  "fileReplacements": [
    &#123;
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.prod.ts"
    &#125;
  ]
&#125;

// environment.ts:
export const environment = &#123;
  production: false,
  apiUrl: 'http://localhost:3000'
&#125;;

// environment.prod.ts:
export const environment = &#123;
  production: true,
  apiUrl: 'https://api.production.com'
&#125;;

// ===== ISSUE 10: Dependency Conflicts =====

// Error: "Unable to resolve dependency tree"

// Solutions:
// 1. Use --legacy-peer-deps
npm install --legacy-peer-deps

// 2. Update conflicting packages
npm update package-name

// 3. Check peer dependencies
npm list package-name

// 4. Clear package-lock and reinstall
rm package-lock.json
rm -rf node_modules
npm install

// ===== DEBUGGING TIPS =====

// 1. Verbose logging
ng build --verbose

// 2. Check webpack config
// With &#64;angular-builders/custom-webpack:
console.log(JSON.stringify(config, null, 2));

// 3. Use source maps in dev
- Set sourceMap: true in angular.json

// 4. Check browser console for errors
// Network tab shows failed resource loads

// 5. Validate angular.json syntax
// Use JSON validator or IDE`;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
