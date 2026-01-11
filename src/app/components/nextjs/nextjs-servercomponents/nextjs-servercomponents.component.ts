import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

@Component({
  selector: 'app-nextjs-servercomponents',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-servercomponents.component.html',
  styleUrl: './nextjs-servercomponents.component.scss'
})
export class NextjsServercomponentsComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  serverComponentBasics = `// Server Components (default in App Router)
// No 'use client' directive needed

// app/posts/page.tsx
async function getPosts() &#123;
  const res = await fetch('https://api.example.com/posts');
  return res.json();
&#125;

export default async function PostsPage() &#123;
  const posts = await getPosts();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      &#123;posts.map((post: any) => (
        <article key=&#123;post.id&#125;>
          <h2>&#123;post.title&#125;</h2>
          <p>&#123;post.excerpt&#125;</p>
        </article>
      ))&#125;
    </div>
  );
&#125;

// Benefits:
// - Direct database/API access
// - Zero JavaScript to client
// - Automatic code splitting
// - Better security (API keys stay on server)
// - SEO-friendly`;

  clientComponentBasics = `// Client Components - interactive UI
// Mark with 'use client' at the top

'use client';

import &#123; useState &#125; from 'react';

export default function Counter() &#123;
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: &#123;count&#125;</p>
      <button onClick=&#123;() => setCount(count + 1)&#125;>
        Increment
      </button>
    </div>
  );
&#125;

// Use Client Components when you need:
// - useState, useEffect, other hooks
// - Event listeners (onClick, onChange, etc.)
// - Browser APIs (localStorage, window, etc.)
// - Custom hooks
// - Class components
// - Context API`;

  composition = `// Server and Client Component Composition

// app/page.tsx - Server Component (default)
import ClientCounter from './ClientCounter';
import ServerData from './ServerData';

async function getData() &#123;
  const res = await fetch('https://api.example.com/data');
  return res.json();
&#125;

export default async function Page() &#123;
  const data = await getData();
  
  return (
    <div>
      &#123;/* Server Component */&#125;
      <ServerData data=&#123;data&#125; />
      
      &#123;/* Client Component */&#125;
      <ClientCounter initialCount=&#123;data.count&#125; />
    </div>
  );
&#125;

// ServerData.tsx - Server Component
export default function ServerData(&#123; data &#125;: &#123; data: any &#125;) &#123;
  return <div>Server rendered: &#123;data.title&#125;</div>;
&#125;

// ClientCounter.tsx - Client Component
'use client';

import &#123; useState &#125; from 'react';

export default function ClientCounter(&#123; initialCount &#125;: &#123; initialCount: number &#125;) &#123;
  const [count, setCount] = useState(initialCount);
  return <button onClick=&#123;() => setCount(c => c + 1)&#125;>&#123;count&#125;</button>;
&#125;`;

  patterns = `// Composition Patterns

// ✅ GOOD: Pass Server Component as children to Client Component
// layout.tsx (Server Component)
import Sidebar from './Sidebar'; // Client Component
import Feed from './Feed'; // Server Component

export default function Layout() &#123;
  return (
    <Sidebar>
      <Feed />
    </Sidebar>
  );
&#125;

// Sidebar.tsx (Client Component)
'use client';

export default function Sidebar(&#123; children &#125;: &#123; children: React.ReactNode &#125;) &#123;
  return (
    <aside>
      <nav>Navigation</nav>
      &#123;children&#125;
    </aside>
  );
&#125;

// ❌ BAD: Can't import Server Component into Client Component
'use client';

import ServerComponent from './ServerComponent'; // ❌ Won't work as Server Component

export default function ClientComponent() &#123;
  return <ServerComponent />; // Will be converted to Client Component
&#125;`;

  dataFlow = `// Data flow between Server and Client Components

// Server Component
async function getUser() &#123;
  const res = await fetch('https://api.example.com/user');
  return res.json();
&#125;

export default async function UserProfile() &#123;
  const user = await getUser();
  
  // Pass data as props to Client Component
  return (
    <div>
      <UserHeader user=&#123;user&#125; />
      <UserActions userId=&#123;user.id&#125; />
    </div>
  );
&#125;

// Client Component - receives data as props
'use client';

import &#123; useState &#125; from 'react';

export default function UserActions(&#123; userId &#125;: &#123; userId: string &#125;) &#123;
  const [following, setFollowing] = useState(false);
  
  const handleFollow = async () => &#123;
    await fetch(\`/api/follow/$&#123;userId&#125;\`, &#123; method: 'POST' &#125;);
    setFollowing(true);
  &#125;;
  
  return (
    <button onClick=&#123;handleFollow&#125;>
      &#123;following ? 'Following' : 'Follow'&#125;
    </button>
  );
&#125;

// Server Components can't pass:
// - Functions as props
// - Class instances
// - Symbols`;

  whenToUse = `// When to use Server vs Client Components

// ✅ Use Server Components for:
// - Data fetching
// - Direct database access
// - Accessing backend resources
// - Keeping sensitive information on server
// - Large dependencies (keep on server)
// - Static content

async function ServerExample() &#123;
  const data = await db.query('SELECT * FROM posts');
  return <div>&#123;data.map(post => <Post key=&#123;post.id&#125; &#123;...post&#125; />)&#125;</div>;
&#125;

// ✅ Use Client Components for:
// - Interactivity (event listeners)
// - State management (useState, useReducer)
// - Effects (useEffect)
// - Browser-only APIs
// - Custom hooks
// - Context providers

'use client';

import &#123; useState, useEffect &#125; from 'react';

function ClientExample() &#123;
  const [theme, setTheme] = useState('light');
  
  useEffect(() => &#123;
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  &#125;, []);
  
  return <button onClick=&#123;() => setTheme('dark')&#125;>Toggle Theme</button>;
&#125;

// Default to Server Components, add 'use client' only when needed`;

  contextProviders = `// Context providers must be Client Components

// app/providers.tsx
'use client';

import &#123; createContext, useContext, useState &#125; from 'react';

const ThemeContext = createContext<any>(null);

export function ThemeProvider(&#123; children &#125;: &#123; children: React.ReactNode &#125;) &#123;
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value=&#123;&#123; theme, setTheme &#125;&#125;>
      &#123;children&#125;
    </ThemeContext.Provider>
  );
&#125;

export function useTheme() &#123;
  return useContext(ThemeContext);
&#125;

// app/layout.tsx (Server Component)
import &#123; ThemeProvider &#125; from './providers';

export default function RootLayout(&#123; children &#125;: &#123; children: React.ReactNode &#125;) &#123;
  return (
    <html>
      <body>
        <ThemeProvider>
          &#123;children&#125;
        </ThemeProvider>
      </body>
    </html>
  );
&#125;

// Any component can now use the context
'use client';

import &#123; useTheme &#125; from './providers';

export default function ThemeToggle() &#123;
  const &#123; theme, setTheme &#125; = useTheme();
  return <button onClick=&#123;() => setTheme(theme === 'light' ? 'dark' : 'light')&#125;>&#123;theme&#125;</button>;
&#125;`;

  thirdPartyLibraries = `// Using third-party libraries with 'use client'

// Many libraries need 'use client' wrapper

// components/Carousel.tsx
'use client';

import ReactCarousel from 'react-awesome-slider';

export default function Carousel(&#123; images &#125;: &#123; images: string[] &#125;) &#123;
  return (
    <ReactCarousel>
      &#123;images.map((img, i) => (
        <div key=&#123;i&#125;>
          <img src=&#123;img&#125; alt=\`Slide $&#123;i&#125;\` />
        </div>
      ))&#125;
    </ReactCarousel>
  );
&#125;

// app/page.tsx (Server Component)
import Carousel from '@/components/Carousel';

export default function Page() &#123;
  return (
    <div>
      <h1>Gallery</h1>
      <Carousel images=&#123;['/1.jpg', '/2.jpg']&#125; />
    </div>
  );
&#125;

// Wrap libraries that use browser APIs or hooks
// Keep the rest of your app as Server Components`;
}
