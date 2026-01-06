import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-nextjs-database',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nextjs-database.component.html',
  styleUrl: './nextjs-database.component.scss'
})
export class NextjsDatabaseComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  prismaSetup = `// Prisma ORM Setup
// npm install prisma @prisma/client
// npx prisma init

// prisma/schema.prisma
generator client &#123;
  provider = "prisma-client-js"
&#125;

datasource db &#123;
  provider = "postgresql"
  url      = env("DATABASE_URL")
&#125;

model User &#123;
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
&#125;

model Post &#123;
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
&#125;

// .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

// Generate Prisma Client
// npx prisma generate

// Run migrations
// npx prisma migrate dev --name init`;

  prismaClient = `// Prisma Client Setup

// lib/prisma.ts
import &#123; PrismaClient &#125; from '@prisma/client';

const globalForPrisma = globalThis as unknown as &#123;
  prisma: PrismaClient | undefined;
&#125;;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(&#123;
    log: ['query', 'error', 'warn'],
  &#125;);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Prevents multiple instances in development

// Usage in Server Component
import &#123; prisma &#125; from '@/lib/prisma';

async function getUsers() &#123;
  const users = await prisma.user.findMany(&#123;
    include: &#123;
      posts: true,
    &#125;,
  &#125;);
  return users;
&#125;

export default async function UsersPage() &#123;
  const users = await getUsers();
  
  return (
    <div>
      &#123;users.map(user => (
        <div key=&#123;user.id&#125;>
          <h2>&#123;user.name&#125;</h2>
          <p>Posts: &#123;user.posts.length&#125;</p>
        </div>
      ))&#125;
    </div>
  );
&#125;`;

  crudOperations = `// CRUD Operations with Prisma

// CREATE
async function createUser(email: string, name: string, password: string) &#123;
  const user = await prisma.user.create(&#123;
    data: &#123;
      email,
      name,
      password,
    &#125;,
  &#125;);
  return user;
&#125;

// READ - Find one
async function getUser(id: string) &#123;
  const user = await prisma.user.findUnique(&#123;
    where: &#123; id &#125;,
    include: &#123;
      posts: &#123;
        where: &#123; published: true &#125;,
      &#125;,
    &#125;,
  &#125;);
  return user;
&#125;

// READ - Find many with filters
async function getUsers(skip: number = 0, take: number = 10) &#123;
  const users = await prisma.user.findMany(&#123;
    skip,
    take,
    where: &#123;
      email: &#123;
        contains: '@example.com',
      &#125;,
    &#125;,
    orderBy: &#123;
      createdAt: 'desc',
    &#125;,
    select: &#123;
      id: true,
      email: true,
      name: true,
      _count: &#123;
        select: &#123; posts: true &#125;,
      &#125;,
    &#125;,
  &#125;);
  return users;
&#125;

// UPDATE
async function updateUser(id: string, data: &#123; name?: string; email?: string &#125;) &#123;
  const user = await prisma.user.update(&#123;
    where: &#123; id &#125;,
    data,
  &#125;);
  return user;
&#125;

// DELETE
async function deleteUser(id: string) &#123;
  const user = await prisma.user.delete(&#123;
    where: &#123; id &#125;,
  &#125;);
  return user;
&#125;

// UPSERT (Create or Update)
async function upsertUser(email: string, name: string) &#123;
  const user = await prisma.user.upsert(&#123;
    where: &#123; email &#125;,
    update: &#123; name &#125;,
    create: &#123; email, name, password: 'default' &#125;,
  &#125;);
  return user;
&#125;`;

  apiRoutes = `// Database Operations in API Routes

// app/api/users/route.ts
import &#123; prisma &#125; from '@/lib/prisma';
import &#123; NextResponse &#125; from 'next/server';

// GET all users
export async function GET(request: Request) &#123;
  try &#123;
    const &#123; searchParams &#125; = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const users = await prisma.user.findMany(&#123;
      skip: (page - 1) * limit,
      take: limit,
      select: &#123;
        id: true,
        email: true,
        name: true,
        createdAt: true,
      &#125;,
    &#125;);
    
    const total = await prisma.user.count();
    
    return NextResponse.json(&#123;
      users,
      pagination: &#123;
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      &#125;,
    &#125;);
  &#125; catch (error) &#123;
    return NextResponse.json(
      &#123; error: 'Failed to fetch users' &#125;,
      &#123; status: 500 &#125;
    );
  &#125;
&#125;

// POST create user
export async function POST(request: Request) &#123;
  try &#123;
    const body = await request.json();
    const &#123; email, name, password &#125; = body;
    
    const user = await prisma.user.create(&#123;
      data: &#123; email, name, password &#125;,
      select: &#123; id: true, email: true, name: true &#125;,
    &#125;);
    
    return NextResponse.json(user, &#123; status: 201 &#125;);
  &#125; catch (error) &#123;
    return NextResponse.json(
      &#123; error: 'Failed to create user' &#125;,
      &#123; status: 500 &#125;
    );
  &#125;
&#125;

// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  &#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;
) &#123;
  const user = await prisma.user.findUnique(&#123;
    where: &#123; id: params.id &#125;,
    include: &#123; posts: true &#125;,
  &#125;);
  
  if (!user) &#123;
    return NextResponse.json(&#123; error: 'User not found' &#125;, &#123; status: 404 &#125;);
  &#125;
  
  return NextResponse.json(user);
&#125;

export async function PUT(
  request: Request,
  &#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;
) &#123;
  const body = await request.json();
  
  const user = await prisma.user.update(&#123;
    where: &#123; id: params.id &#125;,
    data: body,
  &#125;);
  
  return NextResponse.json(user);
&#125;

export async function DELETE(
  request: Request,
  &#123; params &#125;: &#123; params: &#123; id: string &#125; &#125;
) &#123;
  await prisma.user.delete(&#123;
    where: &#123; id: params.id &#125;,
  &#125;);
  
  return NextResponse.json(&#123; success: true &#125;);
&#125;`;

  relations = `// Working with Relations

// One-to-Many: User has many Posts
const userWithPosts = await prisma.user.findUnique(&#123;
  where: &#123; id: userId &#125;,
  include: &#123;
    posts: &#123;
      where: &#123; published: true &#125;,
      orderBy: &#123; createdAt: 'desc' &#125;,
    &#125;,
  &#125;,
&#125;);

// Create with relations
const user = await prisma.user.create(&#123;
  data: &#123;
    email: 'user@example.com',
    name: 'John Doe',
    password: 'hashed',
    posts: &#123;
      create: [
        &#123; title: 'First Post', content: 'Content...' &#125;,
        &#123; title: 'Second Post', content: 'More content...' &#125;,
      ],
    &#125;,
  &#125;,
  include: &#123;
    posts: true,
  &#125;,
&#125;);

// Many-to-Many: Posts and Categories
model Post &#123;
  id         String     @id @default(cuid())
  title      String
  categories Category[]
&#125;

model Category &#123;
  id    String @id @default(cuid())
  name  String
  posts Post[]
&#125;

// Query with many-to-many
const post = await prisma.post.findUnique(&#123;
  where: &#123; id: postId &#125;,
  include: &#123;
    categories: true,
  &#125;,
&#125;);

// Connect existing relations
await prisma.post.update(&#123;
  where: &#123; id: postId &#125;,
  data: &#123;
    categories: &#123;
      connect: [&#123; id: categoryId1 &#125;, &#123; id: categoryId2 &#125;],
    &#125;,
  &#125;,
&#125;);`;

  transactions = `// Database Transactions

// Sequential transactions
const result = await prisma.$transaction(async (tx) => &#123;
  // Create user
  const user = await tx.user.create(&#123;
    data: &#123;
      email: 'user@example.com',
      name: 'John Doe',
      password: 'hashed',
    &#125;,
  &#125;);
  
  // Create post for user
  const post = await tx.post.create(&#123;
    data: &#123;
      title: 'First Post',
      content: 'Content...',
      authorId: user.id,
    &#125;,
  &#125;);
  
  // Update user post count
  await tx.user.update(&#123;
    where: &#123; id: user.id &#125;,
    data: &#123;
      // Custom field
    &#125;,
  &#125;);
  
  return &#123; user, post &#125;;
&#125;);

// Batch transactions
await prisma.$transaction([
  prisma.user.create(&#123; data: &#123; email: 'user1@example.com', password: 'hash' &#125; &#125;),
  prisma.user.create(&#123; data: &#123; email: 'user2@example.com', password: 'hash' &#125; &#125;),
  prisma.user.create(&#123; data: &#123; email: 'user3@example.com', password: 'hash' &#125; &#125;),
]);

// Transaction with timeout and isolation level
await prisma.$transaction(
  async (tx) => &#123;
    // Transaction operations
  &#125;,
  &#123;
    maxWait: 5000, // 5 seconds
    timeout: 10000, // 10 seconds
    isolationLevel: 'Serializable',
  &#125;
);`;

  migrations = `// Database Migrations

// Create a migration
// npx prisma migrate dev --name add_user_role

// Apply migrations in production
// npx prisma migrate deploy

// Reset database (development only)
// npx prisma migrate reset

// Migration file example: migrations/20240101000000_add_user_role/migration.sql
-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- AlterTable
ALTER TABLE "User" 
  ALTER COLUMN "role" TYPE "Role" 
  USING ("role"::text::"Role");

// Schema changes
model User &#123;
  id       String @id @default(cuid())
  email    String @unique
  name     String?
  password String
  role     Role   @default(USER)
  posts    Post[]
&#125;

enum Role &#123;
  USER
  ADMIN
  MODERATOR
&#125;

// Seed database
// prisma/seed.ts
import &#123; PrismaClient &#125; from '@prisma/client';

const prisma = new PrismaClient();

async function main() &#123;
  const users = await Promise.all([
    prisma.user.create(&#123;
      data: &#123;
        email: 'admin@example.com',
        name: 'Admin User',
        password: 'hashed',
        role: 'ADMIN',
      &#125;,
    &#125;),
    prisma.user.create(&#123;
      data: &#123;
        email: 'user@example.com',
        name: 'Regular User',
        password: 'hashed',
        role: 'USER',
      &#125;,
    &#125;),
  ]);
  
  console.log('Seeded users:', users);
&#125;

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

// package.json
&#123;
  "prisma": &#123;
    "seed": "ts-node --compiler-options &#123;\\"module\\":\\"CommonJS\\"&#125; prisma/seed.ts"
  &#125;
&#125;

// Run seed: npx prisma db seed`;

  connectionPooling = `// Connection Pooling

// Direct connection (development)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

// Connection pooling (production)
DATABASE_URL="postgresql://user:password@host:5432/mydb?pgbouncer=true&connection_limit=1"

// Prisma with connection pooling
datasource db &#123;
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // For migrations
&#125;

// Environment variables
DATABASE_URL="postgresql://user:password@pooler.host:6543/mydb?pgbouncer=true"
DIRECT_URL="postgresql://user:password@direct.host:5432/mydb"

// Configure pool size
const prisma = new PrismaClient(&#123;
  datasources: &#123;
    db: &#123;
      url: process.env.DATABASE_URL,
    &#125;,
  &#125;,
&#125;);

// Connection limits in Vercel
// Use transaction mode with PgBouncer
// Set connection_limit=1 in production

// Serverless connection management
import &#123; PrismaClient &#125; from '@prisma/client';

declare global &#123;
  var prisma: PrismaClient | undefined;
&#125;

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') &#123;
  global.prisma = prisma;
&#125;

// Close connections gracefully
process.on('beforeExit', async () => &#123;
  await prisma.$disconnect();
&#125;);`;

  advancedQueries = `// Advanced Prisma Queries

// Full-text search
const results = await prisma.post.findMany(&#123;
  where: &#123;
    OR: [
      &#123; title: &#123; contains: 'nextjs', mode: 'insensitive' &#125; &#125;,
      &#123; content: &#123; contains: 'nextjs', mode: 'insensitive' &#125; &#125;,
    ],
  &#125;,
&#125;);

// Aggregation
const stats = await prisma.user.aggregate(&#123;
  _count: &#123; id: true &#125;,
  _avg: &#123; age: true &#125;,
  _sum: &#123; posts: true &#125;,
  _min: &#123; createdAt: true &#125;,
  _max: &#123; createdAt: true &#125;,
&#125;);

// Group by
const usersByRole = await prisma.user.groupBy(&#123;
  by: ['role'],
  _count: &#123; id: true &#125;,
  having: &#123;
    id: &#123;
      _count: &#123;
        gt: 5,
      &#125;,
    &#125;,
  &#125;,
&#125;);

// Raw SQL queries
const users = await prisma.$queryRaw\`
  SELECT * FROM "User"
  WHERE "email" LIKE '%@example.com'
  LIMIT 10
\`;

// Execute raw SQL
await prisma.$executeRaw\`
  UPDATE "User"
  SET "lastLogin" = NOW()
  WHERE "id" = $&#123;userId&#125;
\`;

// Nested writes
await prisma.user.update(&#123;
  where: &#123; id: userId &#125;,
  data: &#123;
    posts: &#123;
      updateMany: &#123;
        where: &#123; published: false &#125;,
        data: &#123; published: true &#125;,
      &#125;,
    &#125;,
  &#125;,
&#125;);

// Select with computed fields
const users = await prisma.$queryRaw\`
  SELECT 
    u.*,
    COUNT(p.id) as "postCount"
  FROM "User" u
  LEFT JOIN "Post" p ON u.id = p."authorId"
  GROUP BY u.id
\\`;
}

