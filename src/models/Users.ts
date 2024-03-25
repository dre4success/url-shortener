import { Db, Collection } from 'mongodb'
import bcrypt from 'bcrypt'
import { getDb } from '../connections/db'
import { DBCollections } from '../connections/types'

interface Users {
  email: string
  password: string
}

class UserDetails {
  private db: Db
  collection: Collection<Users>

  constructor(db?: Db) {
    this.db = db || getDb()
    this.collection = this.db.collection(DBCollections.USERS)
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

export default UserDetails
