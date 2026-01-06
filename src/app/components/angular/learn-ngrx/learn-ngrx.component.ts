import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-learn-ngrx',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './learn-ngrx.component.html',
  styleUrl: './learn-ngrx.component.scss'
})
export class LearnNgrxComponent implements AfterViewChecked {
  
  introduction = `// NgRx - Reactive State Management for Angular
// Built on Redux pattern with RxJS integration

// Core Principles:
// 1. Single Source of Truth - One immutable state tree
// 2. State is Read-Only - Changes only through actions
// 3. Changes via Pure Functions - Reducers are predictable
// 4. Observable State - Subscribe to state changes

// Installation
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools

// Basic Flow:
Component → dispatches → Action → processed by → Reducer → updates → Store
                           ↓
                        Effect (side effects)
                           ↓
                     dispatches new Action`;

  storeAndState = `// Store and State Setup
import { createReducer, createAction, on } from '@ngrx/store';
import { provideStore, Store } from '@ngrx/store';

// 1. Define State Interface
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};

// 2. App State (combine all feature states)
export interface AppState {
  users: UserState;
  // other features...
}

// 3. Bootstrap Store
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      users: usersReducer
    })
  ]
});

// 4. Inject Store in Component
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-list',
  template: \`
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  \`
})
export class UserListComponent {
  users$ = this.store.select(selectAllUsers);
  
  constructor(private store: Store<AppState>) {}
  
  loadUsers() {
    this.store.dispatch(loadUsers());
  }
}`;

  actions = `// Actions - Events that Describe State Changes
import { createAction, props } from '@ngrx/store';

// 1. Simple Actions (no payload)
export const loadUsers = createAction('[User List] Load Users');
export const clearUsers = createAction('[User List] Clear Users');

// 2. Actions with Payload
export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: string }>()
);

export const selectUser = createAction(
  '[User List] Select User',
  props<{ userId: number }>()
);

export const updateUser = createAction(
  '[User Edit] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[User List] Delete User',
  props<{ userId: number }>()
);

// 3. Action Naming Convention
// [Source] Event Description
// Source: Where action is dispatched from
// Event: What happened

// Examples:
// [Login Page] Login
// [Auth API] Login Success
// [Auth API] Login Failure
// [Product List] Load Products
// [Product API] Load Products Success

// 4. Dispatching Actions
export class UserComponent {
  constructor(private store: Store) {}
  
  onLoadUsers() {
    this.store.dispatch(loadUsers());
  }
  
  onSelectUser(userId: number) {
    this.store.dispatch(selectUser({ userId }));
  }
  
  onDeleteUser(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }
}`;

  reducers = `// Reducers - Pure Functions that Update State
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const usersReducer = createReducer(
  initialState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Select User
  on(UserActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUser: state.users.find(u => u.id === userId) || null
  })),
  
  // Update User
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser
  })),
  
  // Delete User
  on(UserActions.deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter(u => u.id !== userId),
    selectedUser: state.selectedUser?.id === userId ? null : state.selectedUser
  })),
  
  // Clear Users
  on(UserActions.clearUsers, () => initialState)
);

// Reducer Rules:
// ✅ Pure functions - no side effects
// ✅ Immutable updates - always return new state
// ✅ Don't mutate state directly
// ✅ Handle all relevant actions

// ❌ Bad: Mutating state
on(UserActions.addUser, (state, { user }) => {
  state.users.push(user); // Mutation!
  return state;
});

// ✅ Good: Creating new state
on(UserActions.addUser, (state, { user }) => ({
  ...state,
  users: [...state.users, user] // New array
}));`;

  selectors = `// Selectors - Query State Slices
import { createSelector, createFeatureSelector } from '@ngrx/store';

// 1. Feature Selector (top-level state slice)
export const selectUserState = createFeatureSelector<UserState>('users');

// 2. Basic Selectors
export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state) => state.selectedUser
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

// 3. Composed Selectors (memoized)
export const selectUserById = (userId: number) => createSelector(
  selectAllUsers,
  (users) => users.find(u => u.id === userId)
);

export const selectActiveUsers = createSelector(
  selectAllUsers,
  (users) => users.filter(u => u.active)
);

export const selectUserCount = createSelector(
  selectAllUsers,
  (users) => users.length
);

// 4. Multi-State Selectors
export const selectUsersWithPosts = createSelector(
  selectAllUsers,
  selectAllPosts, // from another feature
  (users, posts) => users.map(user => ({
    ...user,
    posts: posts.filter(p => p.userId === user.id)
  }))
);

// 5. Props Selectors
export const selectUsersByRole = createSelector(
  selectAllUsers,
  (users: User[], props: { role: string }) => 
    users.filter(u => u.role === props.role)
);

// Usage in Component
@Component({
  template: \`
    <div *ngFor="let user of users$ | async">{{ user.name }}</div>
    <div>{{ selectedUser$ | async | json }}</div>
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$ | async as error">{{ error }}</div>
  \`
})
export class UserListComponent {
  users$ = this.store.select(selectAllUsers);
  selectedUser$ = this.store.select(selectSelectedUser);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);
  admins$ = this.store.select(selectUsersByRole, { role: 'admin' });
  
  constructor(private store: Store) {}
}

// Selector Benefits:
// ✅ Memoization - Only recompute when inputs change
// ✅ Composition - Build complex selectors from simple ones
// ✅ Testable - Pure functions
// ✅ Type-safe - TypeScript support`;

  effects = `// Effects - Handle Side Effects
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private router = inject(Router);
  
  // 1. Load Users Effect
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers), // Listen for this action
      switchMap(() =>
        this.userService.getUsers().pipe( // HTTP call
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => 
            of(UserActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );
  
  // 2. Save User Effect
  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );
  
  // 3. Delete User Effect
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => UserActions.deleteUserSuccess({ userId })),
          catchError(error => of(UserActions.deleteUserFailure({ error })))
        )
      )
    )
  );
  
  // 4. Non-dispatching Effect (side effects only)
  logUserActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActions.loadUsersSuccess,
          UserActions.updateUserSuccess,
          UserActions.deleteUserSuccess
        ),
        tap(action => console.log('User action:', action))
      ),
    { dispatch: false } // Don't dispatch new action
  );
  
  // 5. Navigation Effect
  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        tap(() => this.router.navigate(['/users']))
      ),
    { dispatch: false }
  );
  
  // 6. Notification Effect
  showNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => this.notificationService.show('User updated successfully'))
      ),
    { dispatch: false }
  );
}

// Register Effects
// main.ts
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ users: usersReducer }),
    provideEffects([UserEffects])
  ]
});

// Effect Patterns:
// ✅ Use switchMap for cancellable requests (search, autocomplete)
// ✅ Use mergeMap for parallel requests (bulk operations)
// ✅ Use concatMap for sequential requests (order matters)
// ✅ Use exhaustMap for blocking requests (prevent duplicates)
// ✅ Always handle errors with catchError
// ✅ Return actions, not data`;

  entityAdapter = `// Entity Adapter - Manage Collections
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// 1. Define Entity State
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  error: string | null;
}

// 2. Create Entity Adapter
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id, // Default: entity.id
  sortComparer: (a, b) => a.name.localeCompare(b.name) // Optional sorting
});

// 3. Initial State
export const initialState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null
});

// 4. Reducer with Entity Adapter
export const usersReducer = createReducer(
  initialState,
  
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, { ...state, loading: false })
  ),
  
  on(UserActions.addUser, (state, { user }) =>
    userAdapter.addOne(user, state)
  ),
  
  on(UserActions.updateUser, (state, { user }) =>
    userAdapter.updateOne(
      { id: user.id, changes: user },
      state
    )
  ),
  
  on(UserActions.deleteUser, (state, { userId }) =>
    userAdapter.removeOne(userId, state)
  ),
  
  on(UserActions.addUsers, (state, { users }) =>
    userAdapter.addMany(users, state)
  ),
  
  on(UserActions.clearUsers, (state) =>
    userAdapter.removeAll(state)
  )
);

// 5. Entity Selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = userAdapter.getSelectors();

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  selectAll
);

export const selectUserEntities = createSelector(
  selectUserState,
  selectEntities
);

export const selectUserIds = createSelector(
  selectUserState,
  selectIds
);

export const selectUserTotal = createSelector(
  selectUserState,
  selectTotal
);

export const selectSelectedUser = createSelector(
  selectUserState,
  selectUserEntities,
  (state, entities) => 
    state.selectedUserId ? entities[state.selectedUserId] : null
);

// Entity Adapter Methods:
// addOne, addMany, addAll
// setOne, setMany, setAll
// removeOne, removeMany, removeAll
// updateOne, updateMany
// upsertOne, upsertMany
// map

// Benefits:
// ✅ Normalized state (entities by ID)
// ✅ Built-in CRUD operations
// ✅ Performance optimizations
// ✅ Consistent patterns`;

  componentStore = `// Component Store - Local State Management
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// 1. Define State Interface
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
}

// 2. Create Component Store
@Injectable()
export class TodoStore extends ComponentStore<TodoState> {
  
  constructor(private todoService: TodoService) {
    // Initialize state
    super({
      todos: [],
      filter: 'all',
      loading: false
    });
  }
  
  // 3. Selectors
  readonly todos$ = this.select(state => state.todos);
  readonly filter$ = this.select(state => state.filter);
  readonly loading$ = this.select(state => state.loading);
  
  readonly filteredTodos$ = this.select(
    this.todos$,
    this.filter$,
    (todos, filter) => {
      switch (filter) {
        case 'active': return todos.filter(t => !t.completed);
        case 'completed': return todos.filter(t => t.completed);
        default: return todos;
      }
    }
  );
  
  // 4. Updaters (synchronous state updates)
  readonly addTodo = this.updater((state, todo: Todo) => ({
    ...state,
    todos: [...state.todos, todo]
  }));
  
  readonly removeTodo = this.updater((state, id: number) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id)
  }));
  
  readonly toggleTodo = this.updater((state, id: number) => ({
    ...state,
    todos: state.todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  }));
  
  readonly setFilter = this.updater((state, filter: TodoState['filter']) => ({
    ...state,
    filter
  }));
  
  // 5. Effects (asynchronous operations)
  readonly loadTodos = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          tap(todos => this.patchState({ todos, loading: false })),
          catchError(() => {
            this.patchState({ loading: false });
            return of([]);
          })
        )
      )
    )
  );
  
  readonly saveTodo = this.effect<Todo>(todo$ =>
    todo$.pipe(
      switchMap(todo =>
        this.todoService.saveTodo(todo).pipe(
          tap(savedTodo => this.addTodo(savedTodo))
        )
      )
    )
  );
}

// 6. Use in Component
@Component({
  selector: 'app-todo-list',
  providers: [TodoStore], // Provide at component level
  template: \`
    <div *ngFor="let todo of todos$ | async">
      <input type="checkbox" 
             [checked]="todo.completed"
             (change)="store.toggleTodo(todo.id)">
      {{ todo.title }}
      <button (click)="store.removeTodo(todo.id)">Delete</button>
    </div>
    <button (click)="store.setFilter('all')">All</button>
    <button (click)="store.setFilter('active')">Active</button>
    <button (click)="store.setFilter('completed')">Completed</button>
  \`
})
export class TodoListComponent implements OnInit {
  todos$ = this.store.filteredTodos$;
  
  constructor(readonly store: TodoStore) {}
  
  ngOnInit() {
    this.store.loadTodos();
  }
}

// Component Store Benefits:
// ✅ Component-scoped state
// ✅ Automatic cleanup on component destroy
// ✅ Less boilerplate than global store
// ✅ Perfect for local UI state
// ✅ Can be combined with global store

// When to Use:
// - Component-specific state
// - Form state
// - UI state (modals, accordions)
// - Local data caching`;

  signalStore = `// Signal Store - Modern State Management (NgRx 17+)
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

// 1. Create Signal Store
export const TodoStore = signalStore(
  { providedIn: 'root' },
  
  // State
  withState({
    todos: [] as Todo[],
    filter: 'all' as 'all' | 'active' | 'completed',
    loading: false
  }),
  
  // Computed (derived state)
  withComputed((store) => ({
    filteredTodos: computed(() => {
      const todos = store.todos();
      const filter = store.filter();
      
      switch (filter) {
        case 'active': return todos.filter(t => !t.completed);
        case 'completed': return todos.filter(t => t.completed);
        default: return todos;
      }
    }),
    
    activeCount: computed(() =>
      store.todos().filter(t => !t.completed).length
    ),
    
    completedCount: computed(() =>
      store.todos().filter(t => t.completed).length
    )
  })),
  
  // Methods
  withMethods((store, todoService = inject(TodoService)) => ({
    async loadTodos() {
      patchState(store, { loading: true });
      try {
        const todos = await todoService.getTodos();
        patchState(store, { todos, loading: false });
      } catch (error) {
        patchState(store, { loading: false });
      }
    },
    
    addTodo(todo: Todo) {
      patchState(store, {
        todos: [...store.todos(), todo]
      });
    },
    
    removeTodo(id: number) {
      patchState(store, {
        todos: store.todos().filter(t => t.id !== id)
      });
    },
    
    toggleTodo(id: number) {
      patchState(store, {
        todos: store.todos().map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      });
    },
    
    setFilter(filter: 'all' | 'active' | 'completed') {
      patchState(store, { filter });
    }
  }))
);

// 2. Use in Component
@Component({
  selector: 'app-todo-list',
  template: \`
    <div *ngFor="let todo of store.filteredTodos()">
      <input type="checkbox" 
             [checked]="todo.completed"
             (change)="store.toggleTodo(todo.id)">
      {{ todo.title }}
    </div>
    <p>Active: {{ store.activeCount() }}</p>
    <p>Completed: {{ store.completedCount() }}</p>
  \`
})
export class TodoListComponent {
  readonly store = inject(TodoStore);
  
  ngOnInit() {
    this.store.loadTodos();
  }
}

// Signal Store Benefits:
// ✅ Simple API - Less boilerplate
// ✅ Type-safe - Full TypeScript support
// ✅ Reactive - Built on signals
// ✅ Composable - Mix and match features
// ✅ Performance - Fine-grained reactivity
// ✅ DevTools - Works with Redux DevTools

// Comparison:
// Traditional Store: Actions → Reducers → Selectors → Effects
// Signal Store: State → Computed → Methods (simpler!)`;

  bestPractices = `// NgRx Best Practices

// 1. Folder Structure
src/app/state/
  ├── users/
  │   ├── users.actions.ts
  │   ├── users.reducer.ts
  │   ├── users.selectors.ts
  │   ├── users.effects.ts
  │   └── index.ts (barrel export)
  ├── products/
  └── app.state.ts

// 2. Action Naming
// ✅ Good: [Source] Event
export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction('[User API] Load Users Success');

// ❌ Bad: Generic names
export const load = createAction('load');
export const success = createAction('success');

// 3. State Shape
// ✅ Good: Normalized and flat
interface UsersState {
  ids: number[];
  entities: { [id: number]: User };
  selectedId: number | null;
}

// ❌ Bad: Nested and denormalized
interface UsersState {
  users: {
    user: User;
    posts: Post[];
    comments: Comment[];
  }[];
}

// 4. Selectors
// ✅ Good: Memoized selectors
export const selectUserById = (id: number) => createSelector(
  selectAllUsers,
  (users) => users.find(u => u.id === id)
);

// ❌ Bad: Inline logic in components
this.user = this.users.find(u => u.id === this.userId);

// 5. Effects
// ✅ Good: Handle all cases
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() =>
      this.service.getUsers().pipe(
        map(users => loadUsersSuccess({ users })),
        catchError(error => of(loadUsersFailure({ error })))
      )
    )
  )
);

// ❌ Bad: No error handling
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() => this.service.getUsers()),
    map(users => loadUsersSuccess({ users }))
  )
);

// 6. Component Design
// ✅ Good: Smart/Container components
@Component({
  selector: 'app-user-list-container',
  template: \`
    <app-user-list
      [users]="users$ | async"
      [loading]="loading$ | async"
      (loadUsers)="onLoadUsers()"
      (selectUser)="onSelectUser($event)">
    </app-user-list>
  \`
})
export class UserListContainerComponent {
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);
  
  onLoadUsers() {
    this.store.dispatch(loadUsers());
  }
  
  onSelectUser(userId: number) {
    this.store.dispatch(selectUser({ userId }));
  }
}

// ✅ Good: Presentational/Dumb component
@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() users: User[];
  @Input() loading: boolean;
  @Output() loadUsers = new EventEmitter<void>();
  @Output() selectUser = new EventEmitter<number>();
}

// 7. Testing
// ✅ Good: Test each piece independently
describe('usersReducer', () => {
  it('should add user', () => {
    const user = { id: 1, name: 'Test' };
    const action = addUser({ user });
    const state = usersReducer(initialState, action);
    
    expect(state.users).toContain(user);
  });
});

// 8. Performance
// ✅ Use Entity Adapter for collections
// ✅ Use OnPush change detection
// ✅ Memoize selectors
// ✅ Avoid selecting entire state
// ✅ Use trackBy with *ngFor

// 9. Don'ts
// ❌ Don't mutate state
// ❌ Don't put logic in actions
// ❌ Don't dispatch actions in reducers
// ❌ Don't subscribe to store in services
// ❌ Don't use store for all state (local state is OK)

// 10. Do's
// ✅ Keep reducers pure
// ✅ Handle errors in effects
// ✅ Use strong typing
// ✅ Test thoroughly
// ✅ Use Redux DevTools`;

  ngAfterViewChecked() {
    Prism.highlightAll();
  }
}
