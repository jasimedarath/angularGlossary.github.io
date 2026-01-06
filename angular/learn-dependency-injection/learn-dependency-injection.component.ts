import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-dependency-injection',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-dependency-injection.component.html',
  styleUrl: './learn-dependency-injection.component.scss',
})
export class LearnDependencyInjectionComponent implements AfterViewChecked {
  basicDI: string = `// Old constructor injection
@Component({
  selector: 'app-user-profile',
  template: '<div>{{ user.name }}</div>'
})
export class UserProfileComponent {
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}
}

// New inject() function
import { inject } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: '<div>{{ user.name }}</div>'
})
export class UserProfileComponent {
  private userService = inject(UserService);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Can be used anywhere in the class during construction
  private logger = inject(LoggerService);
}`;

  injectInFunctions: string = `// Using inject() in functions
export function createUserStore() {
  const http = inject(HttpClient);
  const authService = inject(AuthService);
  
  return {
    loadUsers: () => http.get('/api/users'),
    currentUser: authService.currentUser
  };
}

// Using in class initializers
@Component({...})
export class DashboardComponent {
  // Can use inject in field initializers
  private store = createUserStore();
  
  // Computed values using injected services
  private authService = inject(AuthService);
  isAdmin = computed(() => 
    this.authService.currentUser()?.role === 'admin'
  );
}

// Factory functions with inject
export function createLogger(prefix: string) {
  const console = inject(ConsoleService);
  
  return {
    log: (message: string) => console.log(\`[\${prefix}] \${message}\`),
    error: (message: string) => console.error(\`[\${prefix}] \${message}\`)
  };
}`;

  optionalDI: string = `// Optional dependencies
import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({...})
export class MyComponent {
  // Optional injection - returns null if not available
  private analytics = inject(AnalyticsService, { optional: true });
  
  // With default value
  private config = inject(ConfigService, { optional: true }) ?? defaultConfig;
  
  trackEvent(event: string) {
    // Safe to call if available
    this.analytics?.track(event);
  }
}

// Self and SkipSelf
@Component({
  providers: [LocalService]
})
export class ParentComponent {
  // Gets the instance from this component's injector
  private local = inject(LocalService, { self: true });
  
  // Skips this component, looks in parent injectors
  private parent = inject(GlobalService, { skipSelf: true });
}`;

  providerScopes: string = `// Root-level providers (application-wide singleton)
@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private state = signal({ count: 0 });
  
  increment() {
    this.state.update(s => ({ count: s.count + 1 }));
  }
}

// Component-level providers (new instance per component)
@Component({
  selector: 'app-user-form',
  providers: [FormStateService],
  template: '...'
})
export class UserFormComponent {
  private formState = inject(FormStateService);
}

// Lazy loaded module providers
@Injectable({
  providedIn: AdminModule
})
export class AdminService {
  // Only loaded when AdminModule is loaded
}

// Platform providers (shared across multiple apps)
platformBrowserDynamic([
  { provide: LOCALE_ID, useValue: 'en-US' }
]).bootstrapApplication(AppComponent);`;

  injectionTokens: string = `// Creating custom injection tokens
import { InjectionToken } from '@angular/core';

// Simple value token
export const API_URL = new InjectionToken<string>('API_URL');

// Complex type token
export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Providing tokens
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' },
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: 'https://api.example.com',
        timeout: 30000,
        retries: 3
      }
    }
  ]
};

// Using tokens with inject()
@Component({...})
export class ApiComponent {
  private apiUrl = inject(API_URL);
  private config = inject(APP_CONFIG);
  
  fetchData() {
    return fetch(this.apiUrl);
  }
}`;

  factoryProviders: string = `// Factory providers with dependencies
export function createHttpClient(config: AppConfig, logger: Logger) {
  return new HttpClient(config.apiUrl, {
    timeout: config.timeout,
    logger: logger
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_CLIENT,
      useFactory: createHttpClient,
      deps: [APP_CONFIG, Logger]
    }
  ]
};

// Factory with inject() - cleaner approach
export function httpClientFactory() {
  const config = inject(APP_CONFIG);
  const logger = inject(Logger);
  
  return new HttpClient(config.apiUrl, {
    timeout: config.timeout,
    logger: logger
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_CLIENT,
      useFactory: httpClientFactory
    }
  ]
};`;

  hierarchicalDI: string = `// Hierarchical Dependency Injection
// App-level service
@Injectable({ providedIn: 'root' })
export class GlobalUserService {
  private users = signal<User[]>([]);
}

// Feature module service
@Injectable({ providedIn: ShoppingModule })
export class ShoppingCartService {
  private cart = signal<CartItem[]>([]);
}

// Component-level service
@Component({
  selector: 'app-product-list',
  providers: [FilterService], // New instance for each component
  template: '...'
})
export class ProductListComponent {
  private filterService = inject(FilterService);
  private globalUsers = inject(GlobalUserService); // Shared instance
}

// Understanding the lookup
/*
Component
  ↓ (not found)
Parent Component
  ↓ (not found)
Feature Module
  ↓ (not found)
Root Injector
  ↓ (not found)
Platform Injector
  ↓ (not found)
Null Injector (throws error)
*/`;

  realWorldExample: string = `// Real-world example: Feature store with DI
import { inject, Injectable, signal, computed } from '@angular/core';

// API Configuration
export const API_CONFIG = new InjectionToken<{
  baseUrl: string;
  timeout: number;
}>('api.config');

// Feature Store using inject()
@Injectable()
export class TodoStore {
  private http = inject(HttpClient);
  private config = inject(API_CONFIG);
  
  // State
  private todos = signal<Todo[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);
  
  // Selectors
  readonly allTodos = this.todos.asReadonly();
  readonly isLoading = this.loading.asReadonly();
  readonly completedTodos = computed(() =>
    this.todos().filter(t => t.completed)
  );
  readonly pendingTodos = computed(() =>
    this.todos().filter(t => !t.completed)
  );
  
  // Actions
  async loadTodos() {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const url = \`\${this.config.baseUrl}/todos\`;
      const todos = await firstValueFrom(
        this.http.get<Todo[]>(url)
      );
      this.todos.set(todos);
    } catch (err) {
      this.error.set('Failed to load todos');
    } finally {
      this.loading.set(false);
    }
  }
  
  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.todos.update(todos => [...todos, newTodo]);
  }
}

// Component using the store
@Component({
  selector: 'app-todo-list',
  providers: [TodoStore], // Scoped to component
  template: \`
    <div>
      @if (store.isLoading()) {
        <spinner />
      } @else {
        @for (todo of store.allTodos(); track todo.id) {
          <todo-item [todo]="todo" />
        }
      }
      
      <div class="stats">
        Completed: {{ store.completedTodos().length }}
        Pending: {{ store.pendingTodos().length }}
      </div>
    </div>
  \`
})
export class TodoListComponent implements OnInit {
  protected store = inject(TodoStore);
  
  ngOnInit() {
    this.store.loadTodos();
  }
}`;

  ngAfterViewChecked(): void {
    Prism.highlightAll();
  }
}
