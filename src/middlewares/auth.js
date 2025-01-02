import { decodeToken } from '../services/jwt.js'
import { User } from '../models/user.js'

export const auth = async (req, res, next) => {
  // Get the token from the header
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  let tokenInfo

  // Get the token information
  try {
    tokenInfo = decodeToken(token, process.env.JWT_SECRET)
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Find the user and save in the request object
    const user = await User.findById(tokenInfo.id)

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = { id: user._id, email: user.email, username: user.username }
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' })
  }

  next()
}
