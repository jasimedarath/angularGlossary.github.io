import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-nextjs-authentication',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-authentication.component.html',
  styleUrl: './nextjs-authentication.component.scss'
})
export class NextjsAuthenticationComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  nextAuthSetup = `// NextAuth.js Setup
// npm install next-auth

// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth(&#123;
  providers: [
    GithubProvider(&#123;
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    &#125;),
    GoogleProvider(&#123;
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    &#125;),
    CredentialsProvider(&#123;
      name: 'Credentials',
      credentials: &#123;
        email: &#123; label: "Email", type: "email" &#125;,
        password: &#123; label: "Password", type: "password" &#125;
      &#125;,
      async authorize(credentials) &#123;
        const user = await verifyCredentials(credentials);
        if (user) &#123;
          return user;
        &#125;
        return null;
      &#125;
    &#125;),
  ],
  pages: &#123;
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  &#125;,
  callbacks: &#123;
    async jwt(&#123; token, user &#125;) &#123;
      if (user) &#123;
        token.id = user.id;
        token.role = user.role;
      &#125;
      return token;
    &#125;,
    async session(&#123; session, token &#125;) &#123;
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    &#125;,
  &#125;,
&#125;);

export &#123; handler as GET, handler as POST &#125;;`;

  sessionManagement = `// Session Management

// Server Component - Get session
import &#123; getServerSession &#125; from 'next-auth';

export default async function ServerPage() &#123;
  const session = await getServerSession();
  
  if (!session) &#123;
    return <div>Not authenticated</div>;
  &#125;
  
  return (
    <div>
      <h1>Welcome, &#123;session.user?.name&#125;</h1>
      <p>Email: &#123;session.user?.email&#125;</p>
    </div>
  );
&#125;

// Client Component - Use session hook
'use client';

import &#123; useSession &#125; from 'next-auth/react';

export default function ClientProfile() &#123;
  const &#123; data: session, status &#125; = useSession();
  
  if (status === 'loading') &#123;
    return <div>Loading...</div>;
  &#125;
  
  if (status === 'unauthenticated') &#123;
    return <div>Please sign in</div>;
  &#125;
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: &#123;session?.user?.name&#125;</p>
      <p>Email: &#123;session?.user?.email&#125;</p>
    </div>
  );
&#125;

// Root layout - Session Provider
'use client';

import &#123; SessionProvider &#125; from 'next-auth/react';

export default function RootLayout(&#123; children &#125;: &#123; children: React.ReactNode &#125;) &#123;
  return (
    <html>
      <body>
        <SessionProvider>&#123;children&#125;</SessionProvider>
      </body>
    </html>
  );
&#125;`;

  protectedRoutes = `// Protected Routes

// Middleware protection
// middleware.ts
import &#123; withAuth &#125; from 'next-auth/middleware';

export default withAuth(&#123;
  pages: &#123;
    signIn: '/auth/signin',
  &#125;,
&#125;);

export const config = &#123;
  matcher: ['/dashboard/:path*', '/admin/:path*'],
&#125;;

// Advanced middleware with role checking
import &#123; withAuth &#125; from 'next-auth/middleware';
import &#123; NextResponse &#125; from 'next/server';

export default withAuth(
  function middleware(req) &#123;
    const token = req.nextauth.token;
    
    // Admin-only routes
    if (req.nextUrl.pathname.startsWith('/admin') && token?.role !== 'admin') &#123;
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    &#125;
    
    return NextResponse.next();
  &#125;,
  &#123;
    callbacks: &#123;
      authorized: (&#123; token &#125;) => !!token,
    &#125;,
  &#125;
);

// Server Component protection
import &#123; redirect &#125; from 'next/navigation';
import &#123; getServerSession &#125; from 'next-auth';

export default async function ProtectedPage() &#123;
  const session = await getServerSession();
  
  if (!session) &#123;
    redirect('/auth/signin');
  &#125;
  
  return <div>Protected content</div>;
&#125;`;

  jwtAuth = `// JWT Authentication

// lib/jwt.ts
import &#123; SignJWT, jwtVerify &#125; from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(payload: any) &#123;
  return await new SignJWT(payload)
    .setProtectedHeader(&#123; alg: 'HS256' &#125;)
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
&#125;

export async function verifyToken(token: string) &#123;
  try &#123;
    const &#123; payload &#125; = await jwtVerify(token, secret);
    return payload;
  &#125; catch (error) &#123;
    return null;
  &#125;
&#125;

// API Route with JWT
// app/api/login/route.ts
import &#123; createToken &#125; from '@/lib/jwt';

export async function POST(request: Request) &#123;
  const &#123; email, password &#125; = await request.json();
  
  const user = await verifyCredentials(email, password);
  
  if (!user) &#123;
    return Response.json(&#123; error: 'Invalid credentials' &#125;, &#123; status: 401 &#125;);
  &#125;
  
  const token = await createToken(&#123; userId: user.id, email: user.email &#125;);
  
  const response = Response.json(&#123; success: true &#125;);
  response.headers.set(
    'Set-Cookie',
    \`token=$&#123;token&#125;; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7200\`
  );
  
  return response;
&#125;

// Protected API Route
import &#123; verifyToken &#125; from '@/lib/jwt';

export async function GET(request: Request) &#123;
  const token = request.headers.get('cookie')?.split('token=')[1];
  
  if (!token) &#123;
    return Response.json(&#123; error: 'Unauthorized' &#125;, &#123; status: 401 &#125;);
  &#125;
  
  const payload = await verifyToken(token);
  
  if (!payload) &#123;
    return Response.json(&#123; error: 'Invalid token' &#125;, &#123; status: 401 &#125;);
  &#125;
  
  return Response.json(&#123; data: 'Protected data' &#125;);
&#125;`;

  oauthProviders = `// OAuth Provider Setup

// Google OAuth
import GoogleProvider from 'next-auth/providers/google';

providers: [
  GoogleProvider(&#123;
    clientId: process.env.GOOGLE_ID!,
    clientSecret: process.env.GOOGLE_SECRET!,
    authorization: &#123;
      params: &#123;
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      &#125;
    &#125;
  &#125;),
]

// GitHub OAuth
import GithubProvider from 'next-auth/providers/github';

providers: [
  GithubProvider(&#123;
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  &#125;),
]

// Facebook OAuth
import FacebookProvider from 'next-auth/providers/facebook';

providers: [
  FacebookProvider(&#123;
    clientId: process.env.FACEBOOK_ID!,
    clientSecret: process.env.FACEBOOK_SECRET!,
  &#125;),
]

// Custom OAuth Provider
import &#123; OAuthConfig &#125; from 'next-auth/providers';

providers: [
  &#123;
    id: 'custom',
    name: 'Custom Provider',
    type: 'oauth',
    authorization: &#123;
      url: 'https://provider.com/oauth/authorize',
      params: &#123; scope: 'openid email profile' &#125;,
    &#125;,
    token: 'https://provider.com/oauth/token',
    userinfo: 'https://provider.com/oauth/userinfo',
    clientId: process.env.CUSTOM_CLIENT_ID!,
    clientSecret: process.env.CUSTOM_CLIENT_SECRET!,
    profile(profile) &#123;
      return &#123;
        id: profile.sub,
        name: profile.name,
        email: profile.email,
      &#125;;
    &#125;,
  &#125; as OAuthConfig<any>,
]`;

  signInSignOut = `// Sign In and Sign Out Components

// Sign In Page
'use client';

import &#123; signIn &#125; from 'next-auth/react';
import &#123; useState &#125; from 'react';

export default function SignInPage() &#123;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => &#123;
    e.preventDefault();
    
    const result = await signIn('credentials', &#123;
      email,
      password,
      redirect: false,
    &#125;);
    
    if (result?.error) &#123;
      console.error(result.error);
    &#125; else &#123;
      window.location.href = '/dashboard';
    &#125;
  &#125;;

  return (
    <div>
      <h1>Sign In</h1>
      
      <form onSubmit=&#123;handleSubmit&#125;>
        <input
          type="email"
          value=&#123;email&#125;
          onChange=&#123;(e) => setEmail(e.target.value)&#125;
          placeholder="Email"
          required
        />
        <input
          type="password"
          value=&#123;password&#125;
          onChange=&#123;(e) => setPassword(e.target.value)&#125;
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      
      <hr />
      
      <button onClick=&#123;() => signIn('google')&#125;>
        Sign in with Google
      </button>
      <button onClick=&#123;() => signIn('github')&#125;>
        Sign in with GitHub
      </button>
    </div>
  );
&#125;

// Sign Out Button
'use client';

import &#123; signOut &#125; from 'next-auth/react';

export default function SignOutButton() &#123;
  return (
    <button onClick=&#123;() => signOut(&#123; callbackUrl: '/' &#125;)&#125;>
      Sign Out
    </button>
  );
&#125;`;

  roleBasedAccess = `// Role-Based Access Control

// Define user roles
type UserRole = 'user' | 'admin' | 'moderator';

// NextAuth configuration with roles
callbacks: &#123;
  async jwt(&#123; token, user &#125;) &#123;
    if (user) &#123;
      token.role = user.role;
    &#125;
    return token;
  &#125;,
  async session(&#123; session, token &#125;) &#123;
    if (session.user) &#123;
      session.user.role = token.role as UserRole;
    &#125;
    return session;
  &#125;,
&#125;

// Server Component - Check role
import &#123; getServerSession &#125; from 'next-auth';
import &#123; redirect &#125; from 'next/navigation';

export default async function AdminPage() &#123;
  const session = await getServerSession();
  
  if (session?.user?.role !== 'admin') &#123;
    redirect('/unauthorized');
  &#125;
  
  return <div>Admin Panel</div>;
&#125;

// Client Component - Check role
'use client';

import &#123; useSession &#125; from 'next-auth/react';

export default function RoleBasedContent() &#123;
  const &#123; data: session &#125; = useSession();
  
  if (session?.user?.role === 'admin') &#123;
    return <div>Admin content</div>;
  &#125;
  
  if (session?.user?.role === 'moderator') &#123;
    return <div>Moderator content</div>;
  &#125;
  
  return <div>User content</div>;
&#125;

// Middleware - Role checking
import &#123; withAuth &#125; from 'next-auth/middleware';
import &#123; NextResponse &#125; from 'next/server';

export default withAuth(
  function middleware(req) &#123;
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    if (path.startsWith('/admin') && token?.role !== 'admin') &#123;
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    &#125;
    
    return NextResponse.next();
  &#125;,
  &#123;
    callbacks: &#123;
      authorized: (&#123; token &#125;) => !!token,
    &#125;,
  &#125;
);`;

  passwordHashing = `// Password Hashing and Verification

// Install bcrypt: npm install bcrypt
// Install types: npm install -D @types/bcrypt

import bcrypt from 'bcrypt';

// Hash password
export async function hashPassword(password: string): Promise<string> &#123;
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
&#125;

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> &#123;
  return await bcrypt.compare(password, hashedPassword);
&#125;

// Registration API Route
// app/api/register/route.ts
import &#123; hashPassword &#125; from '@/lib/auth';

export async function POST(request: Request) &#123;
  const &#123; email, password, name &#125; = await request.json();
  
  // Validate input
  if (!email || !password || password.length < 8) &#123;
    return Response.json(&#123; error: 'Invalid input' &#125;, &#123; status: 400 &#125;);
  &#125;
  
  // Check if user exists
  const existingUser = await db.user.findUnique(&#123; where: &#123; email &#125; &#125;);
  if (existingUser) &#123;
    return Response.json(&#123; error: 'User already exists' &#125;, &#123; status: 400 &#125;);
  &#125;
  
  // Hash password
  const hashedPassword = await hashPassword(password);
  
  // Create user
  const user = await db.user.create(&#123;
    data: &#123;
      email,
      name,
      password: hashedPassword,
    &#125;,
  &#125;);
  
  return Response.json(&#123; success: true, userId: user.id &#125;);
&#125;

// Login with credentials
async function authorize(credentials: any) &#123;
  const user = await db.user.findUnique(&#123;
    where: &#123; email: credentials.email &#125;,
  &#125;);
  
  if (!user) return null;
  
  const isValid = await verifyPassword(credentials.password, user.password);
  
  if (!isValid) return null;
  
  return &#123; id: user.id, email: user.email, name: user.name &#125;;
&#125;`;
}
