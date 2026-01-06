import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-state',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-state.component.html',
  styleUrl: './react-state.component.scss'
})
export class ReactStateComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  stateBasics = `import { useState } from 'react';

// Basic useState Example
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

// Multiple State Variables
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(e.target.value)} />
    </form>
  );
}`;

  stateObjects = `// State with Objects
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
    email: 'john@example.com'
  });

  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };

  const updateAge = (newAge) => {
    setUser(prevUser => ({ ...prevUser, age: newAge }));
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => updateName('Jane')}>Change Name</button>
      <button onClick={() => updateAge(user.age + 1)}>Birthday</button>
    </div>
  );
}

// Nested State Objects
function AppSettings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  });

  const toggleEmailNotifications = () => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        email: !prev.notifications.email
      }
    }));
  };
}`;

  stateArrays = `// State with Arrays
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  functionalUpdates = `// Functional Updates
function Counter() {
  const [count, setCount] = useState(0);

  // Regular update (can cause issues with multiple updates)
  const incrementBad = () => {
    setCount(count + 1);
    setCount(count + 1); // This won't work as expected
  };

  // Functional update (correct way)
  const incrementGood = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // This works correctly
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementGood}>Increment by 2</button>
    </div>
  );
}

// With Complex State
function ShoppingCart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const addItem = (item) => {
    setCart(prevCart => ({
      items: [...prevCart.items, item],
      total: prevCart.total + item.price
    }));
  };

  const removeItem = (itemId) => {
    setCart(prevCart => {
      const item = prevCart.items.find(i => i.id === itemId);
      return {
        items: prevCart.items.filter(i => i.id !== itemId),
        total: prevCart.total - item.price
      };
    });
  };
}`;

  lazyInitialization = `// Lazy Initial State
function ExpensiveComponent() {
  // Bad: Function runs on every render
  const [data, setData] = useState(computeExpensiveValue());

  // Good: Function runs only once
  const [data, setData] = useState(() => computeExpensiveValue());

  return <div>{data}</div>;
}

function computeExpensiveValue() {
  console.log('Computing expensive value...');
  // Expensive computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result;
}

// With localStorage
function UserPreferences() {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('preferences');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      language: 'en'
    };
  });

  const updatePreferences = (newPrefs) => {
    setPreferences(newPrefs);
    localStorage.setItem('preferences', JSON.stringify(newPrefs));
  };
}`;

  classComponentState = `import React, { Component } from 'react';

// Class Component with State
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      step: 1
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + this.state.step });
  };

  // Functional setState
  incrementFunctional = () => {
    this.setState(prevState => ({
      count: prevState.count + prevState.step
    }));
  };

  // setState with callback
  incrementWithCallback = () => {
    this.setState(
      { count: this.state.count + 1 },
      () => {
        console.log('State updated:', this.state.count);
      }
    );
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}`;

  stateBestPractices = `// State Management Best Practices

// 1. Don't mutate state directly
function BadExample() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const addItemBad = () => {
    items.push(4); // Wrong!
    setItems(items);
  };
  
  const addItemGood = () => {
    setItems([...items, 4]); // Correct!
  };
}

// 2. Merge state updates manually (objects)
function FormState() {
  const [form, setForm] = useState({ name: '', email: '' });
  
  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
}

// 3. Use functional updates for dependent state
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1); // Use functional update
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
}

// 4. Split unrelated state
function UserDashboard() {
  // Good: Split into multiple state variables
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Bad: One large state object for unrelated data
  // const [state, setState] = useState({ user: null, posts: [], loading: false });
}

// 5. Keep state minimal and derived
function ProductList({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Good: Derive filtered list instead of storing it
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return <div>{filteredProducts.map(...)}</div>;
}`;
}
