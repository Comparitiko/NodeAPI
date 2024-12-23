export class AuthController {
  // Login method
  static login (req, res) {

  }

  static register (req, res) {
    const { username, email, password } = req.body
    res.json({ username, email, password })
  }
}
