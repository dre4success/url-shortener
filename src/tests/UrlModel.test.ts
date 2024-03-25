import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import UrlModel from '../models/Urlshorteners'
import { DBCollections } from '../connections/types'


describe('UrlModel', () => {
  let mongod: MongoMemoryServer
  let client: MongoClient
  let urlModel: UrlModel

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    client = new MongoClient(uri)
    await client.connect()
    const db = client.db(DBCollections.URLS)

    urlModel = new UrlModel(db)
  })

  afterAll(async () => {
    await client.close()
    await mongod.stop()
  })

  beforeEach(async () => {
    await urlModel.collection.deleteMany({})
  })

  it('should create and find a URL', async () => {
    const shortUrl = '45243ras'
    const fullUrl = 'https://example.com'
    const userId = new ObjectId()

    await urlModel.createUrl({ fullUrl, shortUrl, userId, clicked: 0 })
    const foundUrl = await urlModel.findLongUrl(shortUrl)

    expect(foundUrl).not.toBeNull()
    expect(foundUrl?.fullUrl).toBe(fullUrl)
    expect(foundUrl?.userId).toEqual(userId)
  })

  it('should correctly identify unique and non-unique short URLS', async () => {
    const existingShortUrl = 'exist123'
    const newShortUrl = 'new123'
    const fullUrl = 'https://example.com'
    const userId = new ObjectId()

    await urlModel.createUrl({
      fullUrl,
      shortUrl: existingShortUrl,
      userId,
      clicked: 0,
    })

    const isExistingUnique = await urlModel.isShortUrlUnique(existingShortUrl)
    expect(isExistingUnique).toBe(false)

    const isNewUique = await urlModel.isShortUrlUnique(newShortUrl)
    expect(isNewUique).toBe(true)
  })
})
