import { Router } from 'express'
import { SeriesController } from '../controllers/series.controller.js'

// URL: /api/series

const router = Router()

// Handle all routes of the series
router.get('/', SeriesController.getAll)
router.post('/', SeriesController.create)
router.put('/:id', SeriesController.updateById)
router.get('/toprated', SeriesController.getTopRated)
router.get('/genre/:genre', SeriesController.getOneByGenre)
router.get('/:id', SeriesController.getOneById)
router.delete('/:id', SeriesController.deleteOneById)

export default router
