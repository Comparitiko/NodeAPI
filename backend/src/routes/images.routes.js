import { Router } from 'express'
import { ImageController } from '../controllers/image.controller.js'
import multer from 'multer'

// URL: /api/images

const router = Router()

// Configure Multer to handle file uploads
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('image'), ImageController.upload)

export default router
