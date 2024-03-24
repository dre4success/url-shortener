import { ObjectId } from 'mongodb'

export {}
declare global {
  namespace Express {
    export interface Request {
      userId: ObjectId
    }
  }
}
