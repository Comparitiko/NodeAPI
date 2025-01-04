import jwt from 'jsonwebtoken'

// Create a token with the userId and username as payload using the secret key, the expiry time will be 1 hour
export const createToken = (payload, expiresIn = Math.floor(Date.now() + (60 * 60 * 1000))) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn }
  )
}

// Verify the token and return the decoded payload
export const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
