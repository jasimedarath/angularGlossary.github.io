import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-unittesting',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-unittesting.component.html',
  styleUrl: './learn-unittesting.component.scss'
})
export class LearnUnittestingComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  testBedBasics: string = `import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // Setup before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent] // For standalone components
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent)
      .toContain('Welcome my-app');
  });
});`;

  componentTesting: string = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display user name', () => {
    component.user = { name: 'John Doe', email: 'john@example.com' };
    fixture.detectChanges(); // Update view
    
    const nameElement = compiled.querySelector('.user-name');
    expect(nameElement?.textContent).toBe('John Doe');
  });

  it('should call onSave when button clicked', () => {
    spyOn(component, 'onSave');
    
    const button = compiled.querySelector('button.save-btn') as HTMLButtonElement;
    button.click();
    
    expect(component.onSave).toHaveBeenCalled();
  });

  it('should emit event on delete', () => {
    let emittedValue: any;
    component.userDeleted.subscribe((value: any) => emittedValue = value);
    
    component.deleteUser();
    
    expect(emittedValue).toBe(component.user.id);
  });

  it('should have correct CSS class when active', () => {
    component.isActive = true;
    fixture.detectChanges();
    
    const element: DebugElement = fixture.debugElement.query(By.css('.profile'));
    expect(element.nativeElement.classList.contains('active')).toBeTruthy();
  });
});`;

  serviceTesting: string = `import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
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
    // Verify no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const mockUsers = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // Respond with mock data
  });

  it('should handle errors', () => {
    service.getUsers().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('api/users');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });

  it('should cache results', () => {
    service.getUsersCached().subscribe();
    service.getUsersCached().subscribe();
    
    // Should only make one HTTP request due to caching
    const requests = httpMock.match('api/users');
    expect(requests.length).toBe(1);
  });
});`;

  asyncTesting: string = `import { ComponentFixture, TestBed, fakeAsync, tick, flush, waitForAsync } from '@angular/core/testing';
import { DataComponent } from './data.component';

describe('Async Testing', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  // Testing Promises with waitForAsync
  it('should load data with async/await', waitForAsync(() => {
    component.loadData();
    
    fixture.whenStable().then(() => {
      expect(component.data).toBeTruthy();
      expect(component.loading).toBeFalsy();
    });
  }));

  // Testing with fakeAsync and tick
  it('should debounce search', fakeAsync(() => {
    spyOn(component, 'performSearch');
    
    component.search('test');
    tick(250); // Wait 250ms
    expect(component.performSearch).not.toHaveBeenCalled();
    
    tick(250); // Wait another 250ms (total 500ms)
    expect(component.performSearch).toHaveBeenCalledWith('test');
  }));

  // Testing setTimeout
  it('should show message after delay', fakeAsync(() => {
    component.showDelayedMessage();
    expect(component.message).toBe('');
    
    tick(2000); // Advance time by 2 seconds
    expect(component.message).toBe('Hello after 2 seconds!');
  }));

  // Testing setInterval
  it('should update counter every second', fakeAsync(() => {
    component.startCounter();
    expect(component.counter).toBe(0);
    
    tick(1000);
    expect(component.counter).toBe(1);
    
    tick(3000);
    expect(component.counter).toBe(4);
    
    component.stopCounter();
    flush(); // Clear any pending timers
  }));

  // Testing Observables
  it('should handle observable data', fakeAsync(() => {
    let result: any;
    component.getData$().subscribe(data => result = data);
    
    tick(1000);
    expect(result).toEqual({ id: 1, name: 'Test' });
  }));

  // Testing async pipe
  it('should display async data in template', fakeAsync(() => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    
    const element = fixture.nativeElement.querySelector('.async-data');
    expect(element.textContent).toContain('Loaded Data');
  }));
});`;

  signalTesting: string = `import { TestBed } from '@angular/core/testing';
import { signal, computed, effect } from '@angular/core';
import { CounterComponent } from './counter.component';

describe('Testing with Signals', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update signal value', () => {
    expect(component.count()).toBe(0);
    
    component.increment();
    expect(component.count()).toBe(1);
    
    component.count.set(10);
    expect(component.count()).toBe(10);
  });

  it('should test computed signals', () => {
    component.firstName.set('John');
    component.lastName.set('Doe');
    
    // Computed signal automatically updates
    expect(component.fullName()).toBe('John Doe');
    
    component.firstName.set('Jane');
    expect(component.fullName()).toBe('Jane Doe');
  });

  it('should test effects', (done) => {
    let effectRan = false;
    
    TestBed.runInInjectionContext(() => {
      const count = signal(0);
      
      effect(() => {
        const value = count();
        if (value === 5) {
          effectRan = true;
        }
      });
      
      count.set(5);
      
      // Effects run asynchronously
      setTimeout(() => {
        expect(effectRan).toBeTruthy();
        done();
      }, 0);
    });
  });

  it('should test signal updates in template', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.count')?.textContent).toBe('0');
    
    component.count.set(42);
    fixture.detectChanges();
    
    expect(compiled.querySelector('.count')?.textContent).toBe('42');
  });

  it('should test signal array mutations', () => {
    component.items.set([1, 2, 3]);
    expect(component.items()).toEqual([1, 2, 3]);
    
    component.items.update(items => [...items, 4]);
    expect(component.items()).toEqual([1, 2, 3, 4]);
    
    expect(component.itemCount()).toBe(4); // Computed signal
  });

  it('should test conditional computed signals', () => {
    component.isEnabled.set(false);
    expect(component.displayValue()).toBe('Disabled');
    
    component.isEnabled.set(true);
    component.value.set(100);
    expect(component.displayValue()).toBe('Value: 100');
  });
});`;

  mockingDependencies: string = `import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { LoggerService } from './logger.service';
import { of, throwError } from 'rxjs';

describe('Mocking Dependencies', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockLogger: jasmine.SpyObj<LoggerService>;

  beforeEach(async () => {
    // Create spy objects
    mockUserService = jasmine.createSpyObj('UserService', 
      ['getUsers', 'deleteUser', 'updateUser']
    );
    mockLogger = jasmine.createSpyObj('LoggerService', ['log', 'error']);

    // Configure default return values
    mockUserService.getUsers.and.returnValue(of([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]));

    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: LoggerService, useValue: mockLogger }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should load users on init', () => {
    fixture.detectChanges(); // Triggers ngOnInit
    
    expect(mockUserService.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
  });

  it('should handle service errors', () => {
    mockUserService.getUsers.and.returnValue(
      throwError(() => new Error('API Error'))
    );
    
    fixture.detectChanges();
    
    expect(component.error).toBeTruthy();
    expect(mockLogger.error).toHaveBeenCalledWith(
      jasmine.stringContaining('API Error')
    );
  });

  it('should delete user and refresh list', () => {
    mockUserService.deleteUser.and.returnValue(of(void 0));
    fixture.detectChanges();
    
    component.deleteUser(1);
    
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
    expect(mockUserService.getUsers).toHaveBeenCalledTimes(2); // Init + refresh
  });

  it('should track spy calls and arguments', () => {
    fixture.detectChanges();
    
    component.updateUser(1, { name: 'Updated Name' });
    
    expect(mockUserService.updateUser).toHaveBeenCalledWith(
      1,
      jasmine.objectContaining({ name: 'Updated Name' })
    );
    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
  });
});

// Custom Mock Class Approach
class MockUserService {
  getUsers() {
    return of([{ id: 1, name: 'Mock User' }]);
  }
  
  deleteUser(id: number) {
    return of(void 0);
  }
}`;

  testCoverage: string = `// karma.conf.js - Coverage Configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage')
    ],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ],
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    browsers: ['Chrome'],
    singleRun: true
  });
};

// Running tests with coverage
// ng test --code-coverage
// ng test --no-watch --code-coverage

// Example test coverage report output:
/*
=============================== Coverage summary ===============================
Statements   : 85.5% ( 342/400 )
Branches     : 78.3% ( 94/120 )
Functions    : 82.1% ( 78/95 )
Lines        : 85.9% ( 318/370 )
================================================================================
*/

// angular.json - Coverage configuration
{
  "test": {
    "builder": "@angular-devkit/build-angular:karma",
    "options": {
      "codeCoverage": true,
      "codeCoverageExclude": [
        "src/**/*.spec.ts",
        "src/test.ts",
        "src/environments/**"
      ]
    }
  }
}

// Ignoring code from coverage
export class MyService {
  // istanbul ignore next
  debugMethod() {
    console.log('Debug info');
  }
  
  /* istanbul ignore if */
  if (environment.production) {
    // Production only code
  }
}

// Coverage thresholds in package.json
{
  "scripts": {
    "test:coverage": "ng test --no-watch --code-coverage",
    "test:coverage:check": "ng test --no-watch --code-coverage --watch=false"
  }
}`;

  bestPractices: string = `// ===== UNIT TESTING BEST PRACTICES =====

// 1. AAA Pattern: Arrange, Act, Assert
it('should calculate total price', () => {
  // Arrange - Setup
  const cart = new ShoppingCart();
  cart.addItem({ name: 'Item 1', price: 10 });
  cart.addItem({ name: 'Item 2', price: 20 });
  
  // Act - Execute
  const total = cart.getTotal();
  
  // Assert - Verify
  expect(total).toBe(30);
});

// 2. Test One Thing at a Time
// ❌ Bad - Testing multiple things
it('should process user correctly', () => {
  expect(component.isValid()).toBeTruthy();
  expect(component.hasErrors()).toBeFalsy();
  expect(component.user.name).toBe('John');
  expect(component.user.email).toBe('john@example.com');
});

// ✅ Good - Separate focused tests
it('should validate user input', () => {
  expect(component.isValid()).toBeTruthy();
});

it('should set user details correctly', () => {
  expect(component.user.name).toBe('John');
  expect(component.user.email).toBe('john@example.com');
});

// 3. Use Descriptive Test Names
// ❌ Bad
it('test 1', () => {});
it('works', () => {});

// ✅ Good
it('should display error message when form is invalid', () => {});
it('should emit save event when save button is clicked', () => {});
it('should filter users by active status', () => {});

// 4. Don't Test Implementation Details
// ❌ Bad - Testing private methods
it('should call private method', () => {
  spyOn(component as any, 'privateMethod');
  component.publicMethod();
  expect((component as any).privateMethod).toHaveBeenCalled();
});

// ✅ Good - Test public behavior
it('should update display when value changes', () => {
  component.updateValue(42);
  expect(component.displayValue).toBe('Value: 42');
});

// 5. Keep Tests Independent
// ❌ Bad - Tests depend on each other
describe('UserService', () => {
  let userId: number;
  
  it('should create user', () => {
    userId = service.createUser({ name: 'John' });
    expect(userId).toBeTruthy();
  });
  
  it('should get user', () => {
    const user = service.getUser(userId); // Depends on previous test!
    expect(user.name).toBe('John');
  });
});

// ✅ Good - Independent tests
describe('UserService', () => {
  let testUserId: number;
  
  beforeEach(() => {
    testUserId = service.createUser({ name: 'Test User' });
  });
  
  it('should get user by id', () => {
    const user = service.getUser(testUserId);
    expect(user).toBeTruthy();
  });
});

// 6. Use beforeEach for Common Setup
beforeEach(() => {
  component.user = { id: 1, name: 'Test' };
  component.isLoading = false;
  fixture.detectChanges();
});

// 7. Clean Up After Tests
afterEach(() => {
  fixture.destroy();
  // Clear subscriptions, timers, etc.
});

// 8. Test Edge Cases and Error Conditions
it('should handle empty array', () => {
  component.items = [];
  expect(component.getTotal()).toBe(0);
});

it('should handle null values', () => {
  component.user = null;
  expect(() => component.getDisplayName()).not.toThrow();
});

it('should handle network errors gracefully', () => {
  mockService.getData.and.returnValue(throwError(() => new Error('Network error')));
  component.loadData();
  expect(component.errorMessage).toBeTruthy();
});

// 9. Avoid Logic in Tests
// ❌ Bad
it('should calculate correctly', () => {
  const result = component.calculate(5, 3);
  const expected = 5 + 3; // Don't recalculate in test!
  expect(result).toBe(expected);
});

// ✅ Good
it('should add two numbers', () => {
  expect(component.calculate(5, 3)).toBe(8);
});

// 10. Use Test Utilities and Helpers
function createMockUser(overrides = {}): User {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    ...overrides
  };
}

it('should display user name', () => {
  const user = createMockUser({ name: 'John' });
  component.user = user;
  expect(component.displayName).toBe('John');
});`;

}
