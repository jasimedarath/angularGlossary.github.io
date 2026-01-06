import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-performance',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-performance.component.html',
  styleUrl: './react-performance.component.scss'
})
export class ReactPerformanceComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  reactMemo = `// React.memo - Prevent Re-renders
import { memo } from 'react';

// Without memo - re-renders on every parent render
function ExpensiveComponent({ data }) {
  console.log('Rendering ExpensiveComponent');
  return <div>{data.value}</div>;
}

// With memo - only re-renders when props change
const MemoizedComponent = memo(function ExpensiveComponent({ data }) {
  console.log('Rendering ExpensiveComponent');
  return <div>{data.value}</div>;
});

// Custom comparison function
const CustomMemoComponent = memo(
  ({ user }) => <div>{user.name}</div>,
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  }
);`;

  useMemoHook = `// useMemo - Memoize Expensive Calculations
import { useMemo, useState } from 'react';

function DataTable({ data }) {
  const [filter, setFilter] = useState('');
  
  // Without useMemo - runs on every render
  const filteredData = data.filter(item => 
    item.name.includes(filter)
  );
  
  // With useMemo - only recalculates when dependencies change
  const memoizedFilteredData = useMemo(() => {
    console.log('Filtering data...');
    return data.filter(item => item.name.includes(filter));
  }, [data, filter]);
  
  // Expensive computation
  const statistics = useMemo(() => {
    console.log('Computing statistics...');
    return {
      total: data.length,
      average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
      max: Math.max(...data.map(item => item.value))
    };
  }, [data]);
  
  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {memoizedFilteredData.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      <div>Total: {statistics.total}</div>
    </div>
  );
}`;

  useCallbackHook = `// useCallback - Memoize Functions
import { useCallback, memo } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Without useCallback - new function on every render
  const handleClick = () => {
    console.log('Button clicked');
  };
  
  // With useCallback - same function reference
  const memoizedHandleClick = useCallback(() => {
    console.log('Button clicked', count);
  }, [count]);
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ChildComponent onClick={memoizedHandleClick} />
    </div>
  );
}

// Child component with memo
const ChildComponent = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click Me</button>;
});`;

  codeSplitting = `// Code Splitting with React.lazy
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// Dynamic import with delay
const HeavyComponent = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./HeavyComponent'));
    }, 1000);
  });
});`;

  virtualization = `// List Virtualization
import { FixedSizeList } from 'react-window';

// Virtualize large lists - only render visible items
function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}

// Without virtualization - renders all 10,000 items
function RegularList({ items }) {
  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}`;

  optimization = `// General Optimization Techniques

// 1. Debounce expensive operations
function SearchComponent() {
  const [query, setQuery] = useState('');
  
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      // Expensive search operation
      performSearch(value);
    }, 300),
    []
  );
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };
  
  return <input value={query} onChange={handleChange} />;
}

// 2. Lazy initialization
const [state, setState] = useState(() => {
  const saved = localStorage.getItem('data');
  return saved ? JSON.parse(saved) : initialData;
});

// 3. Avoid inline object creation
// Bad
<Component style={{ marginTop: 10 }} />

// Good
const styles = { marginTop: 10 };
<Component style={styles} />`;

  profiling = `// Performance Profiling

// 1. Use React DevTools Profiler
// Enable profiler in DevTools

// 2. Measure render time
import { Profiler } from 'react';

function onRenderCallback(
  id, // component that was rendered
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time without memoization
  startTime, // when React began rendering
  commitTime, // when React committed the update
  interactions // Set of interactions for this update
) {
  console.log(\`$\{id} took $\{actualDuration}ms\`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}

// 3. Use performance.mark
useEffect(() => {
  performance.mark('componentDidMount');
  return () => {
    performance.mark('componentWillUnmount');
    performance.measure('componentLifetime', 'componentDidMount', 'componentWillUnmount');
  };
}, []);`;

  bestPractices = `// Performance Best Practices

// 1. Use React.memo for expensive components
const ExpensiveComponent = memo(MyComponent);

// 2. useMemo for expensive calculations
const result = useMemo(() => expensiveCalculation(data), [data]);

// 3. useCallback for event handlers passed to memoized children
const handleClick = useCallback(() => {/* ... */}, [dependencies]);

// 4. Code splitting with React.lazy
const Component = lazy(() => import('./Component'));

// 5. Virtualize long lists
// Use react-window or react-virtualized

// 6. Avoid unnecessary re-renders
// - Use proper keys in lists
// - Don't create functions/objects inline
// - Split large components

// 7. Optimize images
// - Use appropriate formats (WebP)
// - Lazy load images
// - Use responsive images

// 8. Bundle optimization
// - Tree shaking
// - Code splitting
// - Lazy loading routes

// 9. Avoid prop drilling - use Context or state management

// 10. Profile regularly with React DevTools`;
}
