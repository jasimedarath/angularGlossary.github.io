import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-changedetection',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-changedetection.component.html',
  styleUrl: './learn-changedetection.component.scss'
})
export class LearnChangedetectionComponent implements AfterViewChecked {
  
  zoneJS = `// How Zone.js Works
// Zone.js patches async APIs to track changes

// Async operations that trigger change detection:
- DOM events (click, input, etc.)
- setTimeout/setInterval
- HTTP requests (HttpClient)
- Promises
- Observables (with async pipe)

// Zone.js creates a "zone" context
class ApplicationRef {
  tick() {
    this.zones.forEach(zone => {
      zone.checkAndUpdateView(); // Check entire component tree
    });
  }
}

// Browser event example
button.addEventListener('click', () => {
  // Zone.js wraps this callback
  Zone.current.run(() => {
    // Your code runs here
    this.count++;
    
    // After callback completes, Zone.js triggers change detection
    applicationRef.tick();
  });
});`;

  defaultStrategy = `// Default Change Detection Strategy
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: \`
    <div>
      <h3>Users (Default Strategy)</h3>
      <div *ngFor="let user of users">
        {{ user.name }} - {{ user.email }}
      </div>
      <button (click)="addUser()">Add User</button>
    </div>
  \`
})
export class UserListComponent {
  users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ];

  addUser() {
    // This triggers change detection for ENTIRE component tree
    this.users.push({
      id: this.users.length + 1,
      name: 'New User',
      email: 'new@example.com'
    });
  }
}

// With default strategy:
// 1. Any async operation triggers change detection
// 2. Angular checks EVERY component in the tree
// 3. Even if nothing changed, all components are checked
// 4. Can be inefficient for large applications`;

  onPushStrategy = `// OnPush Change Detection Strategy
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: \`
    <div class="card">
      <h4>{{ user.name }}</h4>
      <p>{{ user.email }}</p>
      <p>Checked at: {{ checkTime }}</p>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush // 👈 OnPush strategy
})
export class UserCardComponent {
  @Input() user!: { id: number; name: string; email: string };
  
  get checkTime() {
    // Log when change detection runs
    console.log('UserCardComponent checked');
    return new Date().toLocaleTimeString();
  }
}

// OnPush only checks when:
// 1. Input reference changes
// 2. Event originates from component
// 3. Async pipe receives new value
// 4. Manual trigger with ChangeDetectorRef

// Parent component
@Component({
  selector: 'app-user-list',
  template: \`
    <app-user-card *ngFor="let user of users" [user]="user">
    </app-user-card>
    <button (click)="updateUser()">Update User</button>
  \`
})
export class UserListComponent {
  users = [
    { id: 1, name: 'John', email: 'john@example.com' }
  ];

  updateUser() {
    // ❌ This WON'T trigger change detection (mutating object)
    this.users[0].name = 'Updated John';
    
    // ✅ This WILL trigger change detection (new reference)
    this.users = [
      { ...this.users[0], name: 'Updated John' }
    ];
  }
}`;

  changeDetectorRef = `// Manual Change Detection Control
import { 
  Component, 
  ChangeDetectorRef,
  ChangeDetectionStrategy 
} from '@angular/core';

@Component({
  selector: 'app-manual-detection',
  template: \`
    <div>
      <h3>Counter: {{ counter }}</h3>
      <p>Last Update: {{ lastUpdate }}</p>
      <button (click)="incrementOutsideZone()">Increment Outside Zone</button>
      <button (click)="forceCheck()">Force Check</button>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManualDetectionComponent {
  counter = 0;
  lastUpdate = new Date();

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  incrementOutsideZone() {
    // Run outside Angular's zone (no automatic detection)
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.counter++;
        this.lastUpdate = new Date();
        
        // Manually trigger change detection
        this.cdr.detectChanges(); // Only this component
        // OR
        this.cdr.markForCheck(); // Mark for next cycle
      }, 1000);
    });
  }

  forceCheck() {
    this.counter++;
    // Manually mark component as dirty
    this.cdr.markForCheck();
  }
  
  ngOnDestroy() {
    // Detach from change detection (for performance)
    this.cdr.detach();
  }
}

// ChangeDetectorRef Methods:
// - detectChanges(): Run change detection immediately for this component and children
// - markForCheck(): Mark component and ancestors to be checked in next cycle
// - detach(): Remove component from change detection tree
// - reattach(): Add component back to change detection tree
// - checkNoChanges(): Verify no changes (dev mode only)`;

  zonelessAngular = `// Zoneless Angular (Experimental - Angular 18+)
// Remove Zone.js dependency for better performance

// 1. Bootstrap without Zone.js
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection() // 👈 Enable zoneless mode
  ]
});

// 2. Use Signals for reactive state
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <div>
      <h3>Count: {{ count() }}</h3>
      <h3>Double: {{ doubleCount() }}</h3>
      <button (click)="increment()">Increment</button>
    </div>
  \`
})
export class CounterComponent {
  // Signals automatically trigger updates
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);
  
  increment() {
    this.count.update(c => c + 1); // Automatically updates view
  }
}

// 3. Async operations with RxJS
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-data',
  template: \`<div>{{ data()?.title }}</div>\`
})
export class DataComponent {
  private dataService = inject(DataService);
  
  // Convert observable to signal (auto-updates)
  data = toSignal(this.dataService.getData());
}

// Benefits of Zoneless:
// ✅ Better performance (no Zone.js overhead)
// ✅ Smaller bundle size (no Zone.js library)
// ✅ More predictable change detection
// ✅ Better for micro-frontends
// ✅ Aligns with modern reactive patterns (signals)`;

  performanceOptimization = `// Change Detection Performance Optimization

// 1. Use OnPush wherever possible
@Component({
  selector: 'app-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<div>{{ product.name }}</div>\`
})
export class ProductComponent {
  @Input() product!: Product;
}

// 2. Use trackBy for *ngFor
@Component({
  template: \`
    <div *ngFor="let item of items; trackBy: trackByFn">
      {{ item.name }}
    </div>
  \`
})
export class ListComponent {
  items: Item[] = [];
  
  // Prevent re-rendering unchanged items
  trackByFn(index: number, item: Item) {
    return item.id; // Use unique identifier
  }
}

// 3. Detach components from change detection
export class HeavyComponent implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    // Detach from automatic change detection
    this.cdr.detach();
    
    // Manually update when needed
    this.updateData().subscribe(data => {
      this.data = data;
      this.cdr.detectChanges(); // Manual trigger
    });
  }
}

// 4. Run outside Angular zone for performance-intensive operations
export class ChartComponent {
  constructor(private ngZone: NgZone) {}
  
  renderChart(data: number[]) {
    // Run expensive operations outside Angular
    this.ngZone.runOutsideAngular(() => {
      // Heavy calculations or third-party library
      const chart = new Chart(data);
      chart.render();
      
      // Re-enter zone when done
      this.ngZone.run(() => {
        this.chartReady = true;
      });
    });
  }
}

// 5. Use pure pipes
@Pipe({
  name: 'customFilter',
  pure: true // Only recalculate when inputs change
})
export class CustomFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    return items.filter(item => item.name.includes(filter));
  }
}

// 6. Avoid function calls in templates
// ❌ Bad: Function called on every change detection
<div>{{ calculateTotal() }}</div>

// ✅ Good: Use computed signal or cached property
<div>{{ total() }}</div> // Signal

// 7. Use async pipe for observables
// ❌ Bad: Manual subscription
export class BadComponent {
  data: Data;
  
  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }
}

// ✅ Good: Async pipe handles everything
export class GoodComponent {
  data$ = this.dataService.getData();
}
template: \`<div>{{ data$ | async }}</div>\``;

  bestPractices = `// Change Detection Best Practices

// ✅ DO: Use OnPush for presentational components
@Component({
  selector: 'app-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<div>{{ data.title }}</div>\`
})
export class DisplayComponent {
  @Input() data!: Data;
}

// ✅ DO: Make data immutable with OnPush
updateUser() {
  // Create new reference
  this.user = { ...this.user, name: 'New Name' };
  
  // For arrays
  this.items = [...this.items, newItem];
  
  // For nested updates
  this.config = {
    ...this.config,
    settings: { ...this.config.settings, theme: 'dark' }
  };
}

// ✅ DO: Use signals for reactive state (Angular 16+)
export class ModernComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);
  
  increment() {
    this.count.update(n => n + 1);
  }
}

// ✅ DO: Use async pipe
export class DataComponent {
  users$ = this.http.get<User[]>('/api/users');
}
template: \`
  <div *ngFor="let user of users$ | async">
    {{ user.name }}
  </div>
\`

// ❌ DON'T: Mutate objects with OnPush
this.user.name = 'Changed'; // Won't trigger detection

// ❌ DON'T: Call functions in templates
<div>{{ expensiveCalculation() }}</div> // Called every check!

// ❌ DON'T: Use setTimeout/setInterval unnecessarily
setTimeout(() => {
  this.data = newData; // Triggers change detection
}, 1000);

// ✅ DO: Run outside zone when appropriate
this.ngZone.runOutsideAngular(() => {
  setInterval(() => {
    // Update non-Angular UI
  }, 100);
});

// ✅ DO: Use trackBy with *ngFor
<div *ngFor="let item of items; trackBy: trackById">

trackById(index: number, item: any) {
  return item.id;
}

// ✅ DO: Profile change detection
import { enableDebugTools } from '@angular/platform-browser';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(moduleRef => {
    const appRef = moduleRef.injector.get(ApplicationRef);
    const componentRef = appRef.components[0];
    enableDebugTools(componentRef);
  });

// In console:
// ng.profiler.timeChangeDetection()`;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
