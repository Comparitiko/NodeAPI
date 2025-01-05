import { User } from '../models/user.js'
import { compareSync, hashSync } from 'bcrypt'
import { createToken } from '../services/jwt.js'

export class AuthController {
  // LoginPage method
  static async login (req, res) {
    const { email, password } = req.body

    // Check if user exists
    try {
      // Find user by email
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Incorrect email or password' })
      }

      // Check if password is correct
      const isPasswordCorrect = compareSync(password, user.password)
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect email or password' })
      }

      // Create JWT token
      const payload = { id: user._id.toString() }
      const token = createToken(payload)

      // Return response with user, token and message
      res.status(200).json({
        message: 'LoginPage successful',
        token,
        user: { username: user.username, email: user.email }
      })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Register method
  static async register (req, res) {
    const { username, email, password } = req.body

    // Check if user exists
    try {
      const userExists = await User.findOne({ username, email })
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    // Hash password
    const hashedPassword = hashSync(password, parseInt(process.env.SALT_ROUNDS))

    // Create new user
    const user = new User({ username, email, password: hashedPassword })

    // Save user to database
    try {
      await user.save()
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    // Create JWT token
    const payload = { id: user._id }
    const token = createToken(payload)

    // Return response with user, token and message
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { username, email }
    })
  }

  static async refresh (req, res) {
    const newToken = createToken({ id: req.user._id }, Math.floor(Date.now() + (7 * 24 * 60 * 60 * 1000))) // Create a new token with the expiry time of 7 days

    res.status(200).json({
      message: 'Refresh token successful',
      token: newToken
    })
  }
}
