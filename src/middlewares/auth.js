import { decodeToken } from '../services/jwt.js'

export const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    console.log('No token provided')
    return res.status(403).json({ message: 'No token provided' })
  }

  try {
    console.log({ token })
    req.user = decodeToken(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    console.log('Error: ', err)
    return res.status(401).json({ message: 'Invalid token' })
  }
}
