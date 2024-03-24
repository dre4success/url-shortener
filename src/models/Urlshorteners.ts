import { Collection, Db, ObjectId } from 'mongodb'
import { getDb } from '../connections/db'

interface Url {
  fullUrl: string
  shortUrl: string
  clicked?: number
  userId: ObjectId
}

class UrlModel {
  private db: Db
  private collection: Collection<Url>

  constructor() {
    this.db = getDb()
    this.collection = this.db.collection<Url>('urls')
  }

  public async createUrl(params: Url) {
    return this.collection.insertOne(params)
  }

  public async isShortUrlUnique(shortUrl: string) {
    const data = await this.collection.findOne({ shortUrl })
    if (data) return false
    return true
  }

  public async findLongUrl(shortUrl: string) {
    return this.collection.findOne({ shortUrl })
  }

  public async updateClickCount(shortUrl: string) {
    return this.collection.updateOne(
      { shortUrl },
      { $inc: { clicked: 1 } },
      { upsert: true }
    )
  }
}

export default UrlModel
