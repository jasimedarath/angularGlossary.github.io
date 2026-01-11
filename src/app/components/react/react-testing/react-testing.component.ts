import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

@Component({
  selector: 'app-react-testing',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-testing.component.html',
  styleUrl: './react-testing.component.scss'
})
export class ReactTestingComponent implements AfterViewChecked {
  
  jestBasics = `// Jest - JavaScript Testing Framework
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}

// Basic test structure
describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it('multiplies two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});

// Matchers
expect(value).toBe(5);              // Exact equality
expect(value).toEqual({a: 1});    // Deep equality
expect(value).toBeTruthy();         // Truthy value
expect(value).toBeNull();           // Null
expect(array).toContain('item');    // Array contains
expect(fn).toThrow();               // Function throws`;

  reactTestingLibrary = `// React Testing Library - Test components like users do
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

// Basic component test
test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  
  const button = screen.getByText('Click Me');
  expect(button).toBeInTheDocument();
});

// Testing user interactions
test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// User Event (more realistic)
test('user can type in input', async () => {
  render(<SearchInput />);
  
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'Hello World');
  
  expect(input).toHaveValue('Hello World');
});`;

  queryMethods = `// Query Methods in React Testing Library

// getBy - Throws error if not found
const button = screen.getByRole('button');
const heading = screen.getByText('Hello');
const input = screen.getByLabelText('Email');
const element = screen.getByTestId('custom-element');

// queryBy - Returns null if not found
const button = screen.queryByText('Optional Button');
if (button) {
  // Button exists
}

// findBy - Async, waits for element
const button = await screen.findByText('Async Button');

// Multiple elements
const buttons = screen.getAllByRole('button');
const items = screen.queryAllByRole('listitem');

// Priority order (recommended):
// 1. getByRole (most accessible)
// 2. getByLabelText (forms)
// 3. getByPlaceholderText (forms)
// 4. getByText (non-interactive elements)
// 5. getByDisplayValue (forms)
// 6. getByAltText (images)
// 7. getByTitle
// 8. getByTestId (last resort)

// Example with various queries
test('form validation', () => {
  render(<LoginForm />);
  
  const emailInput = screen.getByLabelText('Email');
  const submitButton = screen.getByRole('button', { name: /submit/i });
  const errorMessage = screen.queryByText('Invalid email');
  
  expect(errorMessage).not.toBeInTheDocument();
});`;

  asyncTesting = `// Testing Async Code and API Calls

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock API calls
global.fetch = jest.fn();

test('loads and displays user data', async () => {
  const mockUser = { name: 'John Doe', email: 'john@example.com' };
  
  fetch.mockResolvedValueOnce({
    json: async () => mockUser
  });

  render(<UserProfile userId="123" />);
  
  // Wait for loading to finish
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for user data to appear
  const userName = await screen.findByText('John Doe');
  expect(userName).toBeInTheDocument();
  
  expect(fetch).toHaveBeenCalledWith('/api/users/123');
});

// Testing error states
test('displays error on failed fetch', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
  
  render(<UserProfile userId="123" />);
  
  const errorMessage = await screen.findByText(/error/i);
  expect(errorMessage).toBeInTheDocument();
});

// waitFor for complex async scenarios
test('updates on multiple changes', async () => {
  render(<Counter />);
  
  const button = screen.getByRole('button');
  
  await userEvent.click(button);
  await userEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });
});`;

  hooksTest = `// Testing Custom Hooks

import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

// Testing hooks with props
test('useCounter with initial value', () => {
  const { result } = renderHook(() => useCounter(10));
  
  expect(result.current.count).toBe(10);
});

// Testing hooks with changing props
test('useCounter resets on prop change', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    { initialProps: { initialValue: 0 } }
  );
  
  expect(result.current.count).toBe(0);
  
  rerender({ initialValue: 5 });
  expect(result.current.count).toBe(5);
});`;

  mockingContext = `// Testing with Context and Mocking

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import ThemedButton from './ThemedButton';

// Provide context in tests
test('renders with theme', () => {
  render(
    <ThemeProvider value={{ theme: 'dark' }}>
      <ThemedButton />
    </ThemeProvider>
  );
  
  const button = screen.getByRole('button');
  expect(button).toHaveClass('dark-theme');
});

// Mock modules
jest.mock('./api', () => ({
  fetchUser: jest.fn()
}));

import { fetchUser } from './api';

test('fetches user on mount', () => {
  fetchUser.mockResolvedValue({ name: 'John' });
  
  render(<UserProfile />);
  
  expect(fetchUser).toHaveBeenCalled();
});

// Mock timers
jest.useFakeTimers();

test('debounced search', () => {
  render(<SearchInput />);
  
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test' } });
  
  // Fast-forward time
  jest.advanceTimersByTime(500);
  
  expect(mockSearch).toHaveBeenCalledWith('test');
});

jest.useRealTimers();`;

  bestPractices = `// Testing Best Practices

// ✓ Test behavior, not implementation
test('user can submit form', () => {
  render(<LoginForm />);
  
  userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  userEvent.type(screen.getByLabelText('Password'), 'password123');
  userEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(mockLogin).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});

// ✓ Use accessible queries
screen.getByRole('button', { name: 'Submit' }); // Good
screen.getByTestId('submit-button');           // Last resort

// ✓ Test error states and edge cases
test('shows error on invalid input', () => {
  render(<Form />);
  
  userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(screen.getByText('Email is required')).toBeInTheDocument();
});

// ✓ Keep tests isolated
beforeEach(() => {
  // Reset mocks
  jest.clearAllMocks();
});

// ✓ Use custom render with providers
const renderWithProviders = (ui, options) => {
  return render(
    <ThemeProvider>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </ThemeProvider>,
    options
  );
};

// ✗ Don't test implementation details
test('bad test', () => {
  const { result } = render(<Counter />);
  expect(result.state.count).toBe(0); // Bad!
});`;

  ngAfterViewChecked(): void {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}
