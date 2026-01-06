import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-nextjs-deployment',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-deployment.component.html',
  styleUrl: './nextjs-deployment.component.scss'
})
export class NextjsDeploymentComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  vercelDeployment = `// Deploying to Vercel (recommended)

// 1. Install Vercel CLI
// npm install -g vercel

// 2. Login to Vercel
// vercel login

// 3. Deploy from command line
// vercel

// 4. Deploy to production
// vercel --prod

// vercel.json configuration
&#123;
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": &#123;
    "DATABASE_URL": "@database-url"
  &#125;,
  "build": &#123;
    "env": &#123;
      "NEXT_PUBLIC_API_URL": "https://api.example.com"
    &#125;
  &#125;
&#125;

// Git integration:
// 1. Push to GitHub
// 2. Import project to Vercel
// 3. Auto-deploy on push
// 4. Preview deployments for PRs

// Benefits:
// - Zero configuration
// - Automatic HTTPS
// - Global CDN
// - Instant rollbacks
// - Preview deployments`;

  dockerDeployment = `// Docker Deployment

// Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

// next.config.js - Enable standalone
module.exports = &#123;
  output: 'standalone',
&#125;;

// docker-compose.yml
version: '3.8'
services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - NEXTAUTH_URL=http://localhost:3000
    restart: unless-stopped`;

  staticExport = `// Static Export (for static hosting)

// next.config.js
module.exports = &#123;
  output: 'export',
  images: &#123;
    unoptimized: true, // Required for static export
  &#125;,
  // Optional: Add trailing slashes
  trailingSlash: true,
&#125;;

// Build static site
// npm run build

// Output directory: out/
// Deploy to: GitHub Pages, Netlify, S3, etc.

// Limitations:
// - No API routes
// - No Server Components data fetching
// - No dynamic routes without generateStaticParams
// - No Image Optimization
// - No Middleware
// - No ISR/SSR

// Good for:
// - Documentation sites
// - Blogs
// - Marketing pages
// - Static portfolios

// GitHub Pages deployment
// package.json
&#123;
  "scripts": &#123;
    "build": "next build",
    "export": "next export",
    "deploy": "npm run build && npm run export && gh-pages -d out"
  &#125;
&#125;`;

  selfHosting = `// Self-Hosting with Node.js

// 1. Build the application
// npm run build

// 2. Start production server
// npm run start

// Custom server.js
const &#123; createServer &#125; = require('http');
const &#123; parse &#125; = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next(&#123; dev, hostname, port &#125;);
const handle = app.getRequestHandler();

app.prepare().then(() => &#123;
  createServer(async (req, res) => &#123;
    try &#123;
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    &#125; catch (err) &#123;
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    &#125;
  &#125;).listen(port, (err) => &#123;
    if (err) throw err;
    console.log(\`> Ready on http://$&#123;hostname&#125;:$&#123;port&#125;\`);
  &#125;);
&#125;);

// package.json
&#123;
  "scripts": &#123;
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  &#125;
&#125;

// With PM2 for process management
// pm2 start npm --name "nextjs" -- start
// pm2 save
// pm2 startup`;

  nginx = `// Nginx Reverse Proxy Configuration

// /etc/nginx/sites-available/nextjs
server &#123;
    listen 80;
    server_name example.com www.example.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
&#125;

server &#123;
    listen 443 ssl http2;
    server_name example.com www.example.com;
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    location / &#123;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    &#125;
    
    # Cache static files
    location /_next/static &#123;
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    &#125;
&#125;`;

  environmentVars = `// Environment Variables Setup

// .env.local (development)
DATABASE_URL=postgresql://localhost:5432/mydb
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

// .env.production (production)
DATABASE_URL=postgresql://prod-server:5432/mydb
NEXTAUTH_SECRET=production-secret
NEXTAUTH_URL=https://example.com
NEXT_PUBLIC_API_URL=https://api.example.com

// Accessing environment variables
// Server-side (any prefix)
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.NEXTAUTH_SECRET;

// Client-side (NEXT_PUBLIC_ prefix only)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// next.config.js - Environment variables
module.exports = &#123;
  env: &#123;
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  &#125;,
  // Or use built-in support (recommended)
&#125;;

// Vercel deployment
// 1. Go to Project Settings > Environment Variables
// 2. Add variables for Production/Preview/Development
// 3. Redeploy to apply changes

// Docker deployment
// Use docker-compose.yml or -e flags
services:
  nextjs:
    environment:
      - DATABASE_URL=$\&#123;DATABASE_URL\&#125;
      - NEXTAUTH_SECRET=$\&#123;NEXTAUTH_SECRET\&#125;`;

  cicd = `// CI/CD Pipeline Examples

// GitHub Actions - .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: $\&#123;\&#123; secrets.DATABASE_URL \&#125;\&#125;
          NEXTAUTH_SECRET: $\&#123;\&#123; secrets.NEXTAUTH_SECRET \&#125;\&#125;
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: $\&#123;\&#123; secrets.VERCEL_TOKEN \&#125;\&#125;
          vercel-org-id: $\&#123;\&#123; secrets.ORG_ID \&#125;\&#125;
          vercel-project-id: $\&#123;\&#123; secrets.PROJECT_ID \&#125;\&#125;
          vercel-args: '--prod'

// GitLab CI - .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
      - public/

deploy:
  stage: deploy
  script:
    - npm install -g vercel
    - vercel --token=$VERCEL_TOKEN --prod
  only:
    - main`;

  monitoring = `// Monitoring and Logging

// 1. Vercel Analytics
// app/layout.tsx
import &#123; Analytics &#125; from '@vercel/analytics/react';

export default function RootLayout(&#123; children &#125;) &#123;
  return (
    <html>
      <body>
        &#123;children&#125;
        <Analytics />
      </body>
    </html>
  );
&#125;

// 2. Sentry for Error Tracking
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init(&#123;
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
&#125;);

// 3. Custom Logging
// lib/logger.ts
export function log(level: string, message: string, data?: any) &#123;
  const logData = &#123;
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
  &#125;;
  
  // Send to logging service
  fetch('/api/logs', &#123;
    method: 'POST',
    body: JSON.stringify(logData),
  &#125;);
  
  console.log(logData);
&#125;

// 4. Health Check Endpoint
// app/api/health/route.ts
export async function GET() &#123;
  return Response.json(&#123;
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  &#125;);
&#125;`;
}
