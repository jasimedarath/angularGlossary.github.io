import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-react-conditional',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-conditional.component.html',
  styleUrl: './react-conditional.component.scss'
})
export class ReactConditionalComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  ternaryOperator = `// Ternary Operator
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

// Inline with text
function UserGreeting({ user }) {
  return (
    <h1>
      {user ? \`Welcome back, $\{user.name}!\` : 'Please sign in'}
    </h1>
  );
}

// Complex ternary
function Status({ status }) {
  return (
    <div className={status === 'active' ? 'status-active' : 'status-inactive'}>
      {status === 'active' ? '✓ Active' : '✗ Inactive'}
    </div>
  );
}`;

  logicalAnd = `// Logical && Operator
function Notification({ hasNotifications, count }) {
  return (
    <div>
      {hasNotifications && <span className="badge">{count}</span>}
    </div>
  );
}

// Multiple conditions
function UserProfile({ user, isLoading }) {
  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && user && <ProfileCard user={user} />}
      {!isLoading && !user && <EmptyState />}
    </div>
  );
}

// With functions
function ShoppingCart({ items }) {
  return (
    <div>
      <h2>Cart</h2>
      {items.length > 0 && (
        <ul>
          {items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      )}
      {items.length === 0 && <p>Your cart is empty</p>}
    </div>
  );
}`;

  ifElseStatements = `// If-Else with Return
function Greeting({ time }) {
  if (time < 12) {
    return <h1>Good Morning!</h1>;
  } else if (time < 18) {
    return <h1>Good Afternoon!</h1>;
  } else {
    return <h1>Good Evening!</h1>;
  }
}

// Multiple returns
function UserStatus({ isLoading, error, user }) {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage error={error} />;
  }
  
  if (!user) {
    return <EmptyState message="No user found" />;
  }
  
  return <UserProfile user={user} />;
}

// Guard clauses
function Dashboard({ user }) {
  if (!user) return <LoginPrompt />;
  if (!user.isVerified) return <VerificationRequired />;
  if (user.isBanned) return <BannedMessage />;
  
  return <DashboardContent user={user} />;
}`;

  switchCase = `// Switch Statement
function StatusBadge({ status }) {
  let badge;
  
  switch (status) {
    case 'pending':
      badge = <span className="badge-yellow">Pending</span>;
      break;
    case 'approved':
      badge = <span className="badge-green">Approved</span>;
      break;
    case 'rejected':
      badge = <span className="badge-red">Rejected</span>;
      break;
    default:
      badge = <span className="badge-gray">Unknown</span>;
  }
  
  return <div>{badge}</div>;
}

// Object mapping (better than switch)
function StatusBadgeImproved({ status }) {
  const badges = {
    pending: <span className="badge-yellow">Pending</span>,
    approved: <span className="badge-green">Approved</span>,
    rejected: <span className="badge-red">Rejected</span>,
    default: <span className="badge-gray">Unknown</span>
  };
  
  return <div>{badges[status] || badges.default}</div>;
}`;

  nullishCoalescing = `// Nullish Coalescing and Optional Chaining
function UserInfo({ user }) {
  return (
    <div>
      <h2>{user?.name ?? 'Anonymous'}</h2>
      <p>Email: {user?.email ?? 'Not provided'}</p>
      <p>Age: {user?.age ?? 'N/A'}</p>
      <p>City: {user?.address?.city ?? 'Unknown'}</p>
    </div>
  );
}

// With arrays
function RecentPosts({ posts }) {
  const recentPosts = posts ?? [];
  
  return (
    <div>
      <h3>Recent Posts ({recentPosts.length})</h3>
      {recentPosts.length > 0 ? (
        <ul>
          {recentPosts.map(post => <li key={post.id}>{post.title}</li>)}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}`;

  conditionalClasses = `// Conditional Classes
function Button({ isPrimary, isDisabled, isLarge }) {
  // Using template literals
  const className = \`btn $\{isPrimary ? 'btn-primary' : 'btn-secondary'} $\{isLarge ? 'btn-large' : ''}\`;
  
  return (
    <button className={className} disabled={isDisabled}>
      Click Me
    </button>
  );
}

// Using classnames library
import classNames from 'classnames';

function Card({ isActive, isHighlighted, hasError }) {
  const classes = classNames('card', {
    'card-active': isActive,
    'card-highlighted': isHighlighted,
    'card-error': hasError
  });
  
  return <div className={classes}>Card Content</div>;
}

// Inline conditional styles
function AlertBox({ type }) {
  return (
    <div
      style={{
        backgroundColor: type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50',
        color: 'white',
        padding: '10px'
      }}
    >
      Alert Message
    </div>
  );
}`;

  renderProps = `// Render Props Pattern
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return render({ data, loading, error });
}

// Usage
function App() {
  return (
    <DataFetcher
      url="/api/users"
      render={({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <Error error={error} />;
        return <UserList users={data} />;
      }}
    />
  );
}`;

  bestPractices = `// Conditional Rendering Best Practices

// 1. Keep conditions simple
// Good
function UserCard({ user }) {
  if (!user) return null;
  return <div>{user.name}</div>;
}

// 2. Extract complex conditions
function Dashboard({ user }) {
  const canAccessDashboard = user && user.isVerified && !user.isBanned;
  
  if (!canAccessDashboard) return <AccessDenied />;
  return <DashboardContent />;
}

// 3. Use early returns
function Form({ isSubmitting, hasErrors }) {
  if (isSubmitting) return <Spinner />;
  if (hasErrors) return <ErrorSummary />;
  return <FormFields />;
}

// 4. Avoid nested ternaries
// Bad
{condition1 ? (condition2 ? <A /> : <B />) : (condition3 ? <C /> : <D />)}

// Good
function Component({ condition1, condition2, condition3 }) {
  if (condition1 && condition2) return <A />;
  if (condition1) return <B />;
  if (condition3) return <C />;
  return <D />;
}`;
}
