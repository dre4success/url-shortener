import { Collection, Db, ObjectId } from 'mongodb'
import { getDb } from '../connections/db'
import { DBCollections } from '../connections/types'

interface Url {
  fullUrl: string
  shortUrl: string
  clicked?: number
  userId: ObjectId
}

class UrlModel {
  collection: Collection<Url>
  private db?: Db

  constructor(db?: Db) {
    this.db = db || getDb()
    this.collection = this.db.collection<Url>(DBCollections.URLS)
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
  public async deleteLongUrl(shortUrl: string, userId: ObjectId) {
    return this.collection.deleteOne({ userId, shortUrl })
  }
}

export default UrlModel
