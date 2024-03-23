import { connectToDatabase, getDb } from './db'

async function createIndex(): Promise<void> {
  await connectToDatabase()

  const db = getDb()
  const urlCollection = db.collection('url')

  await urlCollection.createIndex({ shortUrl: 1 }, { unique: true })
  console.log('Indexes created successfully.')
}

createIndex()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error creating indexes:', error)
    process.exit(1)
  })
