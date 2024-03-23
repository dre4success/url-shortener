import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { connectToDatabase } from './connections/db'
import { connectToRedis } from './connections/redisClient'
import urlShortenerRoute from './routes/urlShortener'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/', urlShortenerRoute)

const port = process.env.PORT || 8080

const startServer = async () => {
  await connectToDatabase()
  await connectToRedis()

  app.listen(port, () => {
    console.log(`listening on port: ${port}`)
  })
}

startServer().catch(console.error)
