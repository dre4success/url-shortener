import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { connectToDatabase } from './connections/db'
import { connectToRedis } from './connections/redisClient'
import urlShortenerRouter from './routes/urlShortener'
import userRouter from './routes/users'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', userRouter)
app.use('/', urlShortenerRouter)

const port = process.env.PORT || 7070

const startServer = async () => {
  await connectToDatabase()
  await connectToRedis()

  app.listen(port, () => {
    console.log(`listening on port: ${port}`)
  })
}

startServer().catch(console.error)
