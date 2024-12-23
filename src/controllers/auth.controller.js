import { createToken } from '../services/jwt.js'

export class AuthController {
  // Login method
  static login (req, res) {

  }

  static register (req, res) {
    const token = createToken(1, 'comparitiko')
    res.json({ token })
  }
}
