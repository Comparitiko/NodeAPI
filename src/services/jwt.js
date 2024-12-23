import jwt from 'jsonwebtoken'

// Create a token with the userId and username as payload using the secret key
export const createToken = (user, expiresIn = '1h') => {
  const { userId, username } = user
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET,
    { expiresIn }
  )
}

// Verify the token and return the decoded payload
export const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
