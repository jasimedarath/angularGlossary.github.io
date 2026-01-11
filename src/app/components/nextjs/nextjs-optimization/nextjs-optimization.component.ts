import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

@Component({
  selector: 'app-nextjs-optimization',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-optimization.component.html',
  styleUrl: './nextjs-optimization.component.scss'
})
export class NextjsOptimizationComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  imageOptimization = `// Next.js Image Component - automatic optimization
import Image from 'next/image';

export default function ProductPage() &#123;
  return (
    <div>
      &#123;/* Static import */&#125;
      <Image
        src="/hero.jpg"
        alt="Hero"
        width=&#123;800&#125;
        height=&#123;600&#125;
        priority // Load immediately for LCP
      />
      
      &#123;/* Remote image */&#125;
      <Image
        src="https://example.com/image.jpg"
        alt="Product"
        width=&#123;400&#125;
        height=&#123;300&#125;
        loading="lazy" // Default
      />
      
      &#123;/* Fill container */&#125;
      <div style=&#123;&#123; position: 'relative', width: '100%', height: '400px' &#125;&#125;>
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          style=&#123;&#123; objectFit: 'cover' &#125;&#125;
        />
      </div>
      
      &#123;/* Responsive images */&#125;
      <Image
        src="/product.jpg"
        alt="Product"
        width=&#123;800&#125;
        height=&#123;600&#125;
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
&#125;

// next.config.js - Configure remote domains
module.exports = &#123;
  images: &#123;
    remotePatterns: [
      &#123;
        protocol: 'https',
        hostname: 'example.com',
      &#125;,
    ],
  &#125;,
&#125;;`;

  fontOptimization = `// Font Optimization with next/font
import &#123; Inter, Roboto_Mono, Playfair_Display &#125; from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts
const inter = Inter(&#123;
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
&#125;);

const robotoMono = Roboto_Mono(&#123;
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
&#125;);

// Local fonts
const myFont = localFont(&#123;
  src: './my-font.woff2',
  display: 'swap',
  variable: '--font-custom',
&#125;);

// app/layout.tsx
export default function RootLayout(&#123; children &#125;: &#123; children: React.ReactNode &#125;) &#123;
  return (
    <html lang="en" className=&#123;\`$&#123;inter.variable&#125; $&#123;robotoMono.variable&#125;\`&#125;>
      <body className=&#123;inter.className&#125;>&#123;children&#125;</body>
    </html>
  );
&#125;

// Use in CSS
// .title &#123; font-family: var(--font-inter); &#125;
// .code &#123; font-family: var(--font-roboto-mono); &#125;

// Benefits:
// - Automatic self-hosting
// - Zero layout shift
// - No external network requests
// - Optimized loading`;

  scriptOptimization = `// Script Component for third-party scripts
import Script from 'next/script';

export default function Page() &#123;
  return (
    <>
      &#123;/* Load after page interactive (default) */&#125;
      <Script src="https://example.com/script.js" />
      
      &#123;/* Load before page interactive */&#125;
      <Script 
        src="https://example.com/critical.js"
        strategy="beforeInteractive"
      />
      
      &#123;/* Load after page fully loaded */&#125;
      <Script 
        src="https://example.com/analytics.js"
        strategy="afterInteractive"
      />
      
      &#123;/* Lazy load when idle */&#125;
      <Script 
        src="https://example.com/chat.js"
        strategy="lazyOnload"
      />
      
      &#123;/* Inline script */&#125;
      <Script id="analytics-init">
        &#123;\`
          window.dataLayer = window.dataLayer || [];
          function gtag()&#123;dataLayer.push(arguments);&#125;
          gtag('js', new Date());
        \`&#125;
      </Script>
      
      &#123;/* With callback */&#125;
      <Script
        src="https://example.com/sdk.js"
        onLoad=&#123;() => &#123;
          console.log('Script loaded!');
        &#125;&#125;
      />
    </>
  );
&#125;

// Strategies:
// - beforeInteractive: Critical scripts (polyfills)
// - afterInteractive: Analytics, ads (default)
// - lazyOnload: Chat widgets, social media`;

  bundleAnalyzer = `// Bundle Analysis
// Install: npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')(&#123;
  enabled: process.env.ANALYZE === 'true',
&#125;);

module.exports = withBundleAnalyzer(&#123;
  // Your Next.js config
  reactStrictMode: true,
&#125;);

// package.json
&#123;
  "scripts": &#123;
    "analyze": "ANALYZE=true next build",
    "analyze:server": "ANALYZE=true BUNDLE_ANALYZE=server next build",
    "analyze:browser": "ANALYZE=true BUNDLE_ANALYZE=browser next build"
  &#125;
&#125;

// Run: npm run analyze
// Opens interactive treemap showing bundle composition

// Optimization tips:
// - Identify large dependencies
// - Use dynamic imports for heavy components
// - Remove unused dependencies
// - Use barrel file imports carefully
// - Check for duplicate packages`;

  codeSplitting = `// Code Splitting and Dynamic Imports

// 1. Dynamic imports for components
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('@/components/Chart'), &#123;
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Disable SSR for this component
&#125;);

export default function Dashboard() &#123;
  return (
    <div>
      <h1>Dashboard</h1>
      <DynamicChart data=&#123;data&#125; />
    </div>
  );
&#125;

// 2. Dynamic imports with named exports
const DynamicButton = dynamic(
  () => import('@/components/Button').then(mod => mod.PrimaryButton)
);

// 3. Conditional loading
'use client';

import &#123; useState &#125; from 'react';
import dynamic from 'next/dynamic';

const HeavyModal = dynamic(() => import('@/components/HeavyModal'));

export default function Page() &#123;
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <button onClick=&#123;() => setShowModal(true)&#125;>Open Modal</button>
      &#123;showModal && <HeavyModal onClose=&#123;() => setShowModal(false)&#125; />&#125;
    </div>
  );
&#125;

// 4. Preload on hover
const DynamicComponent = dynamic(() => import('./Component'), &#123;
  loading: () => <Skeleton />,
&#125;);

function Link() &#123;
  return (
    <a 
      onMouseEnter=&#123;() => &#123;
        DynamicComponent.preload();
      &#125;&#125;
    >
      Hover to preload
    </a>
  );
&#125;`;

  metadata = `// Metadata Optimization for SEO

// app/layout.tsx
import type &#123; Metadata &#125; from 'next';

export const metadata: Metadata = &#123;
  title: &#123;
    template: '%s | My App',
    default: 'My App',
  &#125;,
  description: 'My app description',
  keywords: ['Next.js', 'React', 'TypeScript'],
  authors: [&#123; name: 'John Doe' &#125;],
  openGraph: &#123;
    title: 'My App',
    description: 'My app description',
    images: ['/og-image.jpg'],
    locale: 'en_US',
    type: 'website',
  &#125;,
  twitter: &#123;
    card: 'summary_large_image',
    title: 'My App',
    description: 'My app description',
    images: ['/twitter-image.jpg'],
  &#125;,
  robots: &#123;
    index: true,
    follow: true,
  &#125;,
&#125;;

// app/posts/[slug]/page.tsx - Dynamic metadata
export async function generateMetadata(&#123; params &#125;): Promise<Metadata> &#123;
  const post = await fetchPost(params.slug);
  
  return &#123;
    title: post.title,
    description: post.excerpt,
    openGraph: &#123;
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    &#125;,
  &#125;;
&#125;`;

  performanceTips = `// Performance Optimization Tips

// 1. Streaming and Suspense
import &#123; Suspense &#125; from 'react';

export default function Page() &#123;
  return (
    <div>
      <Suspense fallback=&#123;<Skeleton />&#125;>
        <SlowComponent />
      </Suspense>
    </div>
  );
&#125;

// 2. Parallel data fetching
async function getData() &#123;
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments(),
  ]);
  return &#123; users, posts, comments &#125;;
&#125;

// 3. Optimize third-party scripts
<Script src="analytics.js" strategy="lazyOnload" />

// 4. Use Server Components by default
// Reduces client-side JavaScript

// 5. Implement proper caching
export const revalidate = 3600;

// 6. Use Image component for all images
<Image src="/hero.jpg" width=&#123;800&#125; height=&#123;600&#125; alt="Hero" priority />

// 7. Minimize use of client-side state
// Keep as much on server as possible

// 8. Code split heavy components
const Chart = dynamic(() => import('./Chart'), &#123; ssr: false &#125;);

// 9. Optimize fonts
import &#123; Inter &#125; from 'next/font/google';
const inter = Inter(&#123; subsets: ['latin'] &#125;);`;

  webVitals = `// Monitoring Web Vitals

// app/_components/WebVitals.tsx
'use client';

import &#123; useReportWebVitals &#125; from 'next/web-vitals';

export function WebVitals() &#123;
  useReportWebVitals((metric) => &#123;
    // Send to analytics
    console.log(metric);
    
    // Example: Send to Google Analytics
    if (window.gtag) &#123;
      window.gtag('event', metric.name, &#123;
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
      &#125;);
    &#125;
  &#125;);
  
  return null;
&#125;

// app/layout.tsx
import &#123; WebVitals &#125; from './_components/WebVitals';

export default function RootLayout(&#123; children &#125;) &#123;
  return (
    <html>
      <body>
        <WebVitals />
        &#123;children&#125;
      </body>
    </html>
  );
&#125;

// Metrics tracked:
// - FCP: First Contentful Paint
// - LCP: Largest Contentful Paint
// - CLS: Cumulative Layout Shift
// - FID: First Input Delay
// - TTFB: Time to First Byte
// - INP: Interaction to Next Paint`;
}
