import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-nextjs-gettingstarted',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-gettingstarted.component.html',
  styleUrl: './nextjs-gettingstarted.component.scss'
})
export class NextjsGettingstartedComponent {
  prerequisites = `Prerequisites for Next.js Development

1. Node.js and npm/yarn
   - Node.js version 18.17 or newer (LTS recommended)
   - npm (comes with Node.js) or yarn/pnpm
   - Download from: https://nodejs.org/

2. Code Editor
   - Visual Studio Code (recommended)
   - Extensions: ES7+ React snippets, Tailwind CSS IntelliSense, Prettier

3. Basic Knowledge
   - HTML, CSS, JavaScript (ES6+)
   - React fundamentals (components, props, state, hooks)
   - Basic understanding of Node.js

4. Check Installations:
   node --version   # Should show v18.17+
   npm --version    # Should show 9.0+

5. Helpful to Know
   - Git version control
   - Command line basics
   - RESTful APIs
   - TypeScript (recommended)`;

  installation = `Creating a Next.js Application

# Create Next.js app (recommended)
npx create-next-app@latest my-nextjs-app

# Interactive prompts:
# ✔ Would you like to use TypeScript? › Yes
# ✔ Would you like to use ESLint? › Yes
# ✔ Would you like to use Tailwind CSS? › Yes
# ✔ Would you like to use 'src/' directory? › Yes
# ✔ Would you like to use App Router? › Yes
# ✔ Would you like to customize the default import alias? › No

# Navigate to project
cd my-nextjs-app

# Start development server
npm run dev

# With specific options (skip prompts)
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir --eslint

# Using yarn
yarn create next-app my-nextjs-app

# Using pnpm
pnpm create next-app my-nextjs-app

# Application opens at http://localhost:3000`;

  projectStructure = `Next.js Project Structure (App Router)

my-nextjs-app/
├── public/                    # Static assets
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/                   # App Router (Next.js 13+)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading UI
│   │   ├── error.tsx          # Error UI
│   │   ├── not-found.tsx      # 404 page
│   │   ├── globals.css        # Global styles
│   │   ├── about/
│   │   │   └── page.tsx       # /about route
│   │   ├── blog/
│   │   │   ├── page.tsx       # /blog route
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # /blog/[slug] dynamic
│   │   └── api/               # API routes
│   │       └── users/
│   │           └── route.ts   # /api/users endpoint
│   ├── components/            # Reusable components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/                   # Utilities & helpers
│       └── utils.ts
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── tailwind.config.ts         # Tailwind config

Key Files:
- app/layout.tsx: Root layout wrapping all pages
- app/page.tsx: Homepage component
- next.config.js: Next.js configuration
- .env.local: Environment variables (not committed)

Pages Router Structure (Legacy):
pages/
├── _app.tsx                   # Custom App component
├── _document.tsx              # Custom Document
├── index.tsx                  # Home page (/)
├── about.tsx                  # About page (/about)
└── api/
    └── hello.ts               # API route (/api/hello)`;

  basicCommands = `Essential Next.js Commands

# Development
npm run dev              # Start development server (http://localhost:3000)
npm run dev -- -p 4000   # Use different port

# Building
npm run build            # Create production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Using yarn
yarn dev
yarn build
yarn start

# Using pnpm
pnpm dev
pnpm build
pnpm start

# Export static HTML
npm run build            # Build
npm run export           # Export to 'out' directory

# Environment-specific
NODE_ENV=production npm run build

# Type checking (TypeScript)
npx tsc --noEmit

# Clean Next.js cache
rm -rf .next

# Install dependencies
npm install package-name
npm install -D package-name  # Dev dependency`;

  firstPage = `Creating Your First Page

# app/about/page.tsx (App Router)
export default function AboutPage() &#123;
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our Next.js application!</p>
    </div>
  );
&#125;

# With Metadata
import &#123; Metadata &#125; from 'next';

export const metadata: Metadata = &#123;
  title: 'About Us',
  description: 'Learn more about our company'
&#125;;

export default function AboutPage() &#123;
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our Next.js application!</p>
    </div>
  );
&#125;

# Dynamic Route: app/blog/[slug]/page.tsx
export default function BlogPost(&#123; params &#125;: &#123; params: &#123; slug: string &#125; &#125;) &#123;
  return (
    <div>
      <h1>Blog Post: &#123;params.slug&#125;</h1>
    </div>
  );
&#125;

# Client Component (with state)
'use client';

import &#123; useState &#125; from 'react';

export default function Counter() &#123;
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: &#123;count&#125;</p>
      <button onClick=&#123;() => setCount(count + 1)&#125;>Increment</button>
    </div>
  );
&#125;

# Server Component (default)
async function getData() &#123;
  const res = await fetch('https://api.example.com/data');
  return res.json();
&#125;

export default async function Page() &#123;
  const data = await getData();
  return <div>&#123;JSON.stringify(data)&#125;</div>;
&#125;`;

  routing = `Next.js Routing Basics

# File-based Routing (App Router)
app/
├── page.tsx                    # / (root)
├── about/
│   └── page.tsx               # /about
├── blog/
│   ├── page.tsx               # /blog
│   └── [slug]/
│       └── page.tsx           # /blog/:slug
└── dashboard/
    ├── layout.tsx             # Nested layout
    ├── page.tsx               # /dashboard
    └── settings/
        └── page.tsx           # /dashboard/settings

# Navigation with Link
import Link from 'next/link';

export default function Nav() &#123;
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/my-post">Blog Post</Link>
    </nav>
  );
&#125;

# Programmatic Navigation
'use client';

import &#123; useRouter &#125; from 'next/navigation';

export default function Page() &#123;
  const router = useRouter();

  return (
    <button onClick=&#123;() => router.push('/about')&#125;>
      Go to About
    </button>
  );
&#125;

# Route Groups (organization, no URL impact)
app/
├── (marketing)/
│   ├── about/page.tsx         # /about
│   └── contact/page.tsx       # /contact
└── (shop)/
    ├── products/page.tsx      # /products
    └── cart/page.tsx          # /cart`;

  configuration = `Next.js Configuration

# next.config.js
/** @type &#123;import('next').NextConfig&#125; */
const nextConfig = &#123;
  // Image domains
  images: &#123;
    domains: ['example.com', 'cdn.example.com'],
    remotePatterns: [
      &#123;
        protocol: 'https',
        hostname: '**.example.com',
      &#125;,
    ],
  &#125;,

  // Redirects
  async redirects() &#123;
    return [
      &#123;
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      &#125;,
    ];
  &#125;,

  // Rewrites
  async rewrites() &#123;
    return [
      &#123;
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      &#125;,
    ];
  &#125;,

  // Headers
  async headers() &#123;
    return [
      &#123;
        source: '/api/:path*',
        headers: [
          &#123; key: 'Access-Control-Allow-Origin', value: '*' &#125;,
        ],
      &#125;,
    ];
  &#125;,

  // Environment variables
  env: &#123;
    CUSTOM_KEY: 'my-value',
  &#125;,

  // React strict mode
  reactStrictMode: true,

  // Experimental features
  experimental: &#123;
    serverActions: true,
  &#125;,

  // Output mode
  output: 'standalone', // For Docker

  // Base path
  basePath: '/docs',

  // Asset prefix (CDN)
  assetPrefix: 'https://cdn.example.com',
&#125;;

module.exports = nextConfig;`;

  environmentVariables = `Environment Variables

# .env.local (not committed to git)
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=your_secret_key_here
NEXT_PUBLIC_API_URL=https://api.example.com

# .env.production (production)
DATABASE_URL=postgresql://prod-db:5432/mydb
API_KEY=production_key

# Access in Server Components
export default async function Page() &#123;
  const dbUrl = process.env.DATABASE_URL;
  const apiKey = process.env.API_KEY;
  // Available only on server
  return <div>Server Component</div>;
&#125;

# Access in Client Components (must use NEXT_PUBLIC_ prefix)
'use client';

export default function ClientComponent() &#123;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Only NEXT_PUBLIC_ variables work in client
  return <div>API: &#123;apiUrl&#125;</div>;
&#125;

# Runtime Configuration (next.config.js)
module.exports = &#123;
  publicRuntimeConfig: &#123;
    apiUrl: process.env.API_URL,
  &#125;,
  serverRuntimeConfig: &#123;
    secret: process.env.SECRET_KEY,
  &#125;,
&#125;;

# Access runtime config
import getConfig from 'next/config';

const &#123; publicRuntimeConfig &#125; = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;`;

  packageJson = `Understanding package.json

&#123;
  "name": "my-nextjs-app",
  "version": "0.1.0",
  "private": true,
  "scripts": &#123;
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  &#125;,
  "dependencies": &#123;
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  &#125;,
  "devDependencies": &#123;
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.0",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  &#125;
&#125;

# Common packages to add
npm install @tanstack/react-query     # Data fetching
npm install axios                     # HTTP client
npm install zustand                   # State management
npm install next-auth                 # Authentication
npm install prisma @prisma/client     # Database ORM
npm install zod                       # Validation
npm install react-hook-form           # Form handling
npm install lucide-react              # Icons`;

  commonIssues = `Common Issues and Solutions

1. Port Already in Use
   Error: Port 3000 is already in use
   Solution:
   npm run dev -- -p 3001  # Use different port
   # Or kill process using port 3000

2. Module Not Found
   Error: Cannot find module 'next'
   Solution:
   rm -rf node_modules package-lock.json
   npm install

3. Hydration Mismatch
   Error: Hydration failed because the initial UI does not match
   Solution:
   # Avoid using browser-only APIs in server components
   # Use useEffect for client-only code
   # Check for mismatched HTML tags

4. Image Optimization Error
   Error: Invalid src prop
   Solution:
   # Add domain to next.config.js images.domains
   # Or use remotePatterns

5. Environment Variables Not Loading
   Solution:
   # Restart dev server after adding .env
   # Use NEXT_PUBLIC_ prefix for client
   # Check .env.local is in root directory

6. Build Errors
   Error: Build failed
   Solution:
   # Clear cache
   rm -rf .next
   npm run build

7. TypeScript Errors
   Solution:
   # Check tsconfig.json
   # Run: npx tsc --noEmit
   # Install types: npm install -D @types/package

8. API Route Not Working
   Solution:
   # Check route.ts filename (not route.tsx)
   # Export named functions (GET, POST, etc.)
   # Restart dev server

9. Static Export Issues
   Error: Dynamic features not supported in static export
   Solution:
   # Remove dynamic routes or APIs
   # Or use server-side rendering

10. Performance Issues
    Solution:
    # Use Image component for images
    # Implement proper caching
    # Enable ISR for dynamic content
    # Use React.memo for expensive components`;
}
