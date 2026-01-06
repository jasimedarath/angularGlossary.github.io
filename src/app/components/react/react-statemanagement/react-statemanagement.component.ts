import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-react-statemanagement',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-statemanagement.component.html',
  styleUrl: './react-statemanagement.component.scss'
})
export class ReactStatemanagementComponent {
  redux = `// Redux - Predictable State Container
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Store
const store = createStore(counterReducer);

// Component
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

// App
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}`;

  reduxToolkit = `// Redux Toolkit - Modern Redux
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1; // Immer allows mutations
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Component
function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}`;

  zustand = `// Zustand - Lightweight State Management
import create from 'zustand';

// Store
const useStore = create((set) => ({
  count: 0,
  user: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user }),
  reset: () => set({ count: 0, user: null })
}));

// Component
function Counter() {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  const decrement = useStore(state => state.decrement);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// Multiple components can access the same store
function User() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => setUser({ name: 'John' })}>Login</button>
      )}
    </div>
  );
}

// Middleware example
const useStoreWithMiddleware = create((set) => ({
  count: 0,
  increment: () => set((state) => {
    console.log('Before:', state.count);
    const newState = { count: state.count + 1 };
    console.log('After:', newState.count);
    return newState;
  })
}));`;

  jotai = `// Jotai - Primitive and Flexible State
import { atom, useAtom } from 'jotai';

// Atoms (pieces of state)
const countAtom = atom(0);
const userAtom = atom({ name: '', email: '' });

// Derived atoms
const doubleCountAtom = atom(
  (get) => get(countAtom) * 2
);

// Write-only atoms
const incrementAtom = atom(
  null,
  (get, set) => set(countAtom, get(countAtom) + 1)
);

// Component
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubleCount] = useAtom(doubleCountAtom);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {doubleCount}</h2>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  );
}

// Async atoms
const fetchUserAtom = atom(async () => {
  const res = await fetch('/api/user');
  return res.json();
});

function UserProfile() {
  const [user] = useAtom(fetchUserAtom);
  return <div>{user.name}</div>;
}`;

  recoil = `// Recoil - Facebook's State Management
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { RecoilRoot } from 'recoil';

// Atoms
const countState = atom({
  key: 'countState',
  default: 0
});

const userState = atom({
  key: 'userState',
  default: { name: '', email: '' }
});

// Selectors (derived state)
const doubleCountState = selector({
  key: 'doubleCountState',
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  }
});

// Component
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  const doubleCount = useRecoilValue(doubleCountState);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {doubleCount}</h2>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

// Async selectors
const currentUserQuery = selector({
  key: 'currentUserQuery',
  get: async () => {
    const res = await fetch('/api/user');
    return res.json();
  }
});

// App wrapper
function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}`;

  mobx = `// MobX - Observable State
import { makeObservable, observable, action, computed } from 'mobx';
import { observer } from 'mobx-react-lite';

// Store class
class CounterStore {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
      doubleCount: computed
    });
  }

  increment = () => {
    this.count++;
  };

  decrement = () => {
    this.count--;
  };

  get doubleCount() {
    return this.count * 2;
  }
}

const store = new CounterStore();

// Component (observer makes it reactive)
const Counter = observer(() => {
  return (
    <div>
      <h1>{store.count}</h1>
      <h2>Double: {store.doubleCount}</h2>
      <button onClick={store.increment}>+</button>
      <button onClick={store.decrement}>-</button>
    </div>
  );
});

// React hooks API
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

const timer = new Timer();

const TimerView = observer(() => (
  <div>
    <p>Seconds: {timer.secondsPassed}</p>
    <button onClick={() => timer.increase()}>Increase</button>
    <button onClick={() => timer.reset()}>Reset</button>
  </div>
));`;

  contextReducer = `// Context + useReducer Pattern
import { createContext, useContext, useReducer, ReactNode } from 'react';

// State and actions
interface State {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification };

// Reducer
function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light',
    notifications: []
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

// Usage
function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className={state.theme}>
      {state.user ? (
        <div>
          <span>{state.user.name}</span>
          <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
        </div>
      ) : (
        <button>Login</button>
      )}
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
        Toggle Theme
      </button>
    </header>
  );
}`;

  comparison = `// State Management Comparison

// ✅ Redux Toolkit - Best for:
// - Large applications
// - Complex state logic
// - Time-travel debugging
// - Strict patterns
// - Team consistency

// ✅ Zustand - Best for:
// - Small to medium apps
// - Simple API
// - No boilerplate
// - Fast setup
// - Modern approach

// ✅ Jotai - Best for:
// - Atomic state management
// - Bottom-up approach
// - React Suspense integration
// - Derived state
// - Minimal bundle size

// ✅ Recoil - Best for:
// - Facebook-style approach
// - Atoms and selectors
// - Async state
// - Experimental features
// - Graph-based state

// ✅ MobX - Best for:
// - OOP style
// - Automatic reactivity
// - Less boilerplate
// - Observable patterns
// - Enterprise apps

// ✅ Context + useReducer - Best for:
// - Built-in solution
// - No dependencies
// - Small apps
// - Simple global state
// - Learning basics

// Performance Comparison:
// Zustand ≈ Jotai > Context > Redux Toolkit > Recoil > MobX

// Bundle Size (approximate):
// Zustand: ~1KB
// Jotai: ~3KB
// Redux Toolkit: ~12KB
// Recoil: ~21KB
// MobX: ~17KB
// Context: 0KB (built-in)`;
}
