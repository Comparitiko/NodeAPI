import { Router } from 'express'
import { SeriesController } from '../controllers/series.controller.js'
import { auth } from '../middlewares/auth.js'
import { validateData } from '../middlewares/validate-data.js'
import { newSerieSchema, updateSerieRateSchema } from '../schemas/serie.schemas.js'

// URL: /api/series

const router = Router()

// Protect the series routes with the auth middleware
router.use(auth)

// Handle all routes of the series
router.get('/', SeriesController.getAll)
router.post('/', validateData(newSerieSchema), SeriesController.create)
router.put('/:id', validateData(updateSerieRateSchema), SeriesController.updateById)
router.get('/toprated', SeriesController.getTopRated)
router.get('/genre/:genre', SeriesController.getAllByGenre)
router.get('/:id', SeriesController.getOneById)
router.delete('/:id', SeriesController.deleteOneById)

export default router
