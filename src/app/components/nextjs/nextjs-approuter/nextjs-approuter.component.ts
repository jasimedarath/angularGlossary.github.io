import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

@Component({
  selector: 'app-nextjs-approuter',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-approuter.component.html',
  styleUrl: './nextjs-approuter.component.scss'
})
export class NextjsApprouterComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  appRouterBasics = `// app/page.tsx - Root page
export default function HomePage() &#123;
  return <h1>Welcome to Next.js App Router</h1>;
&#125;

// app/about/page.tsx - About page
export default function AboutPage() &#123;
  return <h1>About Us</h1>;
&#125;

// app/blog/[slug]/page.tsx - Dynamic route
export default function BlogPost(&#123; params &#125;: &#123; params: &#123; slug: string &#125; &#125;) &#123;
  return <h1>Blog Post: &#123;params.slug&#125;</h1>;
&#125;

// Folder structure:
// app/
//   page.tsx       -> /
//   about/
//     page.tsx     -> /about
//   blog/
//     [slug]/
//       page.tsx   -> /blog/:slug`;

  layouts = `// app/layout.tsx - Root layout
export default function RootLayout(&#123;
  children,
&#125;: &#123;
  children: React.ReactNode;
&#125;) &#123;
  return (
    <html lang="en">
      <body>
        <nav>Global Navigation</nav>
        &#123;children&#125;
        <footer>Global Footer</footer>
      </body>
    </html>
  );
&#125;

// app/dashboard/layout.tsx - Nested layout
export default function DashboardLayout(&#123;
  children,
&#125;: &#123;
  children: React.ReactNode;
&#125;) &#123;
  return (
    <div className="dashboard">
      <aside>Dashboard Sidebar</aside>
      <main>&#123;children&#125;</main>
    </div>
  );
&#125;

// Layouts wrap all child pages and persist across navigation`;

  routeGroups = `// Route groups organize routes without affecting URL
// Use (folder) syntax

// app/(marketing)/about/page.tsx -> /about
// app/(marketing)/contact/page.tsx -> /contact
// app/(marketing)/layout.tsx - Shared layout for marketing pages

export default function MarketingLayout(&#123;
  children,
&#125;: &#123;
  children: React.ReactNode;
&#125;) &#123;
  return (
    <div className="marketing-layout">
      <header>Marketing Header</header>
      &#123;children&#125;
    </div>
  );
&#125;

// app/(shop)/products/page.tsx -> /products
// app/(shop)/cart/page.tsx -> /cart
// app/(shop)/layout.tsx - Different layout for shop

// Route groups don't appear in URLs
// Great for organizing code and applying different layouts`;

  parallelRoutes = `// Parallel routes render multiple pages in the same layout simultaneously
// Use @folder syntax

// app/layout.tsx
export default function Layout(&#123;
  children,
  team,
  analytics,
&#125;: &#123;
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
&#125;) &#123;
  return (
    <>
      <div>&#123;children&#125;</div>
      <div className="parallel-sections">
        <section>&#123;team&#125;</section>
        <section>&#123;analytics&#125;</section>
      </div>
    </>
  );
&#125;

// app/@team/page.tsx - Team slot
export default function TeamPage() &#123;
  return <div>Team Dashboard</div>;
&#125;

// app/@analytics/page.tsx - Analytics slot
export default function AnalyticsPage() &#123;
  return <div>Analytics Dashboard</div>;
&#125;`;

  interceptingRoutes = `// Intercepting routes display route in a modal while preserving context
// (.) - same level
// (..) - one level up
// (..)(..) - two levels up
// (...) - from app root

// app/@modal/(.)photo/[id]/page.tsx
export default function PhotoModal(&#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;) &#123;
  return (
    <dialog open>
      <img src=\`/photos/$&#123;params.id&#125;\` alt="Photo" />
      <button>Close</button>
    </dialog>
  );
&#125;

// app/photo/[id]/page.tsx - Full page version
export default function PhotoPage(&#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;) &#123;
  return (
    <div>
      <h1>Photo &#123;params.id&#125;</h1>
      <img src=\`/photos/$&#123;params.id&#125;\` alt="Photo" />
    </div>
  );
&#125;

// Click from gallery -> Opens modal
// Direct URL navigation -> Shows full page`;

  loadingStates = `// app/dashboard/loading.tsx - Automatic loading UI
export default function Loading() &#123;
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content" />
    </div>
  );
&#125;

// Shown automatically while page.tsx is loading
// Works with Suspense boundaries

// app/dashboard/page.tsx
import &#123; Suspense &#125; from 'react';

async function DashboardData() &#123;
  const data = await fetchDashboardData();
  return <div>&#123;data&#125;</div>;
&#125;

export default function DashboardPage() &#123;
  return (
    <Suspense fallback=&#123;<Loading />&#125;>
      <DashboardData />
    </Suspense>
  );
&#125;`;

  errorStates = `// app/dashboard/error.tsx - Error UI
'use client';

export default function Error(&#123;
  error,
  reset,
&#125;: &#123;
  error: Error & &#123; digest?: string &#125;;
  reset: () => void;
&#125;) &#123;
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>&#123;error.message&#125;</p>
      <button onClick=&#123;reset&#125;>Try again</button>
    </div>
  );
&#125;

// app/not-found.tsx - 404 page
export default function NotFound() &#123;
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
&#125;

// app/dashboard/page.tsx
import &#123; notFound &#125; from 'next/navigation';

export default async function Page(&#123; params &#125;) &#123;
  const data = await fetchData(params.id);
  if (!data) notFound();
  return <div>&#123;data&#125;</div>;
&#125;`;

  templateFiles = `// template.tsx creates a new instance on navigation (unlike layouts)
// app/template.tsx
export default function Template(&#123; children &#125;: &#123; children: React.ReactNode &#125;) &#123;
  return <div className="animate-fadeIn">&#123;children&#125;</div>;
&#125;

// Use cases:
// - Animations on page transitions
// - Features requiring fresh component state
// - Logging page views

// Difference from layout.tsx:
// - Layout: Persists, doesn't remount
// - Template: Creates new instance on each navigation

// app/dashboard/template.tsx
'use client';

import &#123; useEffect &#125; from 'react';

export default function DashboardTemplate(&#123;
  children,
&#125;: &#123;
  children: React.ReactNode;
&#125;) &#123;
  useEffect(() => &#123;
    console.log('Page viewed');
  &#125;, []);

  return <div className="page-transition">&#123;children&#125;</div>;
&#125;`;
}
