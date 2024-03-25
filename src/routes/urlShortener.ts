import { Router } from 'express'
import {
  createShortUrl,
  deleteShortUrl,
  redirectShortUrl,
} from '../controllers/shortener'
import { authCheck } from '../utils/middlewares'

const router = Router()

router.post('/shorten', authCheck, createShortUrl)
router.get('/:shorturl', redirectShortUrl)
router.delete('/:shorturl', authCheck, deleteShortUrl)

export default router
