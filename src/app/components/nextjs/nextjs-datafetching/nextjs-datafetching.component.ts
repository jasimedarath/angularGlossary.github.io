import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-nextjs-datafetching',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-datafetching.component.html',
  styleUrl: './nextjs-datafetching.component.scss'
})
export class NextjsDatafetchingComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  fetchBasics = `// Server Component data fetching with fetch API
// app/posts/page.tsx

async function getPosts() &#123;
  const res = await fetch('https://api.example.com/posts', &#123;
    cache: 'force-cache', // Default - cached until revalidated
  &#125;);
  
  if (!res.ok) &#123;
    throw new Error('Failed to fetch posts');
  &#125;
  
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

// Server Components are async by default
// Data fetching happens on the server`;

  cacheOptions = `// Cache and revalidation options

// 1. Force cache (default) - SSG
const res = await fetch('https://api.example.com/data', &#123;
  cache: 'force-cache'
&#125;);

// 2. No store - SSR (always fresh)
const res = await fetch('https://api.example.com/data', &#123;
  cache: 'no-store'
&#125;);

// 3. Revalidate - ISR (time-based)
const res = await fetch('https://api.example.com/data', &#123;
  next: &#123; revalidate: 3600 &#125; // Revalidate every hour
&#125;);

// 4. Tag-based revalidation
const res = await fetch('https://api.example.com/data', &#123;
  next: &#123; tags: ['posts'] &#125;
&#125;);

// Revalidate by tag
import &#123; revalidateTag &#125; from 'next/cache';
revalidateTag('posts');

// 5. Path-based revalidation
import &#123; revalidatePath &#125; from 'next/cache';
revalidatePath('/posts');

// Route segment config
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'; // Always SSR`;

  parallelFetching = `// Parallel data fetching - fetch data concurrently

async function getUser(id: string) &#123;
  const res = await fetch(\\\`https://api.example.com/users/$&#123;id&#125;\\\`);
  return res.json();
&#125;

async function getPosts(userId: string) &#123;
  const res = await fetch(\`https://api.example.com/posts?userId=$&#123;userId&#125;\`);
  return res.json();
&#125;

async function getComments(userId: string) &#123;
  const res = await fetch(\`https://api.example.com/comments?userId=$&#123;userId&#125;\`);
  return res.json();
&#125;

export default async function UserProfile(&#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;) &#123;
  // Fetch all data in parallel
  const [user, posts, comments] = await Promise.all([
    getUser(params.id),
    getPosts(params.id),
    getComments(params.id),
  ]);
  
  return (
    <div>
      <h1>&#123;user.name&#125;</h1>
      <section>
        <h2>Posts: &#123;posts.length&#125;</h2>
        <h2>Comments: &#123;comments.length&#125;</h2>
      </section>
    </div>
  );
&#125;`;

  sequentialFetching = `// Sequential data fetching - when data depends on previous results

async function getUser(id: string) &#123;
  const res = await fetch(\\\`https://api.example.com/users/$&#123;id&#125;\\\`);
  return res.json();
&#125;

async function getUserPosts(userId: string) &#123;
  const res = await fetch(\\\`https://api.example.com/posts?author=$&#123;userId&#125;\\\`);
  return res.json();
&#125;

async function getPostComments(postId: string) &#123;
  const res = await fetch(\\\`https://api.example.com/comments?postId=$&#123;postId&#125;\\\`);
  return res.json();
&#125;

export default async function UserPostsPage(&#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;) &#123;
  // Fetch user first
  const user = await getUser(params.id);
  
  // Then fetch their posts
  const posts = await getUserPosts(user.id);
  
  // Then fetch comments for first post
  const comments = posts[0] ? await getPostComments(posts[0].id) : [];
  
  return (
    <div>
      <h1>&#123;user.name&#125;'s Posts</h1>
      &#123;posts.map((post: any) => (
        <article key=&#123;post.id&#125;>&#123;post.title&#125;</article>
      ))&#125;
    </div>
  );
&#125;`;

  clientFetching = `// Client-side data fetching with useEffect

'use client';

import &#123; useState, useEffect &#125; from 'react';

export default function ClientPosts() &#123;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => &#123;
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => &#123;
        setPosts(data);
        setLoading(false);
      &#125;)
      .catch(err => &#123;
        setError(err.message);
        setLoading(false);
      &#125;);
  &#125;, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: &#123;error&#125;</div>;

  return (
    <div>
      &#123;posts.map((post: any) => (
        <article key=&#123;post.id&#125;>
          <h2>&#123;post.title&#125;</h2>
        </article>
      ))&#125;
    </div>
  );
&#125;

// Good for: user interactions, personalized data`;

  swrPattern = `// SWR (stale-while-revalidate) for client-side fetching
// npm install swr

'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Posts() &#123;
  const &#123; data, error, isLoading &#125; = useSWR('/api/posts', fetcher, &#123;
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30000, // Refresh every 30 seconds
  &#125;);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      &#123;data.map((post: any) => (
        <article key=&#123;post.id&#125;>
          <h2>&#123;post.title&#125;</h2>
        </article>
      ))&#125;
    </div>
  );
&#125;

// With mutation
import useSWR, &#123; mutate &#125; from 'swr';

function addPost() &#123;
  mutate('/api/posts', async (posts) => &#123;
    const newPost = await createPost();
    return [...posts, newPost];
  &#125;);
&#125;`;

  reactQuery = `// React Query (TanStack Query) for advanced client-side fetching
// npm install @tanstack/react-query

// app/providers.tsx
'use client';

import &#123; QueryClient, QueryClientProvider &#125; from '@tanstack/react-query';
import &#123; useState &#125; from 'react';

export function Providers(&#123; children &#125;: &#123; children: React.ReactNode &#125;) &#123;
  const [queryClient] = useState(() => new QueryClient(&#123;
    defaultOptions: &#123;
      queries: &#123;
        staleTime: 60 * 1000, // 1 minute
        cacheTime: 5 * 60 * 1000, // 5 minutes
      &#125;,
    &#125;,
  &#125;));

  return (
    <QueryClientProvider client=&#123;queryClient&#125;>
      &#123;children&#125;
    </QueryClientProvider>
  );
&#125;

// app/posts/page.tsx
'use client';

import &#123; useQuery, useMutation, useQueryClient &#125; from '@tanstack/react-query';

export default function Posts() &#123;
  const queryClient = useQueryClient();
  
  const &#123; data, isLoading, error &#125; = useQuery(&#123;
    queryKey: ['posts'],
    queryFn: async () => &#123;
      const res = await fetch('/api/posts');
      return res.json();
    &#125;,
  &#125;);

  const mutation = useMutation(&#123;
    mutationFn: (newPost) => fetch('/api/posts', &#123;
      method: 'POST',
      body: JSON.stringify(newPost),
    &#125;),
    onSuccess: () => &#123;
      queryClient.invalidateQueries(&#123; queryKey: ['posts'] &#125;);
    &#125;,
  &#125;);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      &#123;data.map((post: any) => (
        <article key=&#123;post.id&#125;>&#123;post.title&#125;</article>
      ))&#125;
    </div>
  );
&#125;`;

  errorHandling = `// Error handling in data fetching

// Server Component error handling
async function getData() &#123;
  try &#123;
    const res = await fetch('https://api.example.com/data');
    
    if (!res.ok) &#123;
      throw new Error(\\\`HTTP error! status: $&#123;res.status&#125;\\\`);
    &#125;
    
    return res.json();
  &#125; catch (error) &#123;
    console.error('Failed to fetch data:', error);
    throw error; // Will be caught by error.tsx
  &#125;
&#125;

export default async function Page() &#123;
  const data = await getData();
  return <div>&#123;data.content&#125;</div>;
&#125;

// error.tsx boundary
'use client';

export default function Error(&#123;
  error,
  reset,
&#125;: &#123;
  error: Error & &#123; digest?: string &#125;;
  reset: () => void;
&#125;) &#123;
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>&#123;error.message&#125;</p>
      <button onClick=&#123;reset&#125;>Try again</button>
    </div>
  );
&#125;

// Client-side error handling with React Query
const &#123; data, error, isError &#125; = useQuery(&#123;
  queryKey: ['data'],
  queryFn: fetchData,
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
&#125;);`;
}
