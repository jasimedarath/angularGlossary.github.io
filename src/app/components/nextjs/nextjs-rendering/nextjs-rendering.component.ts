import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-nextjs-rendering',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-rendering.component.html',
  styleUrl: './nextjs-rendering.component.scss'
})
export class NextjsRenderingComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  ssrBasics = `// Server-Side Rendering (SSR)
// Page is rendered on each request

// app/posts/[id]/page.tsx
async function getPost(id: string) &#123;
  const res = await fetch(\\\`https://api.example.com/posts/$&#123;id&#125;\\\`, &#123;
    cache: 'no-store' // Disable caching for SSR
  &#125;);
  return res.json();
&#125;

export default async function PostPage(&#123; 
  params 
&#125;: &#123; 
  params: &#123; id: string &#125; 
&#125;) &#123;
  const post = await getPost(params.id);
  
  return (
    <article>
      <h1>&#123;post.title&#125;</h1>
      <p>&#123;post.content&#125;</p>
      <time>&#123;new Date().toLocaleString()&#125;</time>
    </article>
  );
&#125;

// Rendered on every request
// Always fresh data
// Slower initial load`;

  ssgBasics = `// Static Site Generation (SSG)
// Pages are generated at build time

// app/blog/[slug]/page.tsx
export async function generateStaticParams() &#123;
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map((post: any) => (&#123;
    slug: post.slug,
  &#125;));
&#125;

async function getPost(slug: string) &#123;
  const res = await fetch(\\\`https://api.example.com/posts/$&#123;slug&#125;\\\`, &#123;
    cache: 'force-cache' // Default for SSG
  &#125;);
  return res.json();
&#125;

export default async function BlogPost(&#123; 
  params 
&#125;: &#123; 
  params: &#123; slug: string &#125; 
&#125;) &#123;
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>&#123;post.title&#125;</h1>
      <div dangerouslySetInnerHTML=&#123;&#123; __html: post.content &#125;&#125; />
    </article>
  );
&#125;

// Generated at build time
// Ultra-fast loading
// Great for blogs, documentation`;

  isrBasics = `// Incremental Static Regeneration (ISR)
// Static with periodic updates

// app/products/[id]/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

async function getProduct(id: string) &#123;
  const res = await fetch(\\\`https://api.example.com/products/$&#123;id&#125;\\\`, &#123;
    next: &#123; revalidate: 60 &#125;
  &#125;);
  return res.json();
&#125;

export default async function ProductPage(&#123; 
  params 
&#125;: &#123; 
  params: &#123; id: string &#125; 
&#125;) &#123;
  const product = await getProduct(params.id);
  
  return (
    <div>
      <h1>&#123;product.name&#125;</h1>
      <p>&#123;product.description&#125;</p>
      <p>Price: &#123;product.price&#125;</p>
      <p>Last updated: &#123;new Date().toLocaleString()&#125;</p>
    </div>
  );
&#125;

// On-demand revalidation
export async function POST(request: Request) &#123;
  const &#123; id &#125; = await request.json();
  revalidatePath(\\\`/products/$&#123;id&#125;\\\`);
  return Response.json(&#123; revalidated: true &#125;);
&#125;`;

  csrBasics = `// Client-Side Rendering (CSR)
// Rendered in the browser

'use client'; // Mark as Client Component

import &#123; useState, useEffect &#125; from 'react';

export default function UserProfile() &#123;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => &#123;
    fetch('/api/user')
      .then(res => res.json())
      .then(data => &#123;
        setUser(data);
        setLoading(false);
      &#125;);
  &#125;, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, &#123;user?.name&#125;</h1>
      <p>Email: &#123;user?.email&#125;</p>
    </div>
  );
&#125;

// Rendered in browser
// Interactive immediately
// Good for personalized content`;

  comparison = `// Rendering Method Comparison

// 1. SSG (Static Site Generation)
// ✓ Best for: Blogs, marketing pages, documentation
// ✓ Performance: Fastest
// ✓ Build time: Slower (generates all pages)
// ✓ Data freshness: Stale until rebuild
export const dynamic = 'force-static';

// 2. ISR (Incremental Static Regeneration)
// ✓ Best for: E-commerce, news sites
// ✓ Performance: Very fast
// ✓ Build time: Fast (generates on-demand)
// ✓ Data freshness: Stale with periodic updates
export const revalidate = 3600; // 1 hour

// 3. SSR (Server-Side Rendering)
// ✓ Best for: Personalized dashboards, real-time data
// ✓ Performance: Slower (renders on request)
// ✓ Build time: Fast
// ✓ Data freshness: Always fresh
export const dynamic = 'force-dynamic';

// 4. CSR (Client-Side Rendering)
// ✓ Best for: Interactive widgets, user-specific UI
// ✓ Performance: Slow initial, fast interactions
// ✓ Build time: Fast
// ✓ Data freshness: As fresh as you fetch
'use client';`;

  generateStaticParams = `// generateStaticParams - Define static paths at build time

// app/blog/[category]/[slug]/page.tsx
export async function generateStaticParams() &#123;
  const categories = await fetch('https://api.example.com/categories')
    .then(res => res.json());
  
  const paths = [];
  
  for (const category of categories) &#123;
    const posts = await fetch(\\\`https://api.example.com/posts?category=$&#123;category.id&#125;\\\`)
      .then(res => res.json());
    
    posts.forEach((post: any) => &#123;
      paths.push(&#123;
        category: category.slug,
        slug: post.slug,
      &#125;);
    &#125;);
  &#125;
  
  return paths;
&#125;

// With parent params
export async function generateStaticParams(&#123; 
  params 
&#125;: &#123; 
  params: &#123; category: string &#125; 
&#125;) &#123;
  const posts = await fetch(\\\`https://api.example.com/posts?category=$&#123;params.category&#125;\\\`)
    .then(res => res.json());
  
  return posts.map((post: any) => (&#123;
    slug: post.slug,
  &#125;));
&#125;`;

  revalidation = `// Revalidation Strategies

// 1. Time-based revalidation (ISR)
export const revalidate = 3600; // Revalidate every hour

async function getData() &#123;
  const res = await fetch('https://api.example.com/data', &#123;
    next: &#123; revalidate: 3600 &#125;
  &#125;);
  return res.json();
&#125;

// 2. On-demand revalidation
import &#123; revalidatePath, revalidateTag &#125; from 'next/cache';

// Revalidate specific path
export async function POST() &#123;
  revalidatePath('/posts');
  return Response.json(&#123; revalidated: true &#125;);
&#125;

// Revalidate by tag
async function getDataWithTag() &#123;
  const res = await fetch('https://api.example.com/data', &#123;
    next: &#123; tags: ['posts'] &#125;
  &#125;);
  return res.json();
&#125;

export async function POST() &#123;
  revalidateTag('posts');
  return Response.json(&#123; revalidated: true &#125;);
&#125;

// 3. Disable caching (SSR)
async function getDynamicData() &#123;
  const res = await fetch('https://api.example.com/data', &#123;
    cache: 'no-store'
  &#125;);
  return res.json();
&#125;`;

  streaming = `// Streaming and Suspense

import &#123; Suspense &#125; from 'react';

// Server Component that streams data
async function SlowComponent() &#123;
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Slow content loaded!</div>;
&#125;

function LoadingFallback() &#123;
  return <div className="skeleton">Loading...</div>;
&#125;

export default function StreamingPage() &#123;
  return (
    <div>
      <h1>Page loaded immediately</h1>
      
      <Suspense fallback=&#123;<LoadingFallback />&#125;>
        <SlowComponent />
      </Suspense>
      
      <div>This content is also visible immediately</div>
    </div>
  );
&#125;

// Benefits:
// - Fast Time to First Byte (TTFB)
// - Progressive rendering
// - Better perceived performance
// - SEO-friendly (HTML streamed)`;
}
