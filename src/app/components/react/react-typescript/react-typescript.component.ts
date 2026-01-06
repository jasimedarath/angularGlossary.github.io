import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-react-typescript',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-typescript.component.html',
  styleUrl: './react-typescript.component.scss'
})
export class ReactTypescriptComponent {
  basicTypes = `// Basic Type Annotations
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

// Array types
const numbers: number[] = [1, 2, 3];
const users: User[] = [];

// Union types
type Status = 'pending' | 'approved' | 'rejected';
const status: Status = 'pending';`;

  functionComponentTypes = `// Function Component with Props
interface GreetingProps {
  name: string;
  age?: number;
  onGreet?: () => void;
}

function Greeting({ name, age, onGreet }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
      {onGreet && <button onClick={onGreet}>Greet</button>}
    </div>
  );
}

// With React.FC (includes children automatically)
const Welcome: React.FC<GreetingProps> = ({ name, age }) => {
  return <h1>Welcome, {name}!</h1>;
};

// Usage
<Greeting name="John" age={30} onGreet={() => alert('Hi!')} />`;

  stateTypes = `// useState with TypeScript
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

// Type inference
const [count, setCount] = useState(0); // number
const [name, setName] = useState(''); // string

// Explicit typing
const [user, setUser] = useState<User | null>(null);

// With initial value
const [users, setUsers] = useState<User[]>([]);

// Complex state
interface FormState {
  username: string;
  password: string;
  rememberMe: boolean;
}

const [form, setForm] = useState<FormState>({
  username: '',
  password: '',
  rememberMe: false
});`;

  eventTypes = `// Event Handlers with Types
import { ChangeEvent, FormEvent, MouseEvent } from 'react';

function Form() {
  // Input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  // Form submit handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  // Button click handler
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked');
  };

  // Generic event handler
  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <textarea onChange={handleInput} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}`;

  propsChildren = `// Children Props
import { ReactNode, ReactElement } from 'react';

// Using ReactNode (most flexible)
interface ContainerProps {
  children: ReactNode;
  title: string;
}

function Container({ children, title }: ContainerProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Using ReactElement (specific)
interface CardProps {
  header: ReactElement;
  footer: ReactElement;
}

function Card({ header, footer }: CardProps) {
  return (
    <div className="card">
      <div className="header">{header}</div>
      <div className="footer">{footer}</div>
    </div>
  );
}

// Render prop pattern
interface RenderProps {
  data: User[];
  render: (item: User) => ReactElement;
}

function UserList({ data, render }: RenderProps) {
  return <div>{data.map(render)}</div>;
}`;

  hooksTypes = `// Custom Hooks with TypeScript
import { useState, useEffect, useRef, RefObject } from 'react';

// Custom hook with return type
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [user, setUser] = useLocalStorage<User>('user', { id: 0, name: '', email: '' });

// useRef with types
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return <input ref={inputRef} />;
}

// Generic custom hook
function useFetch<T>(url: string): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch<User[]>('/api/users');`;

  genericComponents = `// Generic Components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map(item => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

// Usage with different types
<List
  items={users}
  renderItem={user => <div>{user.name}</div>}
  keyExtractor={user => user.id}
/>

<List
  items={products}
  renderItem={product => <div>{product.title}</div>}
  keyExtractor={product => product.id}
/>

// Generic form field
interface FormFieldProps<T> {
  name: keyof T;
  value: T[keyof T];
  onChange: (name: keyof T, value: T[keyof T]) => void;
}

function FormField<T>({ name, value, onChange }: FormFieldProps<T>) {
  return (
    <input
      value={String(value)}
      onChange={e => onChange(name, e.target.value as T[keyof T])}
    />
  );
}`;

  contextTypes = `// Context with TypeScript
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook with type checking
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function Profile() {
  const { user, logout } = useAuth();
  return user ? <div>{user.name}</div> : null;
}`;

  utilityTypes = `// Utility Types in React
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
const updateUser: PartialUser = { name: 'John' };

// Required - all properties required
type RequiredUser = Required<Partial<User>>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
const preview: UserPreview = { id: 1, name: 'John' };

// Omit - exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>;
const safeUser: UserWithoutPassword = { id: 1, name: 'John', email: 'john@example.com' };

// Record - create object type
type UserRoles = Record<number, 'admin' | 'user' | 'guest'>;
const roles: UserRoles = { 1: 'admin', 2: 'user' };

// Component props with HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

function Button({ variant, ...props }: ButtonProps) {
  return <button className={\`btn-$\{variant}\`} {...props} />;
}`;
}
