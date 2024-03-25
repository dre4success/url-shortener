import { Request, Response } from 'express'
import UrlModel from '../models/Urlshorteners'
import { generateUniqueShortUrl } from '../utils/uniqueShortUrl'
import { getRedisClient } from '../connections/redisClient'

export const createShortUrl = async (req: Request, res: Response) => {
  const dbModel = new UrlModel()
  const { fullUrl } = req.body

  if (!fullUrl)
    return res.status(400).json({ message: 'Please submit your url' })
  try {
    const shortUrl = await generateUniqueShortUrl()
    await dbModel.createUrl({
      fullUrl,
      shortUrl,
      clicked: 0,
      userId: req.userId,
    })

    let fullShortUrl = `${req.protocol}://${req.get('host')}/${shortUrl}`
    return res.json({
      data: { fullShortUrl },
    })
  } catch (error) {
    console.error('Error processing your request:', error)
    return res.status(500).json({ message: 'Error processing your request' })
  }
}

export const redirectShortUrl = async (req: Request, res: Response) => {
  const { shorturl } = req.params
  const redisClient = getRedisClient()
  const dbModel = new UrlModel()
  try {
    const longUrl = await redisClient.get(shorturl)
    if (longUrl) {
      console.log(`cache hit: ${longUrl}`)
      dbModel.updateClickCount(shorturl)
      return res.redirect(longUrl)
    }
    console.log(`cache miss`)
    const data = await dbModel.findLongUrl(shorturl)
    if (data) {
      dbModel.updateClickCount(shorturl)
      await redisClient.set(shorturl, data.fullUrl, { EX: 3600 })
      return res.redirect(data.fullUrl)
    }

    return res.status(404).json({ message: 'Not Found' })
  } catch (error) {
    console.error('Error during redirect:', error)
    return res.status(500).json({ message: 'Error processing your request' })
  }
}

export const deleteShortUrl = async (req: Request, res: Response) => {
  try {
    const dbModel = new UrlModel()
    const redisClient = getRedisClient()

    const userId = req.userId
    const { shorturl } = req.params

    dbModel.deleteLongUrl(shorturl, userId)
    redisClient.del(shorturl)

    return res.status(200).json({ message: `successfully deleted` })
  } catch (error) {
    console.error('Error during redirect:', error)
    return res.status(500).json({ message: 'Error processing your request' })
  }
}
