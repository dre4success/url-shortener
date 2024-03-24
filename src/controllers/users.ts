import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { validateEmail } from '../utils/validateEmail'
import UserDetails from '../models/Users'

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userModel = new UserDetails()

  if (!email || !validateEmail(email)) {
    return res.status(401).json({ message: `Please enter a valid email` })
  }
  if (!password) {
    return res.status(401).json({ message: `Please enter a valid password` })
  }
  const userCreated = await userModel.registerUser({ email, password })

  const token = jwt.sign(
    { userId: userCreated.insertedId },
    `${process.env.SECRET}`
  )
  res.json({ data: { token } })
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userModel = new UserDetails()

  if (!email || !validateEmail(email)) {
    return res.status(401).json({ message: `Please enter a valid email` })
  }
  if (!password) {
    return res.status(401).json({ message: `Please enter a valid password` })
  }
  const userId = await userModel.login({ email, password })
  const token = jwt.sign({ userId }, `${process.env.SECRET}`)
  res.json({ data: { token } })
}
