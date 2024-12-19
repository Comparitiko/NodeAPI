import { Router } from 'express'
import AuthRouter from './auth.routes.js'
import SeriesRouter from './series.routes.js'

// URL: /api

const router = Router()

// Route to get if the api is working
router.get('/', (req, res) => {
  return res.json({ ok: true })
})

// Set the routers
router.use('/auth', AuthRouter)
router.use('/series', SeriesRouter)

export default router
