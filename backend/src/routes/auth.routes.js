import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { validateData } from '../middlewares/validate-data.js'
import { loginSchema, registerSchema } from '../schemas/user.schemas.js'
import { auth } from '../middlewares/auth.js'

// URL: /api/auth

const router = Router()

router.post('/login', validateData(loginSchema), AuthController.login)
router.post('/register', validateData(registerSchema), AuthController.register)
router.post('/refresh', auth, AuthController.refresh)

export default router
