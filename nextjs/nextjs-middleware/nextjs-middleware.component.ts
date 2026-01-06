import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-nextjs-middleware',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-middleware.component.html',
  styleUrl: './nextjs-middleware.component.scss'
})
export class NextjsMiddlewareComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  middlewareBasics = `// Middleware runs before requests are completed
// middleware.ts (at root level)

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  console.log('Middleware running for:', request.nextUrl.pathname);
  
  // Continue with the request
  return NextResponse.next();
&#125;

// Configure which paths middleware runs on
export const config = &#123;
  matcher: '/dashboard/:path*', // Runs on all /dashboard routes
&#125;;

// Multiple matchers
export const config = &#123;
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*',
  ],
&#125;;

// Exclude specific paths
export const config = &#123;
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
&#125;;`;

  authentication = `// Authentication with Middleware

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) &#123;
    if (!token) &#123;
      // Redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    &#125;
    
    // Verify token (you might want to use JWT verify here)
    try &#123;
      // const verified = verifyToken(token);
      // if (!verified) throw new Error();
    &#125; catch (error) &#123;
      return NextResponse.redirect(new URL('/login', request.url));
    &#125;
  &#125;
  
  // Redirect authenticated users from login page
  if (request.nextUrl.pathname === '/login' && token) &#123;
    return NextResponse.redirect(new URL('/dashboard', request.url));
  &#125;
  
  return NextResponse.next();
&#125;

export const config = &#123;
  matcher: ['/dashboard/:path*', '/login'],
&#125;;`;

  redirects = `// Redirects with Middleware

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  // 1. Simple redirect
  if (request.nextUrl.pathname === '/old-page') &#123;
    return NextResponse.redirect(new URL('/new-page', request.url));
  &#125;
  
  // 2. Conditional redirect
  const country = request.geo?.country;
  if (request.nextUrl.pathname === '/blocked' && country === 'US') &#123;
    return NextResponse.redirect(new URL('/us-only', request.url));
  &#125;
  
  // 3. Locale-based redirect
  const locale = request.cookies.get('locale')?.value || 'en';
  if (request.nextUrl.pathname === '/') &#123;
    return NextResponse.redirect(new URL(\\\`/$&#123;locale&#125;\\\`, request.url));
  &#125;
  
  // 4. Permanent redirect (308)
  if (request.nextUrl.pathname.startsWith('/blog')) &#123;
    const url = new URL(request.url);
    url.pathname = url.pathname.replace('/blog', '/articles');
    return NextResponse.redirect(url, 308);
  &#125;
  
  // 5. Query parameter based redirect
  const ref = request.nextUrl.searchParams.get('ref');
  if (ref === 'twitter') &#123;
    return NextResponse.redirect(new URL('/twitter-landing', request.url));
  &#125;
  
  return NextResponse.next();
&#125;`;

  rewriting = `// URL Rewriting with Middleware

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  // 1. Simple rewrite (URL stays same, content changes)
  if (request.nextUrl.pathname.startsWith('/docs')) &#123;
    return NextResponse.rewrite(new URL('/documentation' + request.nextUrl.pathname.slice(5), request.url));
  &#125;
  
  // 2. A/B Testing
  const bucket = Math.random() < 0.5 ? 'a' : 'b';
  if (request.nextUrl.pathname === '/experiment') &#123;
    const response = NextResponse.rewrite(new URL(\\\`/experiment-$&#123;bucket&#125;\\\`, request.url));
    response.cookies.set('bucket', bucket);
    return response;
  &#125;
  
  // 3. Multi-tenant rewrite
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  
  if (subdomain !== 'www' && subdomain !== 'localhost:3000') &#123;
    // Rewrite to tenant-specific page
    return NextResponse.rewrite(new URL(\`/tenants/$&#123;subdomain&#125;$&#123;request.nextUrl.pathname&#125;\`, request.url));
  &#125;
  
  // 4. Feature flag rewrite
  const features = request.cookies.get('features')?.value;
  if (features?.includes('new-ui') && request.nextUrl.pathname === '/dashboard') &#123;
    return NextResponse.rewrite(new URL('/dashboard-v2', request.url));
  &#125;
  
  return NextResponse.next();
&#125;`;

  headers = `// Setting Custom Headers

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // CORS headers
  if (request.nextUrl.pathname.startsWith('/api')) &#123;
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight
    if (request.method === 'OPTIONS') &#123;
      return new NextResponse(null, &#123; status: 200, headers: response.headers &#125;);
    &#125;
  &#125;
  
  // Cache control
  if (request.nextUrl.pathname.startsWith('/static')) &#123;
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  &#125;
  
  // Custom headers
  response.headers.set('X-Custom-Header', 'value');
  response.headers.set('X-Request-ID', crypto.randomUUID());
  
  return response;
&#125;`;

  cookies = `// Cookie Management in Middleware

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  const response = NextResponse.next();
  
  // Read cookies
  const sessionId = request.cookies.get('session')?.value;
  const theme = request.cookies.get('theme')?.value || 'light';
  
  // Set cookie
  response.cookies.set('visited', 'true', &#123;
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  &#125;);
  
  // Set multiple cookies
  response.cookies.set('user-id', '123');
  response.cookies.set('session-token', 'abc', &#123;
    httpOnly: true,
    secure: true,
  &#125;);
  
  // Delete cookie
  if (request.nextUrl.pathname === '/logout') &#123;
    response.cookies.delete('session');
    response.cookies.delete('user-id');
    return NextResponse.redirect(new URL('/', request.url));
  &#125;
  
  // Cookie-based feature flags
  const features = request.cookies.get('features')?.value?.split(',') || [];
  if (features.includes('beta') && request.nextUrl.pathname === '/app') &#123;
    return NextResponse.rewrite(new URL('/app-beta', request.url));
  &#125;
  
  return response;
&#125;`;

  rateLimiting = `// Rate Limiting with Middleware

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

// In-memory store (use Redis in production)
const rateLimit = new Map<string, &#123; count: number; resetTime: number &#125;>();

export function middleware(request: NextRequest) &#123;
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100;
  
  const userLimit = rateLimit.get(ip);
  
  if (userLimit && now < userLimit.resetTime) &#123;
    if (userLimit.count >= maxRequests) &#123;
      return new NextResponse('Too Many Requests', &#123;
        status: 429,
        headers: &#123;
          'Retry-After': String(Math.ceil((userLimit.resetTime - now) / 1000)),
          'X-RateLimit-Limit': String(maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(userLimit.resetTime),
        &#125;,
      &#125;);
    &#125;
    userLimit.count++;
  &#125; else &#123;
    rateLimit.set(ip, &#123;
      count: 1,
      resetTime: now + windowMs,
    &#125;);
  &#125;
  
  const response = NextResponse.next();
  const current = rateLimit.get(ip)!;
  response.headers.set('X-RateLimit-Limit', String(maxRequests));
  response.headers.set('X-RateLimit-Remaining', String(maxRequests - current.count));
  response.headers.set('X-RateLimit-Reset', String(current.resetTime));
  
  return response;
&#125;

export const config = &#123;
  matcher: '/api/:path*',
&#125;;`;

  geolocation = `// Geolocation and Device Detection

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  // Geolocation data (Vercel provides this)
  const country = request.geo?.country || 'US';
  const city = request.geo?.city;
  const region = request.geo?.region;
  const latitude = request.geo?.latitude;
  const longitude = request.geo?.longitude;
  
  // User agent
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent);
  const isBot = /bot|crawler|spider/i.test(userAgent);
  
  // Block bots from certain routes
  if (isBot && request.nextUrl.pathname.startsWith('/dashboard')) &#123;
    return new NextResponse('Forbidden', &#123; status: 403 &#125;);
  &#125;
  
  // Country-specific redirects
  if (country === 'CN' && request.nextUrl.pathname === '/') &#123;
    return NextResponse.redirect(new URL('/cn', request.url));
  &#125;
  
  // Mobile redirect
  if (isMobile && request.nextUrl.pathname === '/desktop-app') &#123;
    return NextResponse.redirect(new URL('/mobile-app', request.url));
  &#125;
  
  // Pass geo data to response headers
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);
  response.headers.set('x-user-city', city || 'unknown');
  response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop');
  
  return response;
&#125;`;
}
