import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-mongodb-gettingstarted',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './mongodb-gettingstarted.component.html',
  styleUrl: './mongodb-gettingstarted.component.scss'
})
export class MongodbGettingstartedComponent {
  prerequisites = `Prerequisites for MongoDB

1. Basic Database Knowledge
   - Understanding of databases
   - SQL vs NoSQL concepts
   - CRUD operations

2. Development Environment
   - Node.js installed
   - Command line basics
   - Code editor

3. MongoDB Installation Options
   - MongoDB Community Server (local)
   - MongoDB Atlas (cloud)
   - Docker container`;

  installation = `Installing MongoDB

# Method 1: MongoDB Community Server
# Download from: https://www.mongodb.com/try/download/community

# Windows - Use installer
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
# Windows - Service starts automatically
# macOS
brew services start mongodb-community
# Linux
sudo systemctl start mongod

# Verify Installation
mongo --version

# Method 2: MongoDB Atlas (Cloud)
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up for free tier
3. Create a cluster
4. Get connection string

# Method 3: Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest`;

  nodeDriver = `MongoDB Node.js Driver

# Install MongoDB driver
npm install mongodb

# Basic Connection
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const database = client.db('mydb');
    const collection = database.collection('users');
    
    // Insert document
    const result = await collection.insertOne({
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Inserted ID:', result.insertedId);
    
    // Find documents
    const users = await collection.find({}).toArray();
    console.log(users);
    
  } finally {
    await client.close();
  }
}

connect().catch(console.error);`;

  basicOperations = `Basic CRUD Operations

// CREATE
// Insert one document
await collection.insertOne({
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
});

// Insert multiple documents
await collection.insertMany([
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
]);

// READ
// Find all documents
const allUsers = await collection.find({}).toArray();

// Find with filter
const adults = await collection.find({ age: { $gte: 18 } }).toArray();

// Find one document
const user = await collection.findOne({ name: 'Alice' });

// UPDATE
// Update one document
await collection.updateOne(
  { name: 'Alice' },
  { $set: { age: 26 } }
);

// Update multiple documents
await collection.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: 'young' } }
);

// DELETE
// Delete one document
await collection.deleteOne({ name: 'Bob' });

// Delete multiple documents
await collection.deleteMany({ age: { $lt: 18 } });`;

  dataModel = `MongoDB Data Model

// Document Structure
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001"
  },
  hobbies: ["reading", "coding", "gaming"],
  createdAt: ISODate("2024-01-15T10:30:00Z")
}

// Data Types
- String: "text"
- Number: 123, 45.67
- Boolean: true, false
- Date: ISODate("2024-01-15")
- ObjectId: ObjectId("...")
- Array: [1, 2, 3]
- Object: { key: "value" }
- Null: null

// Best Practices
1. Design for query patterns
2. Use embedded documents for 1-to-few
3. Use references for 1-to-many
4. Avoid deeply nested documents
5. Index frequently queried fields`;

  queryOperators = `Query Operators

// Comparison Operators
{ age: { $eq: 25 } }         // Equal
{ age: { $ne: 25 } }         // Not equal
{ age: { $gt: 25 } }         // Greater than
{ age: { $gte: 25 } }        // Greater than or equal
{ age: { $lt: 30 } }         // Less than
{ age: { $lte: 30 } }        // Less than or equal
{ age: { $in: [25, 30] } }   // In array
{ age: { $nin: [25, 30] } }  // Not in array

// Logical Operators
{ $and: [{ age: { $gte: 18 } }, { age: { $lte: 65 } }] }
{ $or: [{ name: "John" }, { name: "Jane" }] }
{ $not: { age: { $lt: 18 } } }
{ $nor: [{ age: { $lt: 18 } }, { status: "inactive" }] }

// Element Operators
{ field: { $exists: true } }     // Field exists
{ field: { $type: "string" } }   // Field type

// Array Operators
{ tags: { $all: ["tech", "coding"] } }  // Contains all
{ tags: { $elemMatch: { $gt: 10 } } }    // Element match
{ tags: { $size: 3 } }                   // Array size`;

  indexing = `Indexing in MongoDB

// Create Index
await collection.createIndex({ email: 1 });  // Ascending
await collection.createIndex({ age: -1 });   // Descending

// Compound Index
await collection.createIndex({ name: 1, age: -1 });

// Unique Index
await collection.createIndex(
  { email: 1 },
  { unique: true }
);

// Text Index
await collection.createIndex({ description: "text" });

// List Indexes
const indexes = await collection.indexes();
console.log(indexes);

// Drop Index
await collection.dropIndex("email_1");

// Index Best Practices
1. Index fields used in queries
2. Index fields used for sorting
3. Use compound indexes wisely
4. Monitor index performance
5. Avoid too many indexes`;

  bestPractices = `MongoDB Best Practices

1. Connection Pooling
   const client = new MongoClient(uri, {
     maxPoolSize: 10,
     minPoolSize: 5
   });

2. Error Handling
   try {
     await collection.insertOne(doc);
   } catch (error) {
     if (error.code === 11000) {
       console.log('Duplicate key error');
     }
   }

3. Use Projection
   // Only get needed fields
   const users = await collection
     .find({})
     .project({ name: 1, email: 1 })
     .toArray();

4. Pagination
   const page = 1;
   const limit = 10;
   const users = await collection
     .find({})
     .skip((page - 1) * limit)
     .limit(limit)
     .toArray();

5. Validation
   await db.createCollection('users', {
     validator: {
       $jsonSchema: {
         required: ['name', 'email'],
         properties: {
           email: {
             bsonType: 'string',
             pattern: '^.+@.+$'
           }
         }
       }
     }
   });

6. Transactions (for multi-document)
   const session = client.startSession();
   try {
     await session.withTransaction(async () => {
       await collection1.updateOne({}, {}, { session });
       await collection2.updateOne({}, {}, { session });
     });
   } finally {
     await session.endSession();
   }`;
}
