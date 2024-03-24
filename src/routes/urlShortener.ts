import { Router } from 'express'
import { createShortUrl, redirectShortUrl } from '../controllers/shortener'
import { authCheck } from '../utils/middlewares'

const router = Router()

router.use(authCheck)
router.post('/shorten', createShortUrl)
router.get('/:shorturl', redirectShortUrl)

export default router
