import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

@Component({
  selector: 'app-react-jsx',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-jsx.component.html',
  styleUrl: './react-jsx.component.scss'
})
export class ReactJsxComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  jsxBasics = `// JSX is a syntax extension for JavaScript
// It allows you to write HTML-like code in JavaScript

function Welcome() {
  return <h1>Hello, World!</h1>;
}

// JSX with expressions
function Greeting() {
  const name = 'React Developer';
  return <h1>Hello, {name}!</h1>;
}

// JSX with attributes
function Image() {
  const imageUrl = 'https://example.com/image.jpg';
  return <img src={imageUrl} alt="Description" />;
}

// JSX must return a single parent element
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}`;

  jsxFragments = `// Using React Fragments to avoid extra DOM nodes
import { Fragment } from 'react';

// Long syntax
function List() {
  return (
    <Fragment>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </Fragment>
  );
}

// Short syntax
function ListShort() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </>
  );
}

// Fragments with keys (for lists)
function Glossary({ items }) {
  return (
    <>
      {items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </>
  );
}`;

  jsxExpressions = `// JavaScript expressions in JSX
function Calculator() {
  const a = 10;
  const b = 20;
  
  return (
    <div>
      <p>Sum: {a + b}</p>
      <p>Product: {a * b}</p>
      <p>Uppercase: {'hello'.toUpperCase()}</p>
    </div>
  );
}

// Conditional rendering
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
}

// Logical && operator
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}`;

  jsxAttributes = `// JSX attributes use camelCase
function StyledComponent() {
  const divStyle = {
    backgroundColor: 'blue',
    fontSize: '16px',
    padding: '10px'
  };

  return (
    <div
      className="container"
      style={divStyle}
      onClick={() => console.log('Clicked!')}
      data-testid="my-div"
    >
      Styled Content
    </div>
  );
}

// Common attribute differences from HTML:
// - class → className
// - for → htmlFor
// - tabindex → tabIndex
// - onclick → onClick (camelCase events)

function Form() {
  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        className="input-field"
        tabIndex={1}
      />
    </form>
  );
}`;

  jsxChildren = `// JSX children can be nested
function Card() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Card Title</h2>
      </div>
      <div className="card-body">
        <p>Card content goes here</p>
      </div>
    </div>
  );
}

// Children as props
function Container({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

function App() {
  return (
    <Container>
      <h1>Title</h1>
      <p>Content</p>
    </Container>
  );
}

// Mapping over arrays
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`;

  jsxBestPractices = `// 1. Always use keys for list items
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// 2. Keep JSX readable with proper formatting
function Profile({ user }) {
  return (
    <div className="profile">
      <img 
        src={user.avatar} 
        alt={user.name}
        className="avatar"
      />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}

// 3. Extract complex JSX into separate components
function UserCard({ user }) {
  const renderAvatar = () => (
    <img src={user.avatar} alt={user.name} />
  );

  const renderInfo = () => (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );

  return (
    <div className="user-card">
      {renderAvatar()}
      {renderInfo()}
    </div>
  );
}

// 4. Use meaningful component names
function ProductPrice({ price, currency = 'USD' }) {
  return <span>{currency} {price.toFixed(2)}</span>;
}`;
}
