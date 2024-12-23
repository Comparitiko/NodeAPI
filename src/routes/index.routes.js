import { Router } from 'express'
import AuthRouter from './auth.routes.js'
import SeriesRouter from './series.routes.js'
import { auth } from '../middlewares/auth.js'

// URL: /api

const router = Router()

// Route to get the status of the api
router.get('/', (req, res) => {
  return res.json({ ok: true })
})

// Set the routers
router.use('/auth', AuthRouter)
// Protect the series routes with the auth middleware
router.use('/series', [auth], SeriesRouter)

export default router
