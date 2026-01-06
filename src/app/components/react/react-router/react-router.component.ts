import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-router',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-router.component.html',
  styleUrl: './react-router.component.scss'
})
export class ReactRouterComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  routerSetup = `// Install: npm install react-router-dom
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`;

  navigation = `// Navigation Methods
import { useNavigate, Link, NavLink } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* Link component */}
      <Link to="/about">About</Link>
      
      {/* NavLink with active styling */}
      <NavLink 
        to="/products" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Products
      </NavLink>
      
      {/* Programmatic navigation */}
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}`;

  dynamicRoutes = `// Dynamic Routes and Parameters
import { useParams, useSearchParams } from 'react-router-dom';

// Define routes
<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/products/:id" element={<ProductDetail />} />
</Routes>

// Access params
function UserProfile() {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
}

// Query parameters
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;
  
  return (
    <div>
      <input 
        value={query} 
        onChange={e => setSearchParams({ q: e.target.value })} 
      />
      <p>Searching for: {query}, Page: {page}</p>
    </div>
  );
}`;

  nestedRoutes = `// Nested Routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

// Layout with Outlet
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Nested routes render here */}
      <Footer />
    </div>
  );
}`;

  protectedRoutes = `// Protected Routes
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
<Routes>
  <Route path="/login" element={<Login />} />
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />
</Routes>`;

  lazyLoading = `// Code Splitting with Lazy Loading
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`;

  hooks = `// Router Hooks
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function MyComponent() {
  // Get current location
  const location = useLocation();
  console.log(location.pathname); // /products/123
  console.log(location.search); // ?sort=price
  console.log(location.state); // Data passed via navigate
  
  // Navigate programmatically
  const navigate = useNavigate();
  navigate('/home');
  navigate('/home', { replace: true });
  navigate('/profile', { state: { from: 'homepage' } });
  
  // Access route parameters
  const { productId } = useParams();
  
  return <div>Product: {productId}</div>;
}`;

  bestPractices = `// Router Best Practices

// 1. Use lazy loading for code splitting
const Dashboard = lazy(() => import('./Dashboard'));

// 2. Create route configuration
const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/users/:id', element: <UserProfile /> }
];

// 3. Protect routes with wrapper components
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>

// 4. Use NavLink for active styling
<NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''} />

// 5. Handle 404s
<Route path="*" element={<NotFound />} />

// 6. Use relative paths in nested routes
<Route path="users">
  <Route path=":id" element={<User />} />
</Route>`;
}
