import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-react-styling',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-styling.component.html',
  styleUrl: './react-styling.component.scss'
})
export class ReactStylingComponent {
  cssModules = `// CSS Modules - Scoped CSS
/* Button.module.css */
.button {
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
}

.primary {
  background: #007bff;
  color: white;
}

.secondary {
  background: #6c757d;
  color: white;
}

// Button.jsx
import styles from './Button.module.css';

function Button({ variant = 'primary', children }) {
  return (
    <button className={\`$\{styles.button} $\{styles[variant]}\`}>
      {children}
    </button>
  );
}

export default Button;

// Usage
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Cancel</Button>

// Generated class names: Button_button__abc123 Button_primary__def456`;

  styledComponents = `// Styled Components - CSS-in-JS
import styled from 'styled-components';

// Basic styled component
const Button = styled.button\`
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  
  background: $\{props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
\`;

// Usage
<Button primary>Primary</Button>
<Button>Secondary</Button>

// Extending styles
const PrimaryButton = styled(Button)\`
  background: #007bff;
  font-weight: bold;
\`;

// With attrs
const Input = styled.input.attrs(props => ({
  type: props.type || 'text',
  size: props.size || '1em'
}))\`
  font-size: $\{props => props.size};
  padding: 0.5em;
  border: 2px solid #ccc;
  border-radius: 4px;
\`;

// Theming
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d'
  }
};

const ThemedButton = styled.button\`
  background: $\{props => props.theme.colors.primary};
  color: white;
\`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemedButton>Themed Button</ThemedButton>
    </ThemeProvider>
  );
}`;

  emotion = `// Emotion - Performant CSS-in-JS
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// CSS prop
const buttonStyles = css\`
  padding: 10px 20px;
  border-radius: 4px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
\`;

function Button() {
  return <button css={buttonStyles}>Click Me</button>;
}

// Dynamic styles
function DynamicButton({ primary }) {
  return (
    <button
      css={css\`
        background: $\{primary ? '#007bff' : '#6c757d'};
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
      \`}
    >
      Button
    </button>
  );
}

// Styled components API
const StyledButton = styled.button\`
  padding: 10px 20px;
  background: $\{props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border-radius: 4px;
\`;

// Object styles
const objectStyles = {
  color: 'white',
  background: '#007bff',
  padding: '10px 20px',
  borderRadius: '4px'
};

<button css={objectStyles}>Object Styles</button>

// Composition
const base = css\`
  padding: 10px 20px;
  border-radius: 4px;
\`;

const primary = css\`
  $\{base};
  background: #007bff;
  color: white;
\`;`;

  tailwindCSS = `// Tailwind CSS - Utility-First CSS
// Installation: npm install -D tailwindcss postcss autoprefixer
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d'
      }
    }
  },
  plugins: []
};

// Basic usage
function Button({ children, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 rounded font-semibold transition-all';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
  };

  return (
    <button className={\`$\{baseClasses} $\{variantClasses[variant]}\`}>
      {children}
    </button>
  );
}

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>

// State variants
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
  Button
</button>

// Dark mode
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>

// Custom classes with @apply
/* styles.css */
.btn {
  @apply px-4 py-2 rounded font-semibold transition-all;
}

.btn-primary {
  @apply btn bg-blue-500 hover:bg-blue-600 text-white;
}`;

  sassScss = `// Sass/SCSS - CSS Preprocessor
// Variables
$primary-color: #007bff;
$secondary-color: #6c757d;
$border-radius: 4px;

// Mixins
@mixin button-styles {
  padding: 10px 20px;
  border-radius: $border-radius;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

@mixin button-variant($bg-color, $text-color) {
  background: $bg-color;
  color: $text-color;
  
  &:hover {
    background: darken($bg-color, 10%);
  }
}

// Nesting
.button {
  @include button-styles;
  
  &.primary {
    @include button-variant($primary-color, white);
  }
  
  &.secondary {
    @include button-variant($secondary-color, white);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .icon {
    margin-right: 8px;
  }
}

// Functions
@function calculate-rem($size) {
  @return $size / 16px * 1rem;
}

.heading {
  font-size: calculate-rem(24px);
}

// Extend
.message {
  padding: 10px;
  border-radius: $border-radius;
}

.success {
  @extend .message;
  background: #28a745;
  color: white;
}

.error {
  @extend .message;
  background: #dc3545;
  color: white;
}

// Usage in React
import './Button.scss';

function Button({ variant, children }) {
  return (
    <button className={\`button $\{variant}\`}>
      {children}
    </button>
  );
}`;

  inlineStyles = `// Inline Styles - JavaScript Objects
function Button({ primary, disabled, children }) {
  // Static styles
  const buttonStyles = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px'
  };

  // Dynamic styles
  const variantStyles = primary
    ? { background: '#007bff', color: 'white' }
    : { background: '#6c757d', color: 'white' };

  // Combine styles
  const combinedStyles = {
    ...buttonStyles,
    ...variantStyles,
    ...(disabled && { opacity: 0.5 })
  };

  return <button style={combinedStyles}>{children}</button>;
}

// Conditional styles
function Card({ isActive, isHovered }) {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        background: isActive ? '#e3f2fd' : 'white',
        boxShadow: isHovered 
          ? '0 4px 12px rgba(0,0,0,0.15)' 
          : '0 2px 4px rgba(0,0,0,0.1)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
    >
      Card Content
    </div>
  );
}

// CSS variables
const theme = {
  '--primary-color': '#007bff',
  '--secondary-color': '#6c757d',
  '--border-radius': '4px'
};

function App() {
  return (
    <div style={theme}>
      <button style={{ 
        background: 'var(--primary-color)',
        borderRadius: 'var(--border-radius)'
      }}>
        Button
      </button>
    </div>
  );
}`;

  classnames = `// Classnames Library - Conditional Classes
import classNames from 'classnames';
import cn from 'classnames'; // or use 'clsx' for smaller bundle

// Basic usage
function Button({ primary, large, disabled, children }) {
  const buttonClass = classNames(
    'btn',
    {
      'btn-primary': primary,
      'btn-large': large,
      'btn-disabled': disabled
    }
  );

  return <button className={buttonClass}>{children}</button>;
}

// Multiple classes
const classes = classNames('foo', 'bar'); // 'foo bar'
const classes = classNames('foo', { bar: true }); // 'foo bar'
const classes = classNames({ 'foo-bar': true }); // 'foo-bar'
const classes = classNames({ 'foo-bar': false }); // ''
const classes = classNames({ foo: true }, { bar: true }); // 'foo bar'

// Arrays
const classes = classNames(['foo', 'bar']); // 'foo bar'

// Complex example
function Card({ variant, size, active, disabled, className }) {
  return (
    <div
      className={cn(
        'card',
        \`card--$\{variant}\`,
        \`card--$\{size}\`,
        {
          'card--active': active,
          'card--disabled': disabled
        },
        className // Allow external classes
      )}
    >
      Card Content
    </div>
  );
}

// With Tailwind
function Button({ variant, size, className }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-semibold',
        {
          'bg-blue-500 text-white': variant === 'primary',
          'bg-gray-500 text-white': variant === 'secondary',
          'text-sm': size === 'small',
          'text-lg': size === 'large'
        },
        className
      )}
    >
      Button
    </button>
  );
}`;

  comparison = `// Styling Solutions Comparison

// ✅ CSS Modules
// Pros: Scoped styles, no runtime, familiar CSS, works with preprocessors
// Cons: Separate files, no dynamic theming, verbose for utilities
// Best for: Traditional CSS workflow, existing CSS codebase

// ✅ Styled Components
// Pros: True CSS-in-JS, dynamic theming, automatic vendor prefixing
// Cons: Runtime overhead, larger bundle, requires setup
// Best for: Component libraries, dynamic theming, full CSS-in-JS

// ✅ Emotion
// Pros: Performant, flexible API, smaller than Styled Components
// Cons: Learning curve, runtime overhead
// Best for: Performance-critical apps, flexible styling needs

// ✅ Tailwind CSS
// Pros: Fast development, consistent design, small production bundle
// Cons: HTML can get cluttered, learning curve, requires PostCSS
// Best for: Rapid prototyping, utility-first approach, consistent design

// ✅ Sass/SCSS
// Pros: Powerful features, mature ecosystem, compiles to CSS
// Cons: Build step required, no dynamic theming
// Best for: Complex stylesheets, existing Sass projects

// ✅ Inline Styles
// Pros: Dynamic, scoped, no build step
// Cons: No pseudo-classes, no media queries, verbose
// Best for: Highly dynamic styles, email templates

// Bundle Size Comparison (approximate):
// CSS Modules: ~0KB (compile-time)
// Tailwind CSS: ~3KB (after purge)
// Emotion: ~5KB
// Styled Components: ~12KB
// Sass: ~0KB (compile-time)
// Inline Styles: ~0KB (native)

// Performance:
// CSS Modules ≈ Sass > Tailwind > Emotion > Styled Components > Inline Styles`;
}
