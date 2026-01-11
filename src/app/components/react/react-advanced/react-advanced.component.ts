import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

@Component({
  selector: 'app-react-advanced',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-advanced.component.html',
  styleUrl: './react-advanced.component.scss'
})
export class ReactAdvancedComponent implements AfterViewChecked {
  
  higherOrderComponents = `// Higher-Order Components (HOC)
// A function that takes a component and returns a new component

function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

// HOC with additional props
function withLoading(WrappedComponent) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <Spinner />;
    }
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);`;

  renderProps = `// Render Props Pattern
// A component with a function prop that returns React elements

class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
<Mouse render=({ x, y }) => (
  <h1>Mouse position: {x}, {y}</h1>
)}/>

// Modern alternative: Custom Hook
function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}

// Usage
function App() {
  const { x, y } = useMouse();
  return <h1>Mouse: {x}, {y}</h1>;
}`;

  portals = `// Portals - Render children outside parent DOM hierarchy
import ReactDOM from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  // Renders into #modal-root instead of parent component
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      <Modal isOpen={showModal}>
        <h2>Modal Title</h2>
        <p>Modal content</p>
        <button onClick={() => setShowModal(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
}

// HTML: <div id="root"></div><div id="modal-root"></div>`;

  errorBoundaries = `// Error Boundaries - Catch JavaScript errors in component tree
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`;

  refs = `// Refs - Access DOM elements or store mutable values
import React, { useRef, useEffect } from 'react';

// 1. Accessing DOM elements
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// 2. Storing mutable values (doesn't cause re-render)
function Timer() {
  const intervalRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return <div>Count: {count}</div>;
}

// 3. Forward Refs
const FancyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} className="fancy" />;
});

// Usage
function Parent() {
  const inputRef = useRef();
  
  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focus
      </button>
    </div>
  );
}`;

  compoundComponents = `// Compound Components Pattern
// Components that work together to form a complete UI

const Select = ({ children, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="select">
      <button onClick={() => setIsOpen(!isOpen)}>
        {value || 'Select...\'}
      </button>
      {isOpen && (
        <div className="options">
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              onClick: () => {
                onChange(child.props.value);
                setIsOpen(false);
              }
            })
          )}
        </div>
      )}
    </div>
  );
};

Select.Option = ({ children, value, onClick }) => (
  <div className="option" onClick={onClick}>
    {children}
  </div>
);

// Usage
<Select value={selected} onChange={setSelected}>
  <Select.Option value="react">React</Select.Option>
  <Select.Option value="vue">Vue</Select.Option>
  <Select.Option value="angular">Angular</Select.Option>
</Select>`;

  ngAfterViewChecked(): void {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}
