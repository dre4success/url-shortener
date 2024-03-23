import { Router } from 'express'
import { createShortUrl, redirectShortUrl } from '../controllers/shortener'

const router = Router()

router.post('/shorten', createShortUrl)
router.get('/:shorturl', redirectShortUrl)

export default router
