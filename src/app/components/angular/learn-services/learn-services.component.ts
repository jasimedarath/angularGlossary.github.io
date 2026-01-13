import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-services',
  standalone: true,
  imports: [MatTabsModule ],
  templateUrl: './learn-services.component.html',
  styleUrl: './learn-services.component.scss'
})
export class LearnServicesComponent implements AfterViewChecked {
  code: string = `
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class DataService {
    private data: any[] = [];

    constructor() { }

    getData(): any[] {
      return this.data;
    }

    addData(item: any): void {
      this.data.push(item);
    }

    clearData(): void {
      this.data = [];
    }
  }
  `;

  root: string = `
  @Injectable({
  providedIn: 'root'
  })
  export class MyService { }
  `;

  module: string = `@NgModule({
  providers: [MyService]
  })
  export class MyModule { }
  `;

  component: string = `
  @Component({
  providers: [MyService]
  })
  export class MyComponent { }
  `;

  injection: string = `export class MyComponent {
    constructor(private myService: MyService) {}

    ngOnInit() {
      console.log(this.myService.getData());
    }
  }
  `;

  hierarchicalInjection: string = ` @Component({
    providers: [MyService]
  })
  export class ParentComponent {
    constructor(private myService: MyService) { }
  }

  @Component({
    selector: 'app-child',
    template: '<p>Child Component</p>'
  })
  export class ChildComponent {
    constructor(private myService: MyService) { }
  }
  `;

  dataServicePattern: string = `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      retry(3),
      map(users => users.map(u => this.transformUser(u))),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(\`\${this.apiUrl}/\${id}\`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  private transformUser(user: any): User {
    return {
      ...user,
      fullName: \`\${user.firstName} \${user.lastName}\`
    };
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}`;

  stateServicePattern: string = `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: AppState = {
    user: null,
    isLoading: false,
    error: null
  };

  private state$ = new BehaviorSubject<AppState>(this.initialState);

  // Expose state as observable
  getState(): Observable<AppState> {
    return this.state$.asObservable();
  }

  // Selectors for specific state slices
  getUser(): Observable<User | null> {
    return this.state$.pipe(
      map(state => state.user)
    );
  }

  getLoadingState(): Observable<boolean> {
    return this.state$.pipe(
      map(state => state.isLoading)
    );
  }

  // State mutations
  setUser(user: User): void {
    this.state$.next({
      ...this.state$.value,
      user,
      error: null
    });
  }

  setLoading(isLoading: boolean): void {
    this.state$.next({
      ...this.state$.value,
      isLoading
    });
  }

  setError(error: string): void {
    this.state$.next({
      ...this.state$.value,
      error,
      isLoading: false
    });
  }

  reset(): void {
    this.state$.next(this.initialState);
  }
}`;

  facadeServicePattern: string = `// Facade service simplifies complex interactions
@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private loggingService: LoggingService
  ) {}

  loadUserProfile(): Observable<User> {
    return this.userService.getCurrentUser().pipe(
      tap(user => this.loggingService.log('User loaded', user)),
      catchError(error => {
        this.notificationService.showError('Failed to load user');
        return throwError(() => error);
      })
    );
  }

  updateUserProfile(updates: Partial<User>): Observable<User> {
    return this.userService.updateUser(updates).pipe(
      tap(user => {
        this.notificationService.showSuccess('Profile updated');
        this.loggingService.log('User updated', user);
      }),
      catchError(error => {
        this.notificationService.showError('Update failed');
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.showInfo('Logged out successfully');
    this.loggingService.log('User logged out');
  }
}`;

  repositoryPattern: string = `// Generic repository interface
export interface IRepository<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  create(item: T): Observable<T>;
  update(id: number, item: T): Observable<T>;
  delete(id: number): Observable<void>;
}

// Implementation
@Injectable({
  providedIn: 'root'
})
export class UserRepository implements IRepository<User> {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(\`\${this.apiUrl}/\${id}\`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
  }
}`;

  cachingService: string = `@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) {}

  get<T>(key: string, fetcher: () => Observable<T>): Observable<T> {
    const cached = this.cache.get(key);
    
    // Return cached data if valid
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return of(cached.data);
    }

    // Fetch new data and cache it
    return fetcher().pipe(
      tap(data => {
        this.cache.set(key, {
          data,
          timestamp: Date.now()
        });
      })
    );
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}`;

  injectionTokens: string = `import { InjectionToken } from '@angular/core';

// Define injection token
export const API_URL = new InjectionToken<string>('api.url');
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Provide in module or bootstrapApplication
{
  provide: API_URL,
  useValue: 'https://api.example.com'
}

// Inject in service
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(@Inject(API_URL) private apiUrl: string) {}
}`;

  factoryProviders: string = `// Factory function
export function loggerFactory(isDevelopment: boolean) {
  return isDevelopment ? new ConsoleLogger() : new RemoteLogger();
}

// Provide with factory
{
  provide: Logger,
  useFactory: loggerFactory,
  deps: [IS_DEVELOPMENT]
}

// Or with more complex logic
export function httpInterceptorFactory(
  authService: AuthService,
  router: Router
) {
  return new AuthInterceptor(authService, router);
}`;

  multiProviders: string = `// HTTP Interceptor as multi provider
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

// Custom multi provider
export const VALIDATORS = new InjectionToken<Validator[]>('validators');

{
  provide: VALIDATORS,
  useClass: EmailValidator,
  multi: true
}`;

  optionalDecorators: string = `import { Optional, Self, SkipSelf, Host } from '@angular/core';

@Component({})
export class MyComponent {
  constructor(
    // Optional: Won't throw if service not found
    @Optional() private optionalService: OptionalService,
    
    // Self: Only look in current injector
    @Self() private selfService: SelfService,
    
    // SkipSelf: Skip current injector, look in parent
    @SkipSelf() private parentService: ParentService,
    
    // Host: Look up to host component
    @Host() private hostService: HostService
  ) {}
}`;

  injectFunction: string = `import { inject } from '@angular/core';

// Use inject() function instead of constructor
@Injectable({
  providedIn: 'root'
})
export class ModernService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  getData() {
    return this.http.get('/api/data');
  }

  // Works in functions too
  navigateHome = () => {
    this.router.navigate(['/home']);
  }
}

// Use in guards and resolvers
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};`;

  serviceTestBasic: string = `import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    const users = service.getUsers();
    expect(users.length).toBeGreaterThan(0);
  });
});`;

  serviceTestHttp: string = `import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService with HTTP', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'John' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});`;

  serviceTestSpies: string = `describe('UserService with Spies', () => {
  let service: UserService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: spy }
      ]
    });
    
    service = TestBed.inject(UserService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should call http.get', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    httpSpy.get.and.returnValue(of(mockUsers));

    service.getUsers().subscribe();
    
    expect(httpSpy.get).toHaveBeenCalledWith('/api/users');
  });
});`;

  serviceTestObservables: string = `import { fakeAsync, tick } from '@angular/core/testing';

it('should handle delayed response', fakeAsync(() => {
  const mockUser = { id: 1, name: 'John' };
  httpSpy.get.and.returnValue(
    of(mockUser).pipe(delay(1000))
  );

  let result: User;
  service.getUser(1).subscribe(user => result = user);

  tick(1000); // Simulate time passing
  
  expect(result).toEqual(mockUser);
}));`;

  @ViewChild('codeElement') codeElement!: ElementRef;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
