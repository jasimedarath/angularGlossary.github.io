import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-components',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-components.component.html',
  styleUrl: './react-components.component.scss'
})
export class ReactComponentsComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  functionalComponents = `// Modern Function Component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow Function Component
const Greeting = (props) => {
  return <h1>Welcome, {props.user}!</h1>;
}

// Implicit Return
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Component with children
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}`;

  classComponents = `import React, { Component } from 'react';

// Basic Class Component
class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Class Component with State
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;`;

  componentComparison = `// Functional Component (Modern & Preferred)
function UserProfile({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Component did mount
    console.log('Component mounted');
    
    return () => {
      // Component will unmount
      console.log('Component unmounting');
    };
  }, []);

  return <div>{user.name}</div>;
}

// Class Component (Legacy)
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  componentWillUnmount() {
    console.log('Component unmounting');
  }

  render() {
    return <div>{this.props.user.name}</div>;
  }
}`;

  componentComposition = `// Composition Example
function Avatar({ user }) {
  return (
    <img 
      src={user.avatarUrl}
      alt={user.name}
      className="avatar"
    />
  );
}

function UserInfo({ user }) {
  return (
    <div className="user-info">
      <Avatar user={user} />
      <div className="user-name">{user.name}</div>
    </div>
  );
}

function Comment({ author, text, date }) {
  return (
    <div className="comment">
      <UserInfo user={author} />
      <div className="comment-text">{text}</div>
      <div className="comment-date">{date}</div>
    </div>
  );
}`;

  componentExport = `// Named Exports
export function Button({ label }) {
  return <button>{label}</button>;
}

export function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

// Default Export
export default function App() {
  return (
    <div>
      <Button label="Click me" />
      <Input value="" onChange={() => {}} />
    </div>
  );
}

// Importing
// import App, { Button, Input } from './App';`;

  componentProps = `// Destructuring Props
function UserCard({ name, age, email }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Default Props
function Greeting({ name = 'Guest', message = 'Welcome' }) {
  return <h1>{message}, {name}!</h1>;
}

// Spread Props
function Profile(props) {
  return (
    <div>
      <UserCard {...props} />
    </div>
  );
}

// Usage
<Profile name="John" age={30} email="john@example.com" />`;

  pureComponents = `import React, { memo, PureComponent } from 'react';

// Functional Component with memo
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  console.log('Rendering ExpensiveComponent');
  return <div>{data.value}</div>;
});

// Custom comparison function
const CustomMemo = memo(
  function MyComponent({ person }) {
    return <div>{person.name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.person.id === nextProps.person.id;
  }
);

// PureComponent (Class)
class CounterDisplay extends PureComponent {
  render() {
    console.log('Rendering CounterDisplay');
    return <div>Count: {this.props.count}</div>;
  }
}`;

  componentPatterns = `// Container/Presentational Pattern
// Container Component
function UserContainer() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  return <UserPresentation user={user} />;
}

// Presentational Component
function UserPresentation({ user }) {
  if (!user) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Component with Multiple Returns
function Dashboard({ isLoggedIn, isLoading }) {
  if (isLoading) return <LoadingSpinner />;
  if (!isLoggedIn) return <LoginPage />;
  
  return <MainDashboard />;
}`;
}
