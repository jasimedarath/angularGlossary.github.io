import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Angular Glossary - Complete Developer Reference';
  hideHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Hide header on home page, show on Angular and React routes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.hideHeader = event.url === '/' || event.url === '';
    });

    // Set initial state
    this.hideHeader = this.router.url === '/' || this.router.url === '';
  }

  // Check if current route is React
  isReactRoute(): boolean {
    return this.router.url.startsWith('/react');
  }

  // Check if current route is Next.js
  isNextJsRoute(): boolean {
    return this.router.url.startsWith('/nextjs');
  }

  // Get page title based on route
  getPageTitle(): string {
    if (this.router.url.startsWith('/react')) {
      return 'React Glossary - Complete Developer Reference';
    }
    if (this.router.url.startsWith('/nextjs')) {
      return 'Next.js Glossary - Complete Developer Reference';
    }
    return 'Angular Glossary - Complete Developer Reference';
  }
  modules = [
    // Getting Started
    { title: 'Getting Started', link: '/angular/gettingstarted', category: 'Getting Started', framework: 'angular' },
    
    // Core Concepts
    { title: 'Modules', link: '/angular/modules', category: 'Core', framework: 'angular' },
    { title: 'Components', link: '/angular/components', category: 'Core', framework: 'angular' },
    { title: 'Directives', link: '/angular/directives', category: 'Core', framework: 'angular' },
    { title: 'Pipes', link: '/angular/pipes', category: 'Core', framework: 'angular' },
    { title: 'Services', link: '/angular/services', category: 'Core', framework: 'angular' },
    
    // Modern Angular (16+)
    { title: 'Signals', link: '/angular/signals', category: 'Modern', framework: 'angular' },
    { title: 'Control Flow (@if, @for)', link: '/angular/controlFlow', category: 'Modern', framework: 'angular' },
    { title: 'Deferrable Views (@defer)', link: '/angular/deferrableViews', category: 'Modern', framework: 'angular' },
    { title: 'Dependency Injection', link: '/angular/dependencyInjection', category: 'Modern', framework: 'angular' },
    { title: 'SSR & Hydration', link: '/angular/ssrHydration', category: 'Modern', framework: 'angular' },
    
    // Routing & Navigation
    { title: 'Routing', link: '/angular/routing', category: 'Routing', framework: 'angular' },
    { title: 'Guards', link: '/angular/guards', category: 'Routing', framework: 'angular' },
    
    // HTTP & State
    { title: 'Interceptors', link: '/angular/interceptors', category: 'HTTP', framework: 'angular' },
    { title: 'RxJS', link: '/angular/rxjs', category: 'State', framework: 'angular' },
    { title: 'NgRx', link: '/angular/ngrx', category: 'State', framework: 'angular' },
    
    // Forms & Validation
    { title: 'Forms', link: '/angular/forms', category: 'Forms', framework: 'angular' },
    
    // Advanced Concepts
    { title: 'Life Cycle Hooks', link: '/angular/lifeCycleHooks', category: 'Advanced', framework: 'angular' },
    { title: 'Change Detection', link: '/angular/changeDetection', category: 'Advanced', framework: 'angular' },
    
    // Testing & Build
    { title: 'Unit Testing', link: '/angular/unitTesting', category: 'Testing', framework: 'angular' },
    { title: 'Webpack', link: '/angular/webPack', category: 'Build', framework: 'angular' },
    
    // UI Library
    { title: 'Angular Material', link: '/angular/angularmaterial', category: 'UI', framework: 'angular' },
  ];

  reactModules = [
    // Getting Started
    { title: 'Getting Started', link: '/react/gettingstarted', category: 'Getting Started', framework: 'react' },
    
    // Basics
    { title: 'JSX', link: '/react/jsx', category: 'Basics', framework: 'react' },
    { title: 'Components', link: '/react/components', category: 'Basics', framework: 'react' },
    { title: 'Props', link: '/react/props', category: 'Basics', framework: 'react' },
    { title: 'State', link: '/react/state', category: 'Basics', framework: 'react' },
    { title: 'Events', link: '/react/events', category: 'Basics', framework: 'react' },
    
    // Core Concepts
    { title: 'Hooks', link: '/react/hooks', category: 'Core', framework: 'react' },
    { title: 'Lifecycle', link: '/react/lifecycle', category: 'Core', framework: 'react' },
    { title: 'Forms', link: '/react/forms', category: 'Core', framework: 'react' },
    { title: 'Conditional Rendering', link: '/react/conditional', category: 'Core', framework: 'react' },
    { title: 'Lists & Keys', link: '/react/lists', category: 'Core', framework: 'react' },
    
    // Advanced
    { title: 'Context API', link: '/react/context', category: 'Advanced', framework: 'react' },
    { title: 'React Router', link: '/react/router', category: 'Advanced', framework: 'react' },
    { title: 'Performance', link: '/react/performance', category: 'Advanced', framework: 'react' },
    { title: 'Advanced Patterns', link: '/react/advanced', category: 'Advanced', framework: 'react' },
    
    // Modern React
    { title: 'React 18 Features', link: '/react/react18', category: 'Modern', framework: 'react' },
    { title: 'TypeScript', link: '/react/typescript', category: 'Modern', framework: 'react' },
    
    // Ecosystem
    { title: 'State Management', link: '/react/statemanagement', category: 'Ecosystem', framework: 'react' },
    { title: 'Styling', link: '/react/styling', category: 'Ecosystem', framework: 'react' },
    { title: 'Data Fetching', link: '/react/datafetching', category: 'Ecosystem', framework: 'react' },
    
    // Testing
    { title: 'Testing', link: '/react/testing', category: 'Testing', framework: 'react' },
  ];

  nextjsModules = [
    // Getting Started
    { title: 'Getting Started', link: '/nextjs/gettingstarted', category: 'Getting Started', framework: 'nextjs' },
    
    // Core Concepts
    { title: 'App Router', link: '/nextjs/approuter', category: 'Core', framework: 'nextjs' },
    { title: 'Rendering Strategies', link: '/nextjs/rendering', category: 'Core', framework: 'nextjs' },
    { title: 'Data Fetching', link: '/nextjs/datafetching', category: 'Core', framework: 'nextjs' },
    { title: 'Server Components', link: '/nextjs/servercomponents', category: 'Core', framework: 'nextjs' },
    
    // API & Backend
    { title: 'API Routes', link: '/nextjs/apiroutes', category: 'API', framework: 'nextjs' },
    { title: 'Middleware', link: '/nextjs/middleware', category: 'API', framework: 'nextjs' },
    { title: 'Database', link: '/nextjs/database', category: 'API', framework: 'nextjs' },
    { title: 'Authentication', link: '/nextjs/authentication', category: 'API', framework: 'nextjs' },
    
    // Advanced
    { title: 'Optimization', link: '/nextjs/optimization', category: 'Advanced', framework: 'nextjs' },
    { title: 'Deployment', link: '/nextjs/deployment', category: 'Advanced', framework: 'nextjs' },
  ];

  displayHeader = () => this.hideHeader = !this.hideHeader;

  // Get current modules based on route
  get currentModules() {
    if (this.isNextJsRoute()) return this.nextjsModules;
    if (this.isReactRoute()) return this.reactModules;
    return this.modules;
  }

  // Get logo based on route
  get currentLogo() {
    if (this.isNextJsRoute()) {
      return { name: 'Next.js', color: '#000000', svg: 'nextjs-logo' };
    }
    if (this.isReactRoute()) {
      return { name: 'React', color: '#61dafb', svg: 'react-logo' };
    }
    return { name: 'Angular', color: '#dd0031', svg: 'angular-logo' };
  }

  // Group modules by category for better organization
  get categorizedModules() {
    const isReact = this.isReactRoute();
    const isNextJs = this.isNextJsRoute();
    const categories = isNextJs ?
      ['Getting Started', 'Core', 'API', 'Advanced'] :
      isReact ? 
      ['Getting Started', 'Basics', 'Core', 'Advanced', 'Modern', 'Ecosystem', 'Testing'] :
      ['Getting Started', 'Core', 'Modern', 'Routing', 'HTTP', 'State', 'Forms', 'Advanced', 'Testing', 'Build', 'UI'];
    
    const currentMods = this.currentModules;
    return categories.map(category => ({
      name: category,
      items: currentMods.filter(m => m.category === category)
    })).filter(c => c.items.length > 0);
  }
}
