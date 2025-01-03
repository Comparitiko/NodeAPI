import { Router } from 'express'
import AuthRouter from './auth.routes.js'
import SeriesRouter from './series.routes.js'
import ImagesRouter from './images.routes.js'

// URL: /api

const router = Router()

// Route to get the status of the api
router.get('/', (req, res) => {
  return res.json({ ok: true, message: 'API is running' })
})

// Set the routers
router.use('/auth', AuthRouter)
router.use('/series', SeriesRouter)
router.use('/images', ImagesRouter)

export default router
