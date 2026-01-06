import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-angularmaterial',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-angularmaterial.component.html',
  styleUrl: './learn-angularmaterial.component.scss'
})
export class LearnAngularmaterialComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  introduction: string = `// Angular Material - Introduction and Setup
// Angular Material is Google's official Material Design component library for Angular

// Installation
npm install @angular/material @angular/cdk @angular/animations

// Setup in main.ts or app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),  // Required for Material animations
    // ... other providers
  ]
};

// For Module-based apps (app.module.ts):
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ]
})
export class AppModule { }

// Key Benefits:
// ✅ Pre-built, accessible UI components
// ✅ Consistent Material Design styling
// ✅ Responsive and mobile-friendly
// ✅ Customizable theming system
// ✅ Built-in accessibility (ARIA)
// ✅ Excellent documentation
// ✅ Active community and support

// Core Concepts:
// 1. Modular: Import only what you need
// 2. Theming: Customize colors and styles
// 3. Accessibility: WCAG compliant out of the box
// 4. Responsive: Works on all screen sizes
// 5. Animations: Smooth transitions and effects

// Importing Components (Standalone):
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  template: \`
    <mat-card>
      <mat-card-header>
        <mat-card-title>Welcome</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Angular Material makes development faster!</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">Get Started</button>
      </mat-card-actions>
    </mat-card>
  \`
})
export class MyComponent {}

// What's Included:
// - Form Controls (input, select, checkbox, radio, slider)
// - Navigation (toolbar, sidenav, menu, tabs)
// - Layout (card, grid list, divider, expansion panel)
// - Buttons & Indicators (button, badge, progress bar, spinner)
// - Popups & Modals (dialog, snackbar, tooltip, bottom sheet)
// - Data Tables (table, paginator, sort)
// - Advanced (autocomplete, datepicker, tree, stepper)`;

  commonComponents: string = `// Common Angular Material Components

// ===== BUTTONS =====
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Basic buttons
<button mat-button>Basic</button>
<button mat-raised-button color="primary">Raised Primary</button>
<button mat-flat-button color="accent">Flat Accent</button>
<button mat-stroked-button color="warn">Stroked Warn</button>

// Icon buttons
<button mat-icon-button>
  <mat-icon>favorite</mat-icon>
</button>
<button mat-fab color="primary">
  <mat-icon>add</mat-icon>
</button>
<button mat-mini-fab color="accent">
  <mat-icon>edit</mat-icon>
</button>

// ===== FORM FIELDS =====
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Template-driven
<mat-form-field appearance="fill">
  <mat-label>Name</mat-label>
  <input matInput [(ngModel)]="name" placeholder="Enter your name">
  <mat-hint>Enter your full name</mat-hint>
</mat-form-field>

// Reactive forms
export class FormComponent {
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
}

<form [formGroup]="formGroup">
  <mat-form-field appearance="outline">
    <mat-label>Email</mat-label>
    <input matInput type="email" formControlName="email">
    <mat-error *ngIf="formGroup.get('email')?.hasError('required')">
      Email is required
    </mat-error>
    <mat-error *ngIf="formGroup.get('email')?.hasError('email')">
      Invalid email format
    </mat-error>
  </mat-form-field>
</form>

// ===== SELECT =====
import { MatSelectModule } from '@angular/material/select';

<mat-form-field>
  <mat-label>Choose option</mat-label>
  <mat-select [(value)]="selectedValue">
    <mat-option value="option1">Option 1</mat-option>
    <mat-option value="option2">Option 2</mat-option>
    <mat-option value="option3">Option 3</mat-option>
  </mat-select>
</mat-form-field>

// ===== CHECKBOX & RADIO =====
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

<mat-checkbox [(ngModel)]="checked">Check me</mat-checkbox>

<mat-radio-group [(ngModel)]="selectedOption">
  <mat-radio-button value="1">Option 1</mat-radio-button>
  <mat-radio-button value="2">Option 2</mat-radio-button>
</mat-radio-group>

// ===== DIALOG =====
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export class MyComponent {
  constructor(private dialog: MatDialog) {}
  
  openDialog() {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '400px',
      data: { name: 'John' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }
}

@Component({
  selector: 'my-dialog',
  template: \`
    <h2 mat-dialog-title>Delete Confirmation</h2>
    <mat-dialog-content>
      Are you sure you want to delete this item?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        Delete
      </button>
    </mat-dialog-actions>
  \`
})
export class MyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

// ===== SNACKBAR =====
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export class MyComponent {
  constructor(private snackBar: MatSnackBar) {}
  
  showNotification() {
    this.snackBar.open('Action completed!', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

// ===== CARDS =====
import { MatCardModule } from '@angular/material/card';

<mat-card>
  <mat-card-header>
    <mat-card-title>Card Title</mat-card-title>
    <mat-card-subtitle>Card Subtitle</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="image.jpg" alt="Image">
  <mat-card-content>
    <p>Card content goes here</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>`;

  theming: string = `// Angular Material Theming

// ===== PREDEFINED THEMES =====
// In styles.scss, import one of the pre-built themes:
@import '@angular/material/prebuilt-themes/indigo-pink.css';
// Other options:
// - deeppurple-amber.css
// - pink-bluegrey.css
// - purple-green.css

// ===== CUSTOM THEME =====
// styles.scss
@use '@angular/material' as mat;

// Include core Material styles (once per app)
@include mat.core();

// Define your color palette
$my-primary: mat.define-palette(mat.$indigo-palette);
$my-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$my-warn: mat.define-palette(mat.$red-palette);

// Create the theme
$my-theme: mat.define-light-theme((
  color: (
    primary: $my-primary,
    accent: $my-accent,
    warn: $my-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

// Apply the theme to all Material components
@include mat.all-component-themes($my-theme);

// ===== DARK THEME =====
$dark-theme: mat.define-dark-theme((
  color: (
    primary: $my-primary,
    accent: $my-accent,
    warn: $my-warn,
  )
));

// Apply dark theme to specific class
.dark-theme {
  @include mat.all-component-colors($dark-theme);
}

// Toggle dark theme in component:
<div [class.dark-theme]="isDarkMode">
  <app-content></app-content>
</div>

// ===== CUSTOM COLORS =====
// Define custom palette
$custom-primary: (
  50: #e3f2fd,
  100: #bbdefb,
  200: #90caf9,
  300: #64b5f6,
  400: #42a5f5,
  500: #2196f3,  // Main color
  600: #1e88e5,
  700: #1976d2,
  800: #1565c0,
  900: #0d47a1,
  contrast: (
    50: rgba(black, 0.87),
    100: rgba(black, 0.87),
    200: rgba(black, 0.87),
    300: rgba(black, 0.87),
    400: rgba(black, 0.87),
    500: white,
    600: white,
    700: white,
    800: white,
    900: white,
  )
);

$my-custom-primary: mat.define-palette($custom-primary, 500);

// ===== TYPOGRAPHY =====
$custom-typography: mat.define-typography-config(
  $font-family: 'Roboto, sans-serif',
  $headline-1: mat.define-typography-level(96px, 96px, 300),
  $headline-2: mat.define-typography-level(60px, 60px, 300),
  $headline-3: mat.define-typography-level(48px, 50px, 400),
  $headline-4: mat.define-typography-level(34px, 40px, 400),
  $headline-5: mat.define-typography-level(24px, 32px, 400),
  $headline-6: mat.define-typography-level(20px, 32px, 500),
  $subtitle-1: mat.define-typography-level(16px, 28px, 400),
  $subtitle-2: mat.define-typography-level(14px, 24px, 500),
  $body-1: mat.define-typography-level(16px, 24px, 400),
  $body-2: mat.define-typography-level(14px, 20px, 400),
  $caption: mat.define-typography-level(12px, 20px, 400),
  $button: mat.define-typography-level(14px, 14px, 500),
);

// Apply typography
@include mat.all-component-typographies($custom-typography);

// ===== COMPONENT-SPECIFIC THEMING =====
// Theme only specific components
@include mat.button-theme($my-theme);
@include mat.card-theme($my-theme);
@include mat.form-field-theme($my-theme);

// ===== DENSITY =====
// Adjust component density (compact or spacious)
$my-theme: mat.define-light-theme((
  color: (...),
  typography: (...),
  density: -2,  // Range: 0 (default) to -5 (most compact)
));

// Component-specific density
@include mat.button-density(-1);
@include mat.form-field-density(-2);

// ===== ACCESSING THEME COLORS IN COMPONENTS =====
// component.scss
@use '@angular/material' as mat;

.my-class {
  background-color: mat.get-color-from-palette($my-primary, 500);
  color: mat.get-color-from-palette($my-primary, '500-contrast');
}

// Using CSS variables (Angular 15+)
.my-element {
  background-color: var(--mat-primary-500);
  color: var(--mat-primary-500-contrast);
}`;

  customThemes: string = `// Creating Custom Material Themes

// ===== MULTI-THEME SETUP =====
// styles.scss
@use '@angular/material' as mat;

@include mat.core();

// Define palettes
$primary: mat.define-palette(mat.$indigo-palette);
$accent: mat.define-palette(mat.$pink-palette);
$warn: mat.define-palette(mat.$red-palette);

// Light theme
$light-theme: mat.define-light-theme((
  color: (
    primary: $primary,
    accent: $accent,
    warn: $warn,
  )
));

// Dark theme
$dark-theme: mat.define-dark-theme((
  color: (
    primary: $primary,
    accent: $accent,
    warn: $warn,
  )
));

// Apply light theme by default
@include mat.all-component-themes($light-theme);

// Apply dark theme when class is present
.dark-theme {
  @include mat.all-component-colors($dark-theme);
}

// ===== THEME SWITCHING SERVICE =====
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkMode = signal(false);
  
  toggleTheme() {
    this.isDarkMode.update(val => !val);
    this.applyTheme();
  }
  
  private applyTheme() {
    const body = document.body;
    if (this.isDarkMode()) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
  
  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode.set(savedTheme === 'dark');
    this.applyTheme();
  }
}

// In app.component.ts
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themeService.loadTheme();
  }
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

// Template
<button mat-icon-button (click)="toggleTheme()">
  <mat-icon>{{ themeService.isDarkMode() ? 'dark_mode' : 'light_mode' }}</mat-icon>
</button>

// ===== BRAND-SPECIFIC THEME =====
// Create palette matching your brand colors
$brand-primary: (
  50: #e8eaf6,
  100: #c5cae9,
  200: #9fa8da,
  300: #7986cb,
  400: #5c6bc0,
  500: #3f51b5,  // Your brand color
  600: #3949ab,
  700: #303f9f,
  800: #283593,
  900: #1a237e,
  contrast: (
    50: rgba(black, 0.87),
    100: rgba(black, 0.87),
    200: rgba(black, 0.87),
    300: white,
    400: white,
    500: white,
    600: white,
    700: white,
    800: white,
    900: white,
  )
);

$brand-accent: (
  // Define accent colors
  500: #ff4081,
  // ... other shades
);

// ===== MULTIPLE THEMED SECTIONS =====
// Create different themes for different sections
$admin-theme: mat.define-light-theme((
  color: (
    primary: mat.define-palette(mat.$deep-purple-palette),
    accent: mat.define-palette(mat.$amber-palette),
  )
));

$user-theme: mat.define-light-theme((
  color: (
    primary: mat.define-palette(mat.$blue-palette),
    accent: mat.define-palette(mat.$green-palette),
  )
));

.admin-section {
  @include mat.all-component-colors($admin-theme);
}

.user-section {
  @include mat.all-component-colors($user-theme);
}

// ===== CUSTOM COMPONENT STYLING =====
// Override Material component styles
.mat-mdc-button {
  border-radius: 20px;
  text-transform: uppercase;
}

.mat-mdc-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

// Using ::ng-deep (use sparingly)
::ng-deep .mat-mdc-form-field {
  .mat-mdc-text-field-wrapper {
    background-color: #f5f5f5;
  }
}

// ===== CSS VARIABLES FOR DYNAMIC THEMING =====
:root {
  --primary-color: #3f51b5;
  --accent-color: #ff4081;
  --warn-color: #f44336;
}

// Use in components
.custom-element {
  background-color: var(--primary-color);
  color: white;
}

// Change dynamically with JavaScript
document.documentElement.style.setProperty('--primary-color', '#2196f3');

// ===== MATERIAL 3 (M3) THEMING =====
// Angular Material 17+ supports Material 3
$m3-theme: mat.define-theme((
  color: (
    theme-type: light,
    primary: mat.$azure-palette,
    tertiary: mat.$blue-palette,
  ),
  typography: (
    brand-family: 'Comic Sans MS',
    plain-family: 'Comic Sans MS',
  ),
  density: (
    scale: 0
  )
));

@include mat.all-component-themes($m3-theme);`;

  responsiveLayouts: string = `// Responsive Layouts with Angular Material

// ===== ANGULAR CDK LAYOUT =====
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export class ResponsiveComponent {
  isMobile$ = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(map(result => result.matches));
  
  constructor(private breakpointObserver: BreakpointObserver) {}
}

// In template
<div *ngIf="isMobile$ | async; else desktop">
  <app-mobile-layout></app-mobile-layout>
</div>
<ng-template #desktop>
  <app-desktop-layout></app-desktop-layout>
</ng-template>

// ===== RESPONSIVE SIDENAV =====
import { MatSidenavModule } from '@angular/material/sidenav';

export class LayoutComponent {
  isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  
  constructor(private breakpointObserver: BreakpointObserver) {}
}

<mat-sidenav-container>
  <mat-sidenav 
    [mode]="(isHandset$ | async) ? 'over' : 'side'"
    [opened]="!(isHandset$ | async)"
    class="sidenav">
    <!-- Sidebar content -->
  </mat-sidenav>
  
  <mat-sidenav-content>
    <!-- Main content -->
  </mat-sidenav-content>
</mat-sidenav-container>

// ===== RESPONSIVE GRID =====
import { MatGridListModule } from '@angular/material/grid-list';

export class GridComponent {
  cols$ = this.breakpointObserver
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ])
    .pipe(
      map(result => {
        if (result.breakpoints[Breakpoints.XSmall]) return 1;
        if (result.breakpoints[Breakpoints.Small]) return 2;
        if (result.breakpoints[Breakpoints.Medium]) return 3;
        if (result.breakpoints[Breakpoints.Large]) return 4;
        return 6;
      })
    );
}

<mat-grid-list [cols]="cols$ | async" rowHeight="200px">
  <mat-grid-tile *ngFor="let item of items">
    <mat-card>{{ item.title }}</mat-card>
  </mat-grid-tile>
</mat-grid-list>

// ===== BREAKPOINT CONSTANTS =====
Breakpoints.XSmall: '(max-width: 599.98px)'
Breakpoints.Small: '(min-width: 600px) and (max-width: 959.98px)'
Breakpoints.Medium: '(min-width: 960px) and (max-width: 1279.98px)'
Breakpoints.Large: '(min-width: 1280px) and (max-width: 1919.98px)'
Breakpoints.XLarge: '(min-width: 1920px)'

Breakpoints.Handset: Portrait and Landscape phone
Breakpoints.Tablet: Portrait and Landscape tablet
Breakpoints.Web: Desktop and large screens

// ===== RESPONSIVE TOOLBAR =====
<mat-toolbar color="primary">
  <button mat-icon-button *ngIf="isHandset$ | async" (click)="drawer.toggle()">
    <mat-icon>menu</mat-icon>
  </button>
  <span>My App</span>
  <span class="spacer"></span>
  <div *ngIf="!(isHandset$ | async)">
    <button mat-button>Home</button>
    <button mat-button>About</button>
    <button mat-button>Contact</button>
  </div>
</mat-toolbar>

// Styles
.spacer {
  flex: 1 1 auto;
}

// ===== RESPONSIVE TABLE =====
<div class="table-container">
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
    <!-- Desktop: Show all columns -->
    <ng-container *ngIf="!(isHandset$ | async)">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let element">{{element.id}}</td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let element">{{element.name}}</td>
      </ng-container>
      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let element">{{element.email}}</td>
      </ng-container>
      
      <tr mat-header-row *matHeaderRowDef="['id', 'name', 'email']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['id', 'name', 'email']"></tr>
    </ng-container>
    
    <!-- Mobile: Compact view -->
    <ng-container *ngIf="isHandset$ | async">
      <ng-container matColumnDef="compact">
        <th mat-header-cell *matHeaderCellDef>Users</th>
        <td mat-cell *matCellDef="let element">
          <div class="mobile-row">
            <strong>{{element.name}}</strong>
            <small>{{element.email}}</small>
          </div>
        </td>
      </ng-container>
      
      <tr mat-header-row *matHeaderRowDef="['compact']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['compact']"></tr>
    </ng-container>
  </table>
</div>

// ===== FLEX LAYOUT PATTERNS =====
// Using CSS Flexbox with Material
<div class="flex-container">
  <mat-card class="flex-item">Card 1</mat-card>
  <mat-card class="flex-item">Card 2</mat-card>
  <mat-card class="flex-item">Card 3</mat-card>
</div>

// Styles
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.flex-item {
  flex: 1 1 300px;  // Grow, shrink, base width
  min-width: 250px;
  max-width: 400px;
}

@media (max-width: 600px) {
  .flex-item {
    flex: 1 1 100%;
  }
}

// ===== CONTAINER QUERIES (Modern approach) =====
.card-container {
  container-type: inline-size;
}

@container (min-width: 600px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}`;

  accessibility: string = `// Accessibility in Angular Material

// Angular Material components are WCAG 2.1 Level AA compliant by default
// But you need to ensure proper usage for full accessibility

// ===== ARIA LABELS =====
// Always provide labels for icon buttons
<button mat-icon-button aria-label="Delete item">
  <mat-icon>delete</mat-icon>
</button>

<button mat-fab aria-label="Add new item">
  <mat-icon>add</mat-icon>
</button>

// ===== FORM ACCESSIBILITY =====
// Material form fields automatically handle many ARIA attributes
<mat-form-field>
  <mat-label>Email Address</mat-label>
  <input matInput type="email" required>
  <mat-error>Please enter a valid email</mat-error>
  <mat-hint>We'll never share your email</mat-hint>
</mat-form-field>

// Generates proper ARIA attributes:
// - aria-required
// - aria-invalid
// - aria-describedby (for hints and errors)

// ===== KEYBOARD NAVIGATION =====
// Material components support keyboard navigation out of the box:
// - Tab/Shift+Tab: Navigate between focusable elements
// - Enter/Space: Activate buttons and checkboxes
// - Arrow keys: Navigate menu items, select options
// - Escape: Close dialogs and overlays

// Custom keyboard handling
<div (keydown.enter)="onEnter()" 
     (keydown.escape)="onEscape()"
     tabindex="0">
  Keyboard accessible div
</div>

// ===== FOCUS MANAGEMENT =====
import { FocusMonitor } from '@angular/cdk/a11y';

export class MyComponent implements OnInit, OnDestroy {
  constructor(private focusMonitor: FocusMonitor, private el: ElementRef) {}
  
  ngOnInit() {
    this.focusMonitor.monitor(this.el.nativeElement);
  }
  
  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.el.nativeElement);
  }
}

// Auto-focus on dialog open
const dialogRef = this.dialog.open(MyDialogComponent, {
  autoFocus: true  // Focus first focusable element
});

// ===== LIVE ANNOUNCER =====
// Announce dynamic content to screen readers
import { LiveAnnouncer } from '@angular/cdk/a11y';

export class MyComponent {
  constructor(private liveAnnouncer: LiveAnnouncer) {}
  
  saveData() {
    // ... save logic
    this.liveAnnouncer.announce('Data saved successfully', 'polite');
  }
  
  deleteItem() {
    this.liveAnnouncer.announce('Item deleted', 'assertive');
  }
}

// Politeness levels:
// - 'off': Not announced
// - 'polite': Announced when screen reader is idle
// - 'assertive': Interrupts current announcements

// ===== TABLE ACCESSIBILITY =====
<table mat-table [dataSource]="dataSource" 
       aria-label="User list table"
       role="table">
  
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef scope="col">Name</th>
    <td mat-cell *matCellDef="let user">{{user.name}}</td>
  </ng-container>
  
  <tr mat-header-row *matHeaderRowDef="columns"></tr>
  <tr mat-row *matRowDef="let row; columns: columns"></tr>
</table>

// ===== DIALOG ACCESSIBILITY =====
const dialogRef = this.dialog.open(MyDialogComponent, {
  role: 'alertdialog',  // or 'dialog'
  ariaLabel: 'Confirmation dialog',
  ariaDescribedBy: 'dialog-description'
});

@Component({
  template: \`
    <h2 mat-dialog-title id="dialog-title">Confirm Action</h2>
    <mat-dialog-content id="dialog-description">
      Are you sure you want to proceed?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Confirm
      </button>
    </mat-dialog-actions>
  \`
})
export class MyDialogComponent {}

// ===== COLOR CONTRAST =====
// Material themes provide good contrast by default
// But verify custom colors meet WCAG requirements

// Minimum contrast ratios:
// - Normal text: 4.5:1
// - Large text (18px+ or 14px+ bold): 3:1
// - UI components: 3:1

// Check contrast in your theme:
.custom-button {
  background-color: #1976d2;  // Check this
  color: white;               // against this
}

// ===== SKIP NAVIGATION =====
// Allow keyboard users to skip to main content
<a class="skip-link" href="#main-content">
  Skip to main content
</a>

<app-header></app-header>
<app-sidenav></app-sidenav>

<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>

// Styles
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  z-index: 100;
  
  &:focus {
    top: 0;
  }
}

// ===== ACCESSIBLE TOOLTIPS =====
<button mat-button 
        matTooltip="Additional information"
        [matTooltipShowDelay]="500"
        aria-label="Save document with additional information">
  Save
</button>

// ===== TESTING ACCESSIBILITY =====
// 1. Keyboard-only navigation (unplug mouse)
// 2. Screen reader testing (NVDA, JAWS, VoiceOver)
// 3. Automated tools (axe, Lighthouse)
// 4. Color contrast checkers
// 5. Zoom to 200% and test usability

// ===== BEST PRACTICES =====
// ✅ Always provide text alternatives for icons
// ✅ Ensure sufficient color contrast
// ✅ Support keyboard navigation
// ✅ Provide focus indicators
// ✅ Use semantic HTML
// ✅ Test with screen readers
// ✅ Announce dynamic content changes
// ✅ Manage focus in dialogs and dynamic content
// ❌ Never rely on color alone to convey information
// ❌ Don't use positive tabindex (0 or -1 only)`;

  bestPractices: string = `// Angular Material Best Practices

// ===== MODULAR IMPORTS =====
// ✅ Good: Import only what you need
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatIconModule]
})

// ❌ Bad: Don't create barrel modules with all Material modules
// It defeats tree-shaking and increases bundle size

// ===== THEMING CONSISTENTLY =====
// Use Material's color system instead of custom colors
<button mat-raised-button color="primary">Primary</button>
<button mat-raised-button color="accent">Accent</button>
<button mat-raised-button color="warn">Warn</button>

// ❌ Avoid: Custom inline styles
<button mat-raised-button style="background: red">Bad</button>

// ✅ Use theme colors in styles
.my-element {
  color: mat.get-color-from-palette($primary, 500);
}

// ===== FORM FIELD APPEARANCE =====
// Choose consistent appearance across your app
<mat-form-field appearance="fill">    // Default, modern
<mat-form-field appearance="outline"> // Material Design
<mat-form-field appearance="legacy">  // Deprecated

// Stick to one appearance for consistency

// ===== PROPER ICON USAGE =====
// Register Material Icons in index.html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

// Use semantic icon names
<mat-icon>home</mat-icon>
<mat-icon>person</mat-icon>
<mat-icon>settings</mat-icon>

// Custom SVG icons
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'custom-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/custom.svg')
    );
  }
}

<mat-icon svgIcon="custom-icon"></mat-icon>

// ===== RESPONSIVE DESIGN =====
// Use CDK Layout for responsive behavior
import { BreakpointObserver } from '@angular/cdk/layout';

// Adapt UI based on screen size
isMobile$ = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(map(result => result.matches));

// ===== PERFORMANCE OPTIMIZATION =====

// 1. Virtual Scrolling for Large Lists
import { ScrollingModule } from '@angular/cdk/scrolling';

<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <mat-list-item *cdkVirtualFor="let item of items">
    {{item.name}}
  </mat-list-item>
</cdk-virtual-scroll-viewport>

// 2. Lazy Load Dialog Components
loadDialog() {
  import('./my-dialog/my-dialog.component').then(m => {
    this.dialog.open(m.MyDialogComponent);
  });
}

// 3. OnPush Change Detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// 4. Pagination for Tables
<mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[5, 10, 25]">
</mat-paginator>

// ===== PROPER DIALOG HANDLING =====
export class MyComponent {
  constructor(private dialog: MatDialog) {}
  
  openDialog() {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '400px',
      data: { userId: 123 },
      disableClose: true,  // Prevent accidental closes
      autoFocus: true      // Focus first element
    });
    
    // Always handle the result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleResult(result);
      }
    });
  }
}

// ===== SNACKBAR CONFIGURATION =====
// Provide action and reasonable duration
this.snackBar.open('Item deleted', 'Undo', {
  duration: 5000,  // 5 seconds
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  panelClass: ['custom-snackbar']
});

// Don't show too many snackbars at once
// Queue them or dismiss previous ones

// ===== TABLE BEST PRACTICES =====
// 1. Always provide data source
dataSource = new MatTableDataSource<User>(this.users);

// 2. Add sorting
@ViewChild(MatSort) sort!: MatSort;

ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}

<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let row">{{row.name}}</td>
  </ng-container>
</table>

// 3. Add filtering
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

// 4. Add pagination
@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

// ===== ERROR HANDLING =====
// Provide clear error messages
<mat-form-field>
  <input matInput [formControl]="emailControl">
  <mat-error *ngIf="emailControl.hasError('required')">
    Email is required
  </mat-error>
  <mat-error *ngIf="emailControl.hasError('email')">
    Please enter a valid email
  </mat-error>
</mat-form-field>

// ===== ACCESSIBILITY =====
// 1. Always provide aria-labels for icon buttons
<button mat-icon-button aria-label="Delete item">
  <mat-icon>delete</mat-icon>
</button>

// 2. Use proper heading hierarchy
<h1 mat-dialog-title>Main Title</h1>
<h2>Subtitle</h2>

// 3. Ensure keyboard navigation works
// Test with Tab, Enter, Space, Escape

// ===== COMMON MISTAKES TO AVOID =====
// ❌ Importing entire Material module
// ❌ Not handling dialog results
// ❌ Forgetting to unsubscribe (use async pipe)
// ❌ Not providing aria-labels
// ❌ Inconsistent form field appearances
// ❌ Not testing on mobile devices
// ❌ Overriding Material styles with !important
// ❌ Not using Material's theming system

// ===== TESTING MATERIAL COMPONENTS =====
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

it('should click button', async () => {
  const loader = TestbedHarnessEnvironment.loader(fixture);
  const button = await loader.getHarness(MatButtonHarness);
  await button.click();
  
  expect(component.clicked).toBeTruthy();
});`;

  performanceTips: string = `// Angular Material Performance Tips

// ===== BUNDLE SIZE OPTIMIZATION =====

// 1. Import Only Needed Modules
// ✅ Good
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// ❌ Bad - Imports everything
import { MaterialModule } from './material.module';

// 2. Lazy Load Material Modules
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)  // Material modules loaded here
  }
];

// 3. Use CDK Instead of Full Components When Possible
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
// CDK is lighter than full Material components

// ===== RENDERING PERFORMANCE =====

// 1. Virtual Scrolling for Long Lists
import { ScrollingModule } from '@angular/cdk/scrolling';

<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <mat-list>
    <mat-list-item *cdkVirtualFor="let item of items">
      {{item.name}}
    </mat-list-item>
  </mat-list>
</cdk-virtual-scroll-viewport>

// Benefits:
// - Only renders visible items
// - Dramatically improves performance with 1000+ items
// - Smooth scrolling

// 2. OnPush Change Detection
@Component({
  selector: 'app-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <table mat-table [dataSource]="dataSource">
      <!-- table content -->
    </table>
  \`
})
export class DataTableComponent {
  // Component only checks when inputs change
}

// 3. TrackBy Functions with *ngFor
<mat-list>
  <mat-list-item *ngFor="let item of items; trackBy: trackById">
    {{item.name}}
  </mat-list-item>
</mat-list>

trackById(index: number, item: any): any {
  return item.id;  // Use unique identifier
}

// ===== TABLE PERFORMANCE =====

// 1. Pagination
<mat-paginator 
  [length]="totalItems"
  [pageSize]="25"
  [pageSizeOptions]="[25, 50, 100]"
  (page)="onPageChange($event)">
</mat-paginator>

// Load only current page data from server
onPageChange(event: PageEvent) {
  this.loadData(event.pageIndex, event.pageSize);
}

// 2. Server-Side Sorting and Filtering
<table mat-table [dataSource]="dataSource" matSort 
       (matSortChange)="onSortChange($event)">
</table>

onSortChange(sort: Sort) {
  this.loadData({
    sortField: sort.active,
    sortDirection: sort.direction
  });
}

// 3. Lazy Data Loading
export class TableComponent {
  dataSource = new MatTableDataSource<User>();
  
  constructor(private userService: UserService) {
    this.loadInitialData();
  }
  
  loadInitialData() {
    // Load only what's visible
    this.userService.getUsers(0, 25).subscribe(users => {
      this.dataSource.data = users;
    });
  }
}

// ===== DIALOG PERFORMANCE =====

// 1. Lazy Load Dialog Components
async openHeavyDialog() {
  const { HeavyDialogComponent } = await import('./heavy-dialog.component');
  this.dialog.open(HeavyDialogComponent);
}

// 2. Close Dialogs Properly
const dialogRef = this.dialog.open(MyDialogComponent);

dialogRef.afterClosed().subscribe(() => {
  // Cleanup if needed
});

// 3. Reuse Dialog Instances
// Don't create new dialogs for the same purpose repeatedly

// ===== ICON PERFORMANCE =====

// 1. Use Icon Fonts (fastest)
<mat-icon>home</mat-icon>

// 2. Preload Critical SVG Icons
constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  // Register at app start
  iconRegistry.addSvgIconSet(
    sanitizer.bypassSecurityTrustResourceUrl('assets/icons.svg')
  );
}

// 3. Icon Caching
// Material automatically caches loaded icons

// ===== ANIMATION PERFORMANCE =====

// 1. Disable Animations on Slow Devices
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

const isSlow = detectSlowDevice();

@NgModule({
  imports: [
    isSlow ? NoopAnimationsModule : BrowserAnimationsModule
  ]
})

// 2. Reduce Motion for Accessibility
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

// ===== FORM PERFORMANCE =====

// 1. Use Reactive Forms with OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });
}

// 2. Debounce Input Events
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

this.searchControl.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged()
  )
  .subscribe(value => {
    this.search(value);
  });

// 3. Async Validation
emailControl = new FormControl('', {
  validators: [Validators.required, Validators.email],
  asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
  updateOn: 'blur'  // Validate only on blur, not every keystroke
});

// ===== MEMORY OPTIMIZATION =====

// 1. Unsubscribe from Observables
private destroy$ = new Subject<void>();

ngOnInit() {
  this.dataSource.connect()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.handleData(data));
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// 2. Use Async Pipe (auto-unsubscribes)
// Template
<div *ngIf="data$ | async as data">
  {{ data.value }}
</div>

// 3. Dispose Dialog References
const dialogRef = this.dialog.open(MyDialogComponent);

ngOnDestroy() {
  dialogRef?.close();
}

// ===== MONITORING PERFORMANCE =====

// 1. Bundle Size Analysis
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json

// 2. Runtime Performance
// Use Chrome DevTools Performance tab

// 3. Lighthouse Audit
// Check Performance score

// 4. Material Specific Metrics
console.time('table-render');
this.dataSource.data = newData;
this.changeDetectorRef.detectChanges();
console.timeEnd('table-render');

// ===== BEST PRACTICES SUMMARY =====
// ✅ Import only needed Material modules
// ✅ Use virtual scrolling for long lists (100+ items)
// ✅ Implement pagination for tables
// ✅ Use OnPush change detection
// ✅ Add trackBy to *ngFor
// ✅ Lazy load heavy components
// ✅ Debounce user input
// ✅ Use async pipe for subscriptions
// ✅ Server-side pagination/sorting for large datasets
// ✅ Monitor bundle size regularly

// ❌ Don't import all Material modules
// ❌ Don't render 1000+ items without virtual scrolling
// ❌ Don't forget to unsubscribe
// ❌ Don't use *ngFor without trackBy for large lists
// ❌ Don't load all data client-side`;

}
