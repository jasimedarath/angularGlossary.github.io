import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-react-datafetching',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-datafetching.component.html',
  styleUrl: './react-datafetching.component.scss'
})
export class ReactDatafetchingComponent {
  fetchAPI = `// Native Fetch API
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// POST request
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  
  return response.json();
}`;

  axios = `// Axios - HTTP Client
import axios from 'axios';
import { useState, useEffect } from 'react';

// Configure Axios instance
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptors
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer $\{token}\`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

// Component
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// CRUD operations
const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(\`/users/$\{id}\`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(\`/users/$\{id}\`, data),
  delete: (id) => api.delete(\`/users/$\{id}\`)
};`;

  reactQuery = `// React Query - Data Fetching Library
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Setup
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

// Fetch data
function UserList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/users');
      if (!response.ok) throw new Error('Network error');
      return response.json();
    },
    staleTime: 5000, // Data fresh for 5 seconds
    cacheTime: 10000 // Cache for 10 seconds
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Mutations
function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => {
      return fetch('https://api.example.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      }).then(res => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name: 'New User', email: 'user@example.com' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {mutation.isLoading ? 'Creating...' : null}
      {mutation.isError ? <div>Error: {mutation.error.message}</div> : null}
      {mutation.isSuccess ? <div>User created!</div> : null}
      <button type="submit">Create User</button>
    </form>
  );
}

// Parallel queries
function Dashboard() {
  const users = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const posts = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

  if (users.isLoading || posts.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users: {users.data.length}</h2>
      <h2>Posts: {posts.data.length}</h2>
    </div>
  );
}`;

  swr = `// SWR - React Hooks for Data Fetching
import useSWR, { mutate } from 'swr';
import { SWRConfig } from 'swr';

// Fetcher function
const fetcher = (url) => fetch(url).then(res => res.json());

// Global configuration
function App() {
  return (
    <SWRConfig 
      value={{
        fetcher,
        refreshInterval: 3000,
        revalidateOnFocus: true
      }}
    >
      <UserList />
    </SWRConfig>
  );
}

// Basic usage
function UserList() {
  const { data, error, isLoading, mutate } = useSWR(
    'https://api.example.com/users',
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => mutate()}>Refresh</button>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Conditional fetching
function User({ id }) {
  const { data, error } = useSWR(
    id ? \`/api/users/$\{id}\` : null,
    fetcher
  );

  if (!id) return <div>Select a user</div>;
  if (error) return <div>Error loading user</div>;
  if (!data) return <div>Loading...</div>;

  return <div>{data.name}</div>;
}

// Mutations
function CreateUser() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Optimistic update
    mutate(
      '/api/users',
      async (currentData) => {
        const newUser = { id: Date.now(), name };
        return [...currentData, newUser];
      },
      false // Don't revalidate immediately
    );

    // API call
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    // Revalidate
    mutate('/api/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}

// Pagination
function UserListPaginated() {
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(\`/api/users?page=$\{page}\`, fetcher);

  return (
    <div>
      {data?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}`;

  customHook = `// Custom Data Fetching Hook
import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: $\{response.status}\`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  const refetch = () => {
    setLoading(true);
    // Trigger re-fetch
  };

  return { data, loading, error, refetch };
}

// Usage
function UserList() {
  const { data, loading, error, refetch } = useFetch('https://api.example.com/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Advanced hook with caching
function useAPI(endpoint, options = {}) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const cache = JSON.parse(localStorage.getItem(endpoint) || 'null');
    if (cache) {
      setState({ data: cache, loading: false, error: null });
    }

    fetch(\`https://api.example.com$\{endpoint}\`, options)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem(endpoint, JSON.stringify(data));
        setState({ data, loading: false, error: null });
      })
      .catch(error => {
        setState({ data: null, loading: false, error: error.message });
      });
  }, [endpoint]);

  return state;
}`;

  errorHandling = `// Error Handling Patterns
import { useState } from 'react';

// Error Boundary for fetch errors
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

// Retry logic
function useRetryFetch(url, maxRetries = 3) {
  const [retries, setRetries] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWithRetry = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed');
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      if (retries < maxRetries) {
        setTimeout(() => {
          setRetries(retries + 1);
          fetchWithRetry();
        }, 1000 * Math.pow(2, retries)); // Exponential backoff
      } else {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchWithRetry();
  }, [url]);

  return { data, error, retries };
}

// Global error handler
const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized - Please login';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 500:
        return 'Server Error';
      default:
        return 'An error occurred';
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network Error - Please check your connection';
  } else {
    // Something else happened
    return error.message;
  }
};`;

  comparison = `// Data Fetching Solutions Comparison

// ✅ Fetch API (Native)
// Pros: Built-in, no dependencies, modern browsers
// Cons: Verbose, no retry/caching, manual error handling
// Best for: Simple requests, no external deps needed

// ✅ Axios
// Pros: Interceptors, automatic JSON parsing, better errors
// Cons: Extra dependency (~5KB), not native
// Best for: Complex APIs, interceptors needed, better DX

// ✅ React Query / TanStack Query
// Pros: Caching, auto-refetch, optimistic updates, dev tools
// Cons: Learning curve, extra bundle (~12KB)
// Best for: Complex data requirements, mutations, caching

// ✅ SWR
// Pros: Lightweight, simple API, revalidation, optimistic UI
// Cons: Less features than React Query
// Best for: Simple caching needs, real-time data

// ✅ Custom Hook
// Pros: Full control, no dependencies, tailored to needs
// Cons: More code to maintain, fewer features
// Best for: Simple cases, learning, specific requirements

// Bundle Size:
// Fetch: 0KB (built-in)
// Axios: ~5KB
// SWR: ~4KB
// React Query: ~12KB
// Custom Hook: ~1KB

// Performance:
// SWR ≈ React Query > Axios > Fetch > Custom Hook

// Features Comparison:
//                    Fetch  Axios  RQ   SWR  Custom
// Caching            ❌     ❌     ✅   ✅   ❌
// Auto-refetch       ❌     ❌     ✅   ✅   ❌
// Interceptors       ❌     ✅     ❌   ❌   ❌
// Retry logic        ❌     ❌     ✅   ✅   ⚠️
// Optimistic updates ❌     ❌     ✅   ✅   ❌
// Dev tools          ❌     ❌     ✅   ❌   ❌
// TypeScript         ⚠️     ✅     ✅   ✅   ✅`;
}
