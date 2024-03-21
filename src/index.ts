import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

const port = process.env.PORT || 8080

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'in default route' })
})

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
