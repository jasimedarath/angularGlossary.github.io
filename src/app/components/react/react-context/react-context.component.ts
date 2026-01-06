import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-context',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-context.component.html',
  styleUrl: './react-context.component.scss'
})
export class ReactContextComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  contextBasics = `import { createContext, useContext, useState } from 'react';

// Create Context
const ThemeContext = createContext();

// Provider Component
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
      <Content />
    </ThemeContext.Provider>
  );
}

// Consumer Component
function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme (Current: {theme})
    </button>
  );
}`;

  providerPattern = `// Custom Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = { theme, setTheme, toggleTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}`;

  customHook = `// Custom Hook for Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function Header() {
  const { theme, setTheme } = useTheme();
  return <div className={theme}>Header</div>;
}`;

  multipleContexts = `// Multiple Contexts
const UserContext = createContext();
const SettingsContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({});
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <Dashboard />
      </SettingsContext.Provider>
    </UserContext.Provider>
  );
}

// Using multiple contexts
function Dashboard() {
  const { user } = useContext(UserContext);
  const { settings } = useContext(SettingsContext);
  
  return <div>Welcome {user?.name}</div>;
}`;

  contextWithReducer = `// Context with useReducer
const StateContext = createContext();

function stateReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(stateReducer, {
    user: null,
    theme: 'light'
  });
  
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}`;

  performance = `// Performance Optimization
// 1. Memoize context value
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 2. Split contexts to avoid unnecessary re-renders
const UserStateContext = createContext();
const UserDispatchContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}`;

  realWorldExample = `// Real-world Auth Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token).then(setUser).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  
  const login = async (email, password) => {
    const user = await api.login(email, password);
    setUser(user);
    localStorage.setItem('token', user.token);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const value = { user, loading, login, logout };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
}`;

  bestPractices = `// Context Best Practices

// 1. Create custom hooks for contexts
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within Provider');
  return context;
}

// 2. Separate state and dispatch contexts for optimization
const StateContext = createContext();
const DispatchContext = createContext();

// 3. Memoize context values
const value = useMemo(() => ({ state, dispatch }), [state]);

// 4. Split large contexts into smaller ones
// Instead of one AppContext, use:
// - AuthContext
// - ThemeContext
// - SettingsContext

// 5. Don't overuse Context
// Use Context for truly global state
// Use props for component-specific data
// Consider state management libraries for complex apps (Redux, Zustand)`;
}
