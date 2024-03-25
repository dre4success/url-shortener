import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import UserDetails from '../models/Users'
import { DBCollections } from '../connections/types'

jest.mock('bcrypt')

describe('UserDetails', () => {
  let mongod: MongoMemoryServer
  let client: MongoClient
  let userDetails: UserDetails

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    client = new MongoClient(uri)
    await client.connect()
    const db = client.db(DBCollections.USERS)

    userDetails = new UserDetails(db)
  })

  afterAll(async () => {
    await client.close()
    await mongod.stop()
  })

  beforeEach(async () => {
    await userDetails.collection.deleteMany({})
  })

  it('should register a user with a hashed password', async () => {
    const bcryptHash = bcrypt.hash as jest.Mock
    bcryptHash.mockResolvedValue('hashed_password')

    const email = 'test@example.com'
    const password = 'password123'

    await userDetails.registerUser({ email, password })

    const userInDb = await userDetails.collection.findOne({ email })
    expect(userInDb).not.toBeNull()
    expect(userInDb?.password).toBe('hashed_password')
    expect(bcryptHash).toHaveBeenCalledWith(password, 10)
  })

  it('should allow a user to login with correct credentials', async () => {
    const bcryptCompare = bcrypt.compare as jest.Mock
    bcryptCompare.mockResolvedValue(true)

    const email = 'login@example.com'
    const password = 'login123'

    await userDetails.collection.insertOne({
      email,
      password: await bcrypt.hash(password, 10),
    })

    const userId = await userDetails.login({ email, password })
    expect(userId).toBeDefined()
  })

  it('should throw an error if login details are incorrect', async () => {
    expect.assertions(1)
    const email = 'wrong@example.com'
    const password = 'wrong123'

    try {
      await userDetails.login({ email, password })
    } catch (e: any) {
      expect(e.message).toBe('Please check your details and try again')
    }
  })
})
