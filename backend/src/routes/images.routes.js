import { Router } from 'express'
import multer from 'multer'
import { ImageController } from '../controllers/image.controller.js'

// URL: /api/images

const router = Router()

// Configure Multer to handle file uploads
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('image'), ImageController.upload)

export default router
