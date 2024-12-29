import { decodeToken } from '../services/jwt.js'

export const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'No token provided' })
  }
  try {
    req.user = decodeToken(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
