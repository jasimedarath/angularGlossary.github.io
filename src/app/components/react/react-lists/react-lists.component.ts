import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-lists',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-lists.component.html',
  styleUrl: './react-lists.component.scss'
})
export class ReactListsComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  basicLists = `// Basic List Rendering with map()
function TodoList() {
  const todos = ['Buy groceries', 'Walk the dog', 'Write code'];
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}

// List with objects
function UserList() {
  const users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 35 }
  ];
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.age} years old
        </li>
      ))}
    </ul>
  );
}`;

  keysImportance = `// Why Keys Matter
function BadExample() {
  const items = ['Apple', 'Banana', 'Cherry'];
  
  // Bad: Using index as key (avoid when list can change)
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function GoodExample() {
  const items = [
    { id: 'a1', name: 'Apple' },
    { id: 'b2', name: 'Banana' },
    { id: 'c3', name: 'Cherry' }
  ];
  
  // Good: Using unique IDs
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Keys help React identify which items changed
function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' }
  ]);
  
  const addItem = () => {
    setItems([...items, { id: Date.now(), text: \`Item $\{items.length + 1}\` }]);
  };
  
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}`;

  nestedLists = `// Nested Lists
function CategoryList() {
  const categories = [
    {
      id: 1,
      name: 'Fruits',
      items: [
        { id: 'f1', name: 'Apple' },
        { id: 'f2', name: 'Banana' }
      ]
    },
    {
      id: 2,
      name: 'Vegetables',
      items: [
        { id: 'v1', name: 'Carrot' },
        { id: 'v2', name: 'Broccoli' }
      ]
    }
  ];
  
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}`;

  filterSort = `// Filtering and Sorting Lists
function ProductList({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // Filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });
  
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      
      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>
            {product.name} - $\{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  conditionalItems = `// Conditional List Items
function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(task => (
        <li
          key={task.id}
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.priority === 'high' ? 'red' : 'black'
          }}
        >
          {task.title}
          {task.urgent && <span className="urgent-badge">!</span>}
        </li>
      ))}
    </ul>
  );
}

// Empty State
function UserList({ users }) {
  if (users.length === 0) {
    return <p>No users found</p>;
  }
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`;

  listComponents = `// Extracting List Items to Components
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build app', completed: false }
  ]);
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
}`;

  virtualizedLists = `// Virtualized Lists (for large datasets)
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      Row {index}: {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}

// Infinite Scroll
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const loadMore = () => {
    setLoading(true);
    fetchItems(page).then(newItems => {
      setItems([...items, ...newItems]);
      setPage(page + 1);
      setLoading(false);
    });
  };
  
  return (
    <div>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      <button onClick={loadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}`;

  bestPractices = `// List Rendering Best Practices

// 1. Always use unique keys
const goodList = items.map(item => <li key={item.id}>{item.name}</li>);

// 2. Avoid index as key when list can change
// Bad
items.map((item, index) => <li key={index}>{item}</li>);
// Good
items.map(item => <li key={item.id}>{item.name}</li>);

// 3. Extract list items to components
function UserListItem({ user }) {
  return <li>{user.name} - {user.email}</li>;
}

function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <UserListItem key={user.id} user={user} />)}
    </ul>
  );
}

// 4. Use React.memo for expensive list items
const ExpensiveItem = React.memo(function ExpensiveItem({ item }) {
  // Expensive rendering logic
  return <li>{item.name}</li>;
});

// 5. Handle empty states
function List({ items }) {
  if (items.length === 0) return <EmptyState />;
  return <ul>{items.map(...)}</ul>;
}`;
}
