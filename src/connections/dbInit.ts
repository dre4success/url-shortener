import { connectToDatabase, getDb } from './db'
import { DBCollections } from './types'

async function createIndex(): Promise<void> {
  await connectToDatabase()

  const db = getDb()
  const urlCollection = db.collection(DBCollections.URLS)
  const userCollection = db.collection(DBCollections.USERS)

  await urlCollection.createIndex({ shortUrl: 1 }, { unique: true })
  await userCollection.createIndex({ email: 1 }, { unique: true })
  console.log('Indexes created successfully.')
}

createIndex()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error creating indexes:', error)
    process.exit(1)
  })
