import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-signals',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-signals.component.html',
  styleUrl: './learn-signals.component.scss'
})
export class LearnSignalsComponent implements AfterViewChecked {
  basicSignals: string = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <div>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  \`
})
export class CounterComponent {
  // Creating a signal with initial value
  count = signal(0);
  
  // Reading a signal value (must use () to read)
  increment() {
    this.count.update(value => value + 1);
  }
  
  // Setting a new value directly
  reset() {
    this.count.set(0);
  }
}`;

  computedSignals: string = `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  template: \`
    <div>
      <p>Items: {{ items().length }}</p>
      <p>Total: \${{ total() }}</p>
      <p>Tax: \${{ tax() }}</p>
      <p>Final Price: \${{ finalPrice() }}</p>
    </div>
  \`
})
export class ShoppingCartComponent {
  items = signal<CartItem[]>([
    { id: 1, name: 'Product A', price: 10, quantity: 2 },
    { id: 2, name: 'Product B', price: 15, quantity: 1 }
  ]);
  
  taxRate = signal(0.08); // 8% tax
  
  // Computed signal - automatically updates when dependencies change
  total = computed(() => {
    return this.items().reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
  });
  
  // Computed signals can depend on other computed signals
  tax = computed(() => this.total() * this.taxRate());
  
  finalPrice = computed(() => this.total() + this.tax());
  
  addItem(item: CartItem) {
    this.items.update(items => [...items, item]);
    // total, tax, and finalPrice automatically recalculate!
  }
}`;

  effectSignals: string = `import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: '...'
})
export class UserProfileComponent {
  userId = signal<string | null>(null);
  userData = signal<User | null>(null);
  
  constructor() {
    // Effect runs when userId changes
    effect(() => {
      const id = this.userId();
      if (id) {
        console.log('Loading user data for:', id);
        this.loadUserData(id);
      }
    });
    
    // Effect with cleanup
    effect((onCleanup) => {
      const theme = this.theme();
      document.body.className = theme;
      
      // Cleanup function runs before next effect or on destroy
      onCleanup(() => {
        document.body.className = '';
      });
    });
  }
  
  async loadUserData(id: string) {
    const data = await fetch(\`/api/users/\${id}\`).then(r => r.json());
    this.userData.set(data);
  }
}

// Using effect for synchronization
@Component({...})
export class LocalStorageSync {
  settings = signal({ theme: 'light', lang: 'en' });
  
  constructor() {
    // Sync to localStorage whenever settings change
    effect(() => {
      const settings = this.settings();
      localStorage.setItem('settings', JSON.stringify(settings));
    });
  }
}`;

  signalInputs: string = `import { Component, input, model } from '@angular/core';

// Signal-based inputs (Angular 17.1+)
@Component({
  selector: 'app-user-card',
  template: \`
    <div class="card">
      <h3>{{ name() }}</h3>
      <p>{{ email() }}</p>
      @if (showDetails()) {
        <div>{{ details() }}</div>
      }
    </div>
  \`
})
export class UserCardComponent {
  // Required input
  name = input.required<string>();
  
  // Optional input with default value
  email = input<string>('no-email@example.com');
  
  // Optional input (can be undefined)
  details = input<string>();
  
  // With transform function
  showDetails = input<boolean, string>(false, {
    transform: (value: string) => value === 'true'
  });
  
  // Alias
  userId = input<number>('', { alias: 'id' });
}

// Two-way binding with model()
@Component({
  selector: 'app-search-box',
  template: \`
    <input 
      [value]="searchTerm()" 
      (input)="searchTerm.set($event.target.value)"
    />
  \`
})
export class SearchBoxComponent {
  // Two-way bindable signal
  searchTerm = model<string>('');
  
  // With default value
  selectedItems = model<string[]>([]);
}

// Usage in parent
@Component({
  template: \`
    <app-search-box [(searchTerm)]="query" />
  \`
})
export class ParentComponent {
  query = signal('');
}`;

  linkedSignal: string = `import { Component, signal, computed, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  template: '...'
})
export class ProductFilterComponent {
  category = input<string>('all');
  
  // linkedSignal creates a writable signal that updates when input changes
  // but can also be modified locally
  selectedCategory = linkedSignal(() => this.category());
  
  // Use case: reset to input value but allow local modifications
  constructor() {
    // selectedCategory starts with category value
    // Can be updated independently: this.selectedCategory.set('electronics')
    // Resets when category input changes
  }
}

// Real-world example: Form with reset capability
@Component({
  selector: 'app-editable-profile',
  template: \`
    <div>
      <input [value]="editableName()" 
             (input)="editableName.set($event.target.value)" />
      <button (click)="reset()">Reset</button>
    </div>
  \`
})
export class EditableProfileComponent {
  originalName = input.required<string>();
  
  // Linked signal allows editing while keeping track of original
  editableName = linkedSignal(() => this.originalName());
  
  hasChanges = computed(() => 
    this.editableName() !== this.originalName()
  );
  
  reset() {
    this.editableName.set(this.originalName());
  }
}`;

  signalsRxjs: string = `import { Component, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: \`
    <input (input)="searchTerm.set($event.target.value)" />
    
    @if (loading()) {
      <div>Loading...</div>
    }
    
    @for (result of results(); track result.id) {
      <div>{{ result.name }}</div>
    }
  \`
})
export class SearchComponent {
  private http = inject(HttpClient);
  
  // Signal for input
  searchTerm = signal('');
  
  // Convert signal to observable for RxJS operators
  private searchTerm$ = toObservable(this.searchTerm);
  
  // Process with RxJS and convert back to signal
  results = toSignal(
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.http.get<Result[]>(\`/api/search?q=\${term}\`))
    ),
    { initialValue: [] }
  );
  
  loading = signal(false);
}

// Converting observables to signals
@Component({...})
export class UserComponent {
  private route = inject(ActivatedRoute);
  
  // Convert route params to signal
  userId = toSignal(
    this.route.params.pipe(map(p => p['id'])),
    { initialValue: null }
  );
  
  // Use in computed
  userUrl = computed(() => 
    this.userId() ? \`/api/users/\${this.userId()}\` : null
  );
}`;

  advancedPatterns: string = `// Pattern 1: Signal-based store
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  // Private state
  private _todos = signal<Todo[]>([]);
  private _loading = signal(false);
  
  // Public readonly signals
  readonly todos = this._todos.asReadonly();
  readonly loading = this._loading.asReadonly();
  
  // Computed selectors
  readonly completedTodos = computed(() =>
    this._todos().filter(t => t.completed)
  );
  
  readonly activeTodos = computed(() =>
    this._todos().filter(t => !t.completed)
  );
  
  readonly stats = computed(() => ({
    total: this._todos().length,
    completed: this.completedTodos().length,
    active: this.activeTodos().length
  }));
  
  // Actions
  addTodo(title: string) {
    const todo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this._todos.update(todos => [...todos, todo]);
  }
  
  toggleTodo(id: number) {
    this._todos.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }
  
  deleteTodo(id: number) {
    this._todos.update(todos => todos.filter(t => t.id !== id));
  }
}

// Pattern 2: Computed async values
@Component({...})
export class AsyncComponent {
  userId = signal<string>('123');
  
  // Trigger fetch when userId changes
  private userDataTrigger = toObservable(this.userId);
  
  userData = toSignal(
    this.userDataTrigger.pipe(
      switchMap(id => this.http.get<User>(\`/api/users/\${id}\`))
    ),
    { initialValue: null }
  );
  
  // Derived data
  userName = computed(() => this.userData()?.name ?? 'Loading...');
}

// Pattern 3: Deep signal updates
@Component({...})
export class DeepUpdateComponent {
  user = signal({
    profile: {
      name: 'John',
      settings: {
        theme: 'dark',
        notifications: true
      }
    }
  });
  
  // Update nested property immutably
  updateTheme(newTheme: string) {
    this.user.update(user => ({
      ...user,
      profile: {
        ...user.profile,
        settings: {
          ...user.profile.settings,
          theme: newTheme
        }
      }
    }));
  }
}`;

  ngAfterViewChecked(): void {
    Prism.highlightAll();
  }
}
