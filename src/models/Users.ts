import { Db, Collection } from 'mongodb'
import bcrypt from 'bcrypt'
import { getDb } from '../connections/db'

interface Users {
  email: string
  password: string
}

class UserDetails {
  private db: Db
  private collection: Collection<Users>

  constructor() {
    this.db = getDb()
    this.collection = this.db.collection('users')
  }

  public async registerUser({ email, password }: Users) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return this.collection.insertOne({ email, password: hashedPassword })
  }

  public async login({ email, password }: Users) {
    const user = await this.collection.findOne({ email })
    if (!user) {
      throw new Error('Please check your details and try again')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new Error('Please check your details and try again')
    }
    return user._id
  }
}
