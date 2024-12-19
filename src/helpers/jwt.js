import jwt from 'jsonwebtoken'

export const createToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.JWT_SECRET)
}
