import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-props',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-props.component.html',
  styleUrl: './react-props.component.scss'
})
export class ReactPropsComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  propsBasics = `// Passing Props to Components
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component
<Welcome name="Sarah" />

// Multiple Props
function UserCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

<UserCard 
  name="John Doe" 
  age={30} 
  email="john@example.com" 
/>`;

  propsDestructuring = `// Destructuring Props in Function Parameters
function UserProfile({ name, age, email, avatar }) {
  return (
    <div className="profile">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>{email}</p>
    </div>
  );
}

// Nested Destructuring
function BlogPost({ post: { title, author, content } }) {
  return (
    <article>
      <h1>{title}</h1>
      <p>By {author}</p>
      <div>{content}</div>
    </article>
  );
}

// Rest Props
function Button({ label, ...restProps }) {
  return <button {...restProps}>{label}</button>;
}

<Button label="Click" className="btn" onClick={handleClick} />`;

  defaultProps = `// Default Props with ES6 Default Parameters
function Greeting({ name = 'Guest', message = 'Welcome' }) {
  return <h1>{message}, {name}!</h1>;
}

// Usage without props
<Greeting /> // Output: Welcome, Guest!
<Greeting name="John" /> // Output: Welcome, John!

// Complex Default Values
function ProductCard({ 
  name = 'Unknown Product',
  price = 0,
  inStock = true,
  discount = 0,
  currency = '$'
}) {
  const finalPrice = price - (price * discount / 100);
  
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>Price: {currency}{finalPrice}</p>
      <p>{inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
}`;

  propTypes = `import PropTypes from 'prop-types';

// Component with PropTypes
function UserProfile({ name, age, email, isActive }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

// PropTypes validation
UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

// Default props
UserProfile.defaultProps = {
  isActive: true
};

// Complex PropTypes
function DataTable({ data, columns, onRowClick }) {
  return <table>...table content...</table>;
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      width: PropTypes.number
    })
  ).isRequired,
  onRowClick: PropTypes.func
};`;

  childrenProp = `// Children Prop
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="User Information">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>

// Multiple Children
function Layout({ header, sidebar, children, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

// Manipulating Children
import React from 'react';

function List({ children }) {
  return (
    <ul>
      {React.Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}`;

  propsSpread = `// Spreading Props
function Button(props) {
  return <button className="btn" {...props} />;
}

// Usage - all props are passed to button
<Button onClick={handleClick} disabled={false} type="submit">
  Submit
</Button>

// Selective Props Passing
function Input({ label, error, ...inputProps }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

<Input 
  label="Email"
  error="Invalid email"
  type="email"
  value={email}
  onChange={handleChange}
  placeholder="Enter email"
/>

// Overriding Props
function CustomButton(props) {
  return (
    <button 
      {...props}
      className="custom-btn"
    />
  );
}`;

  functionProps = `// Passing Functions as Props (Callbacks)
function ParentComponent() {
  const handleClick = (message) => {
    alert(message);
  };

  return <ChildComponent onButtonClick={handleClick} />;
}

function ChildComponent({ onButtonClick }) {
  return (
    <button onClick={() => onButtonClick('Hello from child!')}>
      Click Me
    </button>
  );
}

// Search Form with Multiple Callbacks
function SearchForm({ onSearch, onClear, onFilter }) {
  return (
    <form>
      <input 
        type="text" 
        onChange={(e) => onFilter(e.target.value)}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={onClear}>Clear</button>
    </form>
  );
}`;

  propsBestPractices = `// Best Practices for Props

// 1. Keep props simple and focused
// Good
function UserCard({ name, email, avatar }) {
  return <div>...</div>;
}

// 2. Use descriptive prop names
// Good
<Button onClick={handleSubmit} isLoading={false} />
// Bad
<Button fn={handleSubmit} loading={false} />

// 3. Pass objects for related data
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

<UserProfile user={{ name: 'John', email: 'john@email.com', avatar: 'url' }} />

// 4. Don't mutate props
// Bad
function MyComponent(props) {
  props.value = 'new value'; // Never do this!
}

// Good
function MyComponent({ value, onChange }) {
  onChange('new value'); // Use callback to update
}

// 5. Validate props with PropTypes or TypeScript
function ProductCard({ name, price }: { name: string, price: number }) {
  return <div>{name}: $\{price}</div>;
}`;
}
