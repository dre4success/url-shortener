import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

const client = createClient({ url: redisUrl })

client.on('error', (err) => console.log('Redis client error', err))

export const connectToRedis = async () => {
  await client.connect()
  console.log('Connected successfully to Redis')
}

export const getRedisClient = () => {
  if (!client.isOpen) {
    throw new Error('Redis client not connected.')
  }
  return client
}

export default client
