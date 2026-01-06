import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Glossary - Complete Developer Reference';
  hideHeader: boolean = false;
  modules = [
    // Core Concepts
    { title: 'Modules', link: 'modules', category: 'Core' },
    { title: 'Components', link: 'components', category: 'Core' },
    { title: 'Directives', link: 'directives', category: 'Core' },
    { title: 'Pipes', link: 'pipes', category: 'Core' },
    { title: 'Services', link: 'services', category: 'Core' },
    
    // Modern Angular (16+)
    { title: 'Signals', link: 'signals', category: 'Modern' },
    { title: 'Control Flow (@if, @for)', link: 'controlFlow', category: 'Modern' },
    { title: 'Deferrable Views (@defer)', link: 'deferrableViews', category: 'Modern' },
    { title: 'Dependency Injection', link: 'dependencyInjection', category: 'Modern' },
    { title: 'SSR & Hydration', link: 'ssrHydration', category: 'Modern' },
    
    // Routing & Navigation
    { title: 'Routing', link: 'routing', category: 'Routing' },
    { title: 'Guards', link: 'guards', category: 'Routing' },
    
    // HTTP & State
    { title: 'Interceptors', link: 'interceptors', category: 'HTTP' },
    { title: 'RxJS', link: 'rxjs', category: 'State' },
    { title: 'NgRx', link: 'ngrx', category: 'State' },
    
    // Forms & Validation
    { title: 'Forms', link: 'forms', category: 'Forms' },
    
    // Advanced Concepts
    { title: 'Life Cycle Hooks', link: 'lifeCycleHooks', category: 'Advanced' },
    { title: 'Change Detection', link: 'changeDetection', category: 'Advanced' },
    
    // Testing & Build
    { title: 'Unit Testing', link: 'unitTesting', category: 'Testing' },
    { title: 'Webpack', link: 'webPack', category: 'Build' },
    
    // UI Library
    { title: 'Angular Material', link: 'angularmaterial', category: 'UI' },
  ];

  displayHeader = () => this.hideHeader = !this.hideHeader;

  // Group modules by category for better organization
  get categorizedModules() {
    const categories = ['Core', 'Modern', 'Routing', 'HTTP', 'State', 'Forms', 'Advanced', 'Testing', 'Build', 'UI'];
    return categories.map(category => ({
      name: category,
      items: this.modules.filter(m => m.category === category)
    })).filter(c => c.items.length > 0);
  }
}
