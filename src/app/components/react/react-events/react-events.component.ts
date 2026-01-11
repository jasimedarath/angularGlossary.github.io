import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

@Component({
  selector: 'app-react-events',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-events.component.html',
  styleUrl: './react-events.component.scss'
})
export class ReactEventsComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  eventBasics = `// Basic Event Handling
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}

// Inline Event Handler
function InlineButton() {
  return (
    <button onClick={() => console.log('Clicked!')}>
      Click Me
    </button>
  );
}

// Event with Parameters
function ParameterButton() {
  const handleClick = (message) => {
    alert(message);
  };

  return (
    <button onClick={() => handleClick('Hello!')}>
      Say Hello
    </button>
  );
}

// Multiple Event Handlers
function MultiEventDiv() {
  return (
    <div
      onClick={() => console.log('Clicked')}
      onMouseEnter={() => console.log('Mouse entered')}
      onMouseLeave={() => console.log('Mouse left')}
    >
      Hover or click me
    </div>
  );
}`;

  syntheticEvents = `// Synthetic Event Object
function InputComponent() {
  const handleChange = (event) => {
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Value:', event.target.value);
    console.log('Native event:', event.nativeEvent);
  };

  return <input onChange={handleChange} />;
}

// Event Properties
function FormExample() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted');
    
    // Access form data
    const formData = new FormData(e.target);
    console.log('Data:', Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Event Pooling (React 17+)
function EventPooling() {
  const handleClick = (e) => {
    console.log('Event:', e.type);
    
    // In React 17+, synthetic events are not pooled
    setTimeout(() => {
      console.log('Still accessible:', e.type);
    }, 1000);
  };

  return <button onClick={handleClick}>Click</button>;
}`;

  formEvents = `// Form Input Events
function FormEvents() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    console.log('Input focused:', e.target.name);
  };

  const handleBlur = (e) => {
    console.log('Input blurred:', e.target.name);
  };

  return (
    <form>
      <input
        name="text"
        value={formData.text}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
    </form>
  );
}

// Select and Checkbox Events
function SelectEvents() {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Choose...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
    </div>
  );
}`;

  mouseKeyboardEvents = `// Mouse Events
function MouseEvents() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDoubleClick = () => {
    console.log('Double clicked!');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      style={{ height: '200px', border: '1px solid black' }}
    >
      Mouse position: X: {position.x}, Y: {position.y}
    </div>
  );
}

// Keyboard Events
function KeyboardEvents() {
  const [key, setKey] = useState('');

  const handleKeyDown = (e) => {
    console.log('Key:', e.key);
    console.log('Code:', e.code);
    console.log('Ctrl pressed:', e.ctrlKey);
    console.log('Shift pressed:', e.shiftKey);
    setKey(e.key);
  };

  return (
    <input
      onKeyDown={handleKeyDown}
      onKeyUp={(e) => console.log('Key released:', e.key)}
      onKeyPress={(e) => console.log('Key pressed:', e.key)}
      placeholder="Type something..."
    />
  );
}`;

  eventPropagation = `// Event Bubbling
function EventBubbling() {
  const handleParentClick = () => {
    console.log('Parent clicked');
  };

  const handleChildClick = () => {
    console.log('Child clicked');
  };

  return (
    <div onClick={handleParentClick} style={{ padding: '20px', background: 'lightblue' }}>
      Parent
      <button onClick={handleChildClick}>
        Child Button
      </button>
    </div>
  );
  // Clicking child logs: "Child clicked" then "Parent clicked"
}

// Stop Propagation
function StopPropagation() {
  const handleParentClick = () => {
    console.log('Parent clicked');
  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // Stop event from bubbling
    console.log('Child clicked');
  };

  return (
    <div onClick={handleParentClick}>
      Parent
      <button onClick={handleChildClick}>
        Child Button (won't trigger parent)
      </button>
    </div>
  );
}`;

  customEvents = `// Custom Event Handler
function CustomEventButton({ onCustomClick }) {
  const handleClick = (e) => {
    // Do some processing
    const customData = {
      timestamp: Date.now(),
      position: { x: e.clientX, y: e.clientY }
    };
    
    // Call parent's callback with custom data
    onCustomClick(customData);
  };

  return <button onClick={handleClick}>Click Me</button>;
}

// Parent Component
function ParentComponent() {
  const handleCustomClick = (data) => {
    console.log('Custom event received:', data);
  };

  return <CustomEventButton onCustomClick={handleCustomClick} />;
}

// Debounced Events
function DebouncedSearch() {
  const [query, setQuery] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((value) => {
      console.log('Searching for:', value);
      // Perform search
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}`;

  eventBestPractices = `// Best Practices for Event Handling

// 1. Use Arrow Functions or bind in constructor (class components)
class MyComponent extends React.Component {
  // Method 1: Arrow function (recommended)
  handleClick = () => {
    console.log(this.state);
  };

  // Method 2: Bind in constructor
  constructor(props) {
    super(props);
    this.handleClickBound = this.handleClickBound.bind(this);
  }

  handleClickBound() {
    console.log(this.state);
  }
}

// 2. Avoid Creating Functions in Render
function GoodExample() {
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <button onClick={handleClick}>Click</button>;
}

// 3. Pass Parameters Correctly
function ParameterExample({ items }) {
  const handleItemClick = (id) => {
    console.log('Item clicked:', id);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// 4. Prevent Default When Needed
function LinkHandler() {
  const handleClick = (e) => {
    e.preventDefault();
    // Custom navigation logic
  };

  return <a href="/page" onClick={handleClick}>Link</a>;
}`;
}
