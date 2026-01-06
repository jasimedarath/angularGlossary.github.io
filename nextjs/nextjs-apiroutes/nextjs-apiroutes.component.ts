import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-nextjs-apiroutes',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-apiroutes.component.html',
  styleUrl: './nextjs-apiroutes.component.scss'
})
export class NextjsApiroutesComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  routeHandlerBasics = `// Route Handlers in App Router (replaces API routes)
// app/api/hello/route.ts

export async function GET(request: Request) &#123;
  return Response.json(&#123; message: 'Hello from Next.js!' &#125;);
&#125;

// Support all HTTP methods
export async function POST(request: Request) &#123;
  const body = await request.json();
  return Response.json(&#123; received: body &#125;);
&#125;

export async function PUT(request: Request) &#123;
  const body = await request.json();
  // Update logic
  return Response.json(&#123; updated: true &#125;);
&#125;

export async function DELETE(request: Request) &#123;
  // Delete logic
  return Response.json(&#123; deleted: true &#125;);
&#125;

export async function PATCH(request: Request) &#123;
  const body = await request.json();
  return Response.json(&#123; patched: true &#125;);
&#125;

// Access via: /api/hello`;

  requestHandling = `// Handling requests and extracting data

import &#123; NextRequest &#125; from 'next/server';

export async function GET(request: NextRequest) &#123;
  // URL search params
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  
  // Headers
  const token = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent');
  
  // Cookies
  const sessionId = request.cookies.get('session')?.value;
  
  return Response.json(&#123;
    query,
    page,
    hasAuth: !!token,
    userAgent,
    sessionId
  &#125;);
&#125;

export async function POST(request: Request) &#123;
  // JSON body
  const body = await request.json();
  
  // FormData
  // const formData = await request.formData();
  // const name = formData.get('name');
  
  // Text body
  // const text = await request.text();
  
  return Response.json(&#123; received: body &#125;);
&#125;`;

  responseHandling = `// Creating different types of responses

export async function GET(request: Request) &#123;
  // JSON response (most common)
  return Response.json(&#123; data: 'value' &#125;);
  
  // JSON with status code
  return Response.json(
    &#123; error: 'Not found' &#125;,
    &#123; status: 404 &#125;
  );
  
  // Response with headers
  return Response.json(
    &#123; data: 'value' &#125;,
    &#123;
      status: 200,
      headers: &#123;
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600',
        'X-Custom-Header': 'value'
      &#125;
    &#125;
  );
  
  // Set cookies
  const response = Response.json(&#123; success: true &#125;);
  response.headers.set('Set-Cookie', 'token=abc123; Path=/; HttpOnly');
  return response;
  
  // Text response
  return new Response('Plain text', &#123;
    headers: &#123; 'Content-Type': 'text/plain' &#125;
  &#125;);
  
  // Redirect
  return Response.redirect('https://example.com', 307);
&#125;`;

  dynamicRoutes = `// Dynamic route handlers
// app/api/posts/[id]/route.ts

export async function GET(
  request: Request,
  &#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;
) &#123;
  const post = await fetchPost(params.id);
  
  if (!post) &#123;
    return Response.json(
      &#123; error: 'Post not found' &#125;,
      &#123; status: 404 &#125;
    );
  &#125;
  
  return Response.json(post);
&#125;

export async function DELETE(
  request: Request,
  &#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;
) &#123;
  await deletePost(params.id);
  return Response.json(&#123; deleted: true &#125;);
&#125;

// app/api/users/[userId]/posts/[postId]/route.ts
export async function GET(
  request: Request,
  &#123; params &#125;: &#123; params: &#123; userId: string; postId: string &#125; &#125;
) &#123;
  const post = await fetchUserPost(params.userId, params.postId);
  return Response.json(post);
&#125;`;

  errorHandling = `// Error handling in route handlers

export async function GET(request: Request) &#123;
  try &#123;
    const data = await fetchData();
    return Response.json(data);
  &#125; catch (error) &#123;
    console.error('API Error:', error);
    
    return Response.json(
      &#123; 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      &#125;,
      &#123; status: 500 &#125;
    );
  &#125;
&#125;

// Validation errors
export async function POST(request: Request) &#123;
  const body = await request.json();
  
  if (!body.email || !body.password) &#123;
    return Response.json(
      &#123; error: 'Email and password are required' &#125;,
      &#123; status: 400 &#125;
    );
  &#125;
  
  if (!isValidEmail(body.email)) &#123;
    return Response.json(
      &#123; error: 'Invalid email format' &#125;,
      &#123; status: 422 &#125;
    );
  &#125;
  
  // Process request...
  return Response.json(&#123; success: true &#125;);
&#125;

// Authentication errors
export async function DELETE(request: Request) &#123;
  const token = request.headers.get('authorization');
  
  if (!token) &#123;
    return Response.json(
      &#123; error: 'Unauthorized' &#125;,
      &#123; status: 401 &#125;
    );
  &#125;
  
  const user = await verifyToken(token);
  
  if (!user) &#123;
    return Response.json(
      &#123; error: 'Invalid token' &#125;,
      &#123; status: 403 &#125;
    );
  &#125;
  
  // Proceed with delete...
&#125;`;

  middleware = `// Middleware for route handlers
// middleware.ts at root or in app/api/

import &#123; NextResponse &#125; from 'next/server';
import type &#123; NextRequest &#125; from 'next/server';

export function middleware(request: NextRequest) &#123;
  // CORS headers
  if (request.nextUrl.pathname.startsWith('/api/')) &#123;
    const response = NextResponse.next();
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight
    if (request.method === 'OPTIONS') &#123;
      return new Response(null, &#123; status: 200, headers: response.headers &#125;);
    &#125;
    
    return response;
  &#125;
  
  return NextResponse.next();
&#125;

export const config = &#123;
  matcher: '/api/:path*',
&#125;;

// Auth middleware
export function middleware(request: NextRequest) &#123;
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token && request.nextUrl.pathname.startsWith('/api/protected')) &#123;
    return Response.json(
      &#123; error: 'Unauthorized' &#125;,
      &#123; status: 401 &#125;
    );
  &#125;
  
  return NextResponse.next();
&#125;`;

  advancedPatterns = `// Advanced Route Handler patterns

// 1. Streaming responses
export async function GET() &#123;
  const encoder = new TextEncoder();
  const stream = new ReadableStream(&#123;
    async start(controller) &#123;
      for (let i = 0; i < 5; i++) &#123;
        controller.enqueue(encoder.encode(\`data: $&#123;i&#125;\\n\\n\`));
        await new Promise(resolve => setTimeout(resolve, 1000));
      &#125;
      controller.close();
    &#125;,
  &#125;);
  
  return new Response(stream, &#123;
    headers: &#123;
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    &#125;,
  &#125;);
&#125;

// 2. File uploads
export async function POST(request: Request) &#123;
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) &#123;
    return Response.json(&#123; error: 'No file uploaded' &#125;, &#123; status: 400 &#125;);
  &#125;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Save file...
  
  return Response.json(&#123; 
    success: true, 
    filename: file.name,
    size: file.size 
  &#125;);
&#125;

// 3. Webhook handlers
export async function POST(request: Request) &#123;
  const signature = request.headers.get('x-webhook-signature');
  const body = await request.text();
  
  if (!verifyWebhookSignature(body, signature)) &#123;
    return Response.json(&#123; error: 'Invalid signature' &#125;, &#123; status: 401 &#125;);
  &#125;
  
  const data = JSON.parse(body);
  // Process webhook...
  
  return Response.json(&#123; received: true &#125;);
&#125;`;

  caching = `// Caching in Route Handlers

// Static by default (cached)
export async function GET() &#123;
  const data = await fetch('https://api.example.com/data');
  return Response.json(data);
&#125;

// Opt out of caching
export const dynamic = 'force-dynamic';

export async function GET() &#123;
  const data = await fetchLatestData();
  return Response.json(data);
&#125;

// Revalidate periodically (ISR)
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() &#123;
  const data = await fetch('https://api.example.com/data', &#123;
    next: &#123; revalidate: 60 &#125;
  &#125;);
  return Response.json(data);
&#125;

// Custom cache headers
export async function GET() &#123;
  const data = await fetchData();
  
  return Response.json(data, &#123;
    headers: &#123;
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    &#125;
  &#125;);
&#125;`;
}
