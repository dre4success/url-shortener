import { getDb } from '../connections/db'

interface Url {
  fullUrl: string
  shortUrl: string
  clicked?: number
}

export const createUrl = async (params: Url) => {
  const db = getDb()
  const urlCollection = db.collection<Url>('urls')
  return urlCollection.insertOne(params)
}
