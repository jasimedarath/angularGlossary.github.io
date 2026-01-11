import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

@Component({
  selector: 'app-react-react18',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-react18.component.html',
  styleUrl: './react-react18.component.scss'
})
export class ReactReact18Component implements AfterViewChecked {
  
  concurrentRendering = `// Concurrent Rendering in React 18
// Allows React to work on multiple tasks simultaneously

import { createRoot } from 'react-dom/client';

// React 18 root API
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Legacy API (React 17)
// ReactDOM.render(<App />, document.getElementById('root'));

// Benefits of Concurrent Rendering:
// - Interruptible rendering
// - Prioritize urgent updates
// - Better user experience
// - Automatic batching of updates

// Example: Urgent vs Non-urgent updates
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    // Urgent: Update input immediately
    setQuery(e.target.value);
    
    // Non-urgent: Search can be deferred
    startTransition(() => {
      const newResults = searchData(e.target.value);
      setResults(newResults);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ResultsList results={results} />
    </div>
  );
}`;

  transitions = `// useTransition - Mark updates as non-urgent
import { useState, useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('home');

  const selectTab = (nextTab) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <button onClick={() => selectTab('home')}>Home</button>
      <button onClick={() => selectTab('posts')}>
        Posts {isPending && '(Loading...)\'}
      </button>
      <button onClick={() => selectTab('profile')}>Profile</button>
      
      {isPending && <Spinner />}
      <TabContent tab={tab} />
    </div>
  );
}

// useDeferredValue - Defer re-rendering of non-critical parts
function SearchPage({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  // deferredQuery updates after urgent updates complete
  return (
    <div>
      <input value={query} />
      <Suspense fallback={<Spinner />}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </div>
  );
}`;

  suspense = `// Suspense - Show fallback while loading
import { Suspense, lazy } from 'react';

// Code splitting with Suspense
const ProfilePage = lazy(() => import('./ProfilePage'));
const PostsPage = lazy(() => import('./PostsPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage />
      <Suspense fallback={<PostsLoading />}>
        <PostsPage />
      </Suspense>
    </Suspense>
  );
}

// Data fetching with Suspense (experimental)
const resource = fetchProfileData();

function ProfileDetails() {
  // Suspends while data is loading
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfilePage() {
  return (
    <Suspense fallback={<h2>Loading profile...</h2>}>
      <ProfileDetails />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <ProfilePosts />
      </Suspense>
    </Suspense>
  );
}`;

  automaticBatching = `// Automatic Batching in React 18
// Multiple state updates are automatically batched

// React 17: Only batched in event handlers
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Only 1 render
}

// React 17: Not batched in promises/timeouts
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 2 renders in React 17!
}, 1000);

// React 18: All updates are batched
function handleClick() {
  fetch('/api/data').then(() => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Only 1 render in React 18!
  });
}

// Opt-out of batching if needed
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // React renders immediately
  
  flushSync(() => {
    setFlag(f => !f);
  });
  // React renders again
}`;

  serverComponents = `// React Server Components (RSC)
// Components that run only on the server

// Server Component (runs on server)
// server.js or .server.jsx
async function NoteList() {
  // Direct database access on server
  const notes = await db.query('SELECT * FROM notes');
  
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <Note note={note} />
        </li>
      ))}
    </ul>
  );
}

// Client Component (runs on client)
// client.js or .client.jsx
'use client';

function EditButton({ noteId }) {
  const [editing, setEditing] = useState(false);
  
  return (
    <button onClick={() => setEditing(true)}>
      Edit
    </button>
  );
}

// Benefits:
// - Zero bundle size for server components
// - Direct backend access
// - Better performance
// - Automatic code splitting`;

  newHooks = `// New Hooks in React 18

// useId - Generate unique IDs
function NameFields() {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <input id={id + '-firstName'} />
      
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <input id={id + '-lastName'} />
    </div>
  );
}

// useSyncExternalStore - Subscribe to external stores
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  return useSyncExternalStore(
    // Subscribe
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // Get snapshot
    () => navigator.onLine,
    // Server snapshot
    () => true
  );
}

// useInsertionEffect - CSS-in-JS libraries
function useCSS(rule) {
  useInsertionEffect(() => {
    document.head.appendChild(createStyleElement(rule));
  });
}`;

  ngAfterViewChecked(): void {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}
