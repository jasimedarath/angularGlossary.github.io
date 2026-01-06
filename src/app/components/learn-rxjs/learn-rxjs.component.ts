import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-rxjs',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-rxjs.component.html',
  styleUrl: './learn-rxjs.component.scss'
})
export class LearnRxjsComponent implements AfterViewChecked {
  basicObservables: string = `import { Observable, of, from, interval } from 'rxjs';

// Creating Observables
// 1. of() - Emits values in sequence
const numbers$ = of(1, 2, 3, 4, 5);
numbers$.subscribe(val => console.log(val)); // 1, 2, 3, 4, 5

// 2. from() - Converts array/promise to observable
const array$ = from([10, 20, 30]);
const promise$ = from(fetch('/api/data'));

// 3. interval() - Emits numbers at intervals
const timer$ = interval(1000); // Emits 0, 1, 2... every second

// 4. Creating custom observable
const custom$ = new Observable(subscriber => {
  subscriber.next('Hello');
  subscriber.next('World');
  subscriber.complete();
});

// Subscribing to observables
const subscription = custom$.subscribe({
  next: (value) => console.log('Received:', value),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Completed!')
});

// Don't forget to unsubscribe!
subscription.unsubscribe();`;

  commonOperators: string = `import { of, interval } from 'rxjs';
import { map, filter, tap, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// map - Transform values
of(1, 2, 3, 4, 5)
  .pipe(
    map(x => x * 10)
  )
  .subscribe(val => console.log(val)); // 10, 20, 30, 40, 50

// filter - Filter values
of(1, 2, 3, 4, 5)
  .pipe(
    filter(x => x % 2 === 0)
  )
  .subscribe(val => console.log(val)); // 2, 4

// tap - Side effects (debugging)
of(1, 2, 3)
  .pipe(
    tap(x => console.log('Before:', x)),
    map(x => x * 2),
    tap(x => console.log('After:', x))
  )
  .subscribe();

// take - Take first N emissions
interval(1000)
  .pipe(
    take(5)
  )
  .subscribe(val => console.log(val)); // 0, 1, 2, 3, 4 then completes

// debounceTime - Wait for pause in emissions
searchInput$
  .pipe(
    debounceTime(300) // Wait 300ms after last keystroke
  )
  .subscribe(term => console.log('Search:', term));

// distinctUntilChanged - Only emit when value changes
of(1, 1, 2, 2, 3, 1)
  .pipe(
    distinctUntilChanged()
  )
  .subscribe(val => console.log(val)); // 1, 2, 3, 1`;

  combinationOperators: string = `import { of, combineLatest, merge, forkJoin, zip } from 'rxjs';
import { switchMap, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';

// combineLatest - Emit when ANY observable emits (latest from each)
const age$ = of(25, 26, 27);
const name$ = of('Alice', 'Bob');

combineLatest([age$, name$])
  .subscribe(([age, name]) => {
    console.log(\`\${name} is \${age} years old\`);
  });

// merge - Combine multiple observables into one
const clicks$ = fromEvent(button, 'click');
const timer$ = interval(1000);

merge(clicks$, timer$)
  .subscribe(val => console.log('Event:', val));

// forkJoin - Wait for all to complete (like Promise.all)
forkJoin({
  users: http.get('/api/users'),
  posts: http.get('/api/posts'),
  comments: http.get('/api/comments')
}).subscribe(({ users, posts, comments }) => {
  console.log('All loaded!', users, posts, comments);
});

// zip - Combine emissions by index
const nums$ = of(1, 2, 3);
const letters$ = of('A', 'B', 'C');

zip(nums$, letters$)
  .subscribe(([num, letter]) => {
    console.log(\`\${num}\${letter}\`); // 1A, 2B, 3C
  });`;

  higherOrderOperators: string = `import { fromEvent, interval, of } from 'rxjs';
import { switchMap, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';

// switchMap - Cancel previous, switch to new observable
// Use: Search, live updates
searchInput$.pipe(
  debounceTime(300),
  switchMap(term => http.get(\`/api/search?q=\${term}\`))
).subscribe(results => console.log(results));

// mergeMap - Run in parallel, emit all results
// Use: Independent operations that can run simultaneously
of(1, 2, 3).pipe(
  mergeMap(id => http.get(\`/api/user/\${id}\`))
).subscribe(user => console.log(user));

// concatMap - Run in sequence, preserve order
// Use: Operations that must complete in order
of(1, 2, 3).pipe(
  concatMap(id => http.post(\`/api/user/\${id}\`, data))
).subscribe(response => console.log(response));

// exhaustMap - Ignore new emissions until current completes
// Use: Preventing duplicate operations (form submissions)
submitButton$.pipe(
  exhaustMap(() => http.post('/api/save', formData))
).subscribe(response => console.log('Saved:', response));

// Real-world example: Autocomplete search
searchInput$.pipe(
  debounceTime(300),           // Wait for user to stop typing
  distinctUntilChanged(),      // Only if value changed
  filter(term => term.length > 2), // Min 3 characters
  switchMap(term =>            // Cancel previous searches
    http.get(\`/api/search?q=\${term}\`).pipe(
      catchError(() => of([])) // Handle errors gracefully
    )
  )
).subscribe(results => displayResults(results));`;

  errorHandling: string = `import { of, throwError, EMPTY } from 'rxjs';
import { catchError, retry, retryWhen, delay, tap } from 'rxjs/operators';

// catchError - Handle errors and provide fallback
http.get('/api/data').pipe(
  catchError(error => {
    console.error('Error occurred:', error);
    return of([]); // Return empty array as fallback
  })
).subscribe(data => console.log(data));

// retry - Retry failed operation N times
http.get('/api/data').pipe(
  retry(3), // Retry up to 3 times
  catchError(error => {
    console.error('Failed after 3 retries');
    return throwError(() => error);
  })
).subscribe();

// retryWhen - Custom retry logic with delay
http.get('/api/data').pipe(
  retryWhen(errors =>
    errors.pipe(
      delay(1000),  // Wait 1 second between retries
      take(3),      // Max 3 retries
      tap(() => console.log('Retrying...'))
    )
  )
).subscribe();

// Advanced error handling
http.get<User[]>('/api/users').pipe(
  timeout(5000),           // Fail if takes > 5 seconds
  retry({
    count: 2,
    delay: 1000
  }),
  catchError(error => {
    if (error.status === 404) {
      return of([]); // Return empty for not found
    }
    // Log error and return cached data
    logError(error);
    return of(getCachedData());
  })
).subscribe(users => displayUsers(users));`;

  subjects: string = `import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

// Subject - Multicast observable, no initial value
const subject = new Subject<number>();

subject.subscribe(val => console.log('A:', val));
subject.subscribe(val => console.log('B:', val));

subject.next(1); // Both A and B receive 1
subject.next(2); // Both A and B receive 2

// BehaviorSubject - Has current value, emits last value to new subscribers
const currentUser = new BehaviorSubject<User | null>(null);

currentUser.subscribe(user => console.log('Current user:', user));
currentUser.next({ id: 1, name: 'Alice' });

// New subscriber gets current value immediately
currentUser.subscribe(user => console.log('New subscriber:', user));

// ReplaySubject - Replays N last values to new subscribers
const messages = new ReplaySubject<string>(3); // Keep last 3

messages.next('Message 1');
messages.next('Message 2');
messages.next('Message 3');
messages.next('Message 4');

// New subscriber gets last 3 messages
messages.subscribe(msg => console.log(msg)); // 2, 3, 4

// AsyncSubject - Only emits last value when completed
const result = new AsyncSubject<number>();

result.subscribe(val => console.log(val));
result.next(1);
result.next(2);
result.next(3);
result.complete(); // Now emits 3 to all subscribers

// Real-world: Event Bus Service
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private eventSubject = new Subject<AppEvent>();
  public events$ = this.eventSubject.asObservable();
  
  emit(event: AppEvent) {
    this.eventSubject.next(event);
  }
}`;

  angularIntegration: string = `import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-search',
  template: \`
    <input [formControl]="searchControl" placeholder="Search users..." />
    
    @if (loading()) {
      <div>Loading...</div>
    }
    
    @for (user of users(); track user.id) {
      <div>{{ user.name }}</div>
    }
  \`
})
export class UserSearchComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private destroy$ = new Subject<void>();
  
  searchControl = new FormControl('');
  users = signal<User[]>([]);
  loading = signal(false);
  
  ngOnInit() {
    // Listen to form control changes
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loading.set(true)),
      switchMap(term => 
        this.http.get<User[]>(\`/api/users?q=\${term}\`)
      ),
      takeUntil(this.destroy$) // Auto-unsubscribe on destroy
    ).subscribe({
      next: users => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Using async pipe (auto unsubscribes)
@Component({
  selector: 'app-users-list',
  template: \`
    @if (users$ | async; as users) {
      @for (user of users; track user.id) {
        <div>{{ user.name }}</div>
      }
    }
  \`
})
export class UsersListComponent {
  users$ = inject(HttpClient).get<User[]>('/api/users');
}`;

  bestPractices: string = `// 1. ALWAYS UNSUBSCRIBE
// Method 1: takeUntil pattern
private destroy$ = new Subject<void>();

ngOnInit() {
  this.dataService.data$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(data => this.handleData(data));
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// Method 2: Subscription management
private subscription = new Subscription();

ngOnInit() {
  this.subscription.add(
    observable1$.subscribe(data => {})
  );
  this.subscription.add(
    observable2$.subscribe(data => {})
  );
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

// Method 3: async pipe (automatic unsubscribe)
@Component({
  template: \`{{ data$ | async }}\`
})
export class MyComponent {
  data$ = this.http.get('/api/data');
}

// 2. USE PROPER OPERATORS
// ❌ BAD - Nested subscriptions (callback hell)
this.userService.getUser(id).subscribe(user => {
  this.postService.getPosts(user.id).subscribe(posts => {
    this.commentService.getComments(posts[0].id).subscribe(comments => {
      // Nested mess...
    });
  });
});

// ✅ GOOD - Use switchMap
this.userService.getUser(id).pipe(
  switchMap(user => this.postService.getPosts(user.id)),
  switchMap(posts => this.commentService.getComments(posts[0].id))
).subscribe(comments => {
  // Clean and readable
});

// 3. HANDLE ERRORS
// ❌ BAD - No error handling
http.get('/api/data').subscribe(data => console.log(data));

// ✅ GOOD - Handle errors
http.get('/api/data').pipe(
  catchError(error => {
    console.error('API Error:', error);
    return of(defaultValue);
  })
).subscribe(data => console.log(data));

// 4. USE SHAREPLAY FOR EXPENSIVE OPERATIONS
// ❌ BAD - Multiple subscriptions = multiple requests
const data$ = http.get('/api/expensive');
data$.subscribe(d => console.log('A:', d)); // Request 1
data$.subscribe(d => console.log('B:', d)); // Request 2

// ✅ GOOD - Share single request
const data$ = http.get('/api/expensive').pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);
data$.subscribe(d => console.log('A:', d)); // Request 1
data$.subscribe(d => console.log('B:', d)); // Uses cached result

// 5. COMBINE WITH SIGNALS
@Component({...})
export class ModernComponent {
  private http = inject(HttpClient);
  
  // Convert Observable to Signal
  users = toSignal(
    this.http.get<User[]>('/api/users'),
    { initialValue: [] }
  );
  
  // Convert Signal to Observable
  private searchTerm = signal('');
  private searchTerm$ = toObservable(this.searchTerm);
  
  results = toSignal(
    this.searchTerm$.pipe(
      debounceTime(300),
      switchMap(term => this.http.get(\`/search?q=\${term}\`))
    ),
    { initialValue: [] }
  );
}`;

  ngAfterViewChecked(): void {
    Prism.highlightAll();
  }
}
