import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: `Please login or signup` })
  }
  console.log({ secretInAuth: `${process.env.SECRET}`, token })
  const decoded = jwt.verify(token, `${process.env.SECRET}`) as JwtPayload
  const userId = decoded.userId
  req.userId = userId
  next()
}
