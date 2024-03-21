import { Db, MongoClient } from 'mongodb'

const url = process.env.MONGO_URI || 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'shortener'

let db: Db

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db
  }
  try {
    await client.connect()
    console.log('connected successfully to mongodb')
    db = client.db(dbName)
    return db
  } catch (error) {
    console.error('could not connect to db', error)
    process.exit(1)
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Please first connect to db')
  }
  return db
}

