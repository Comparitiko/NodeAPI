import Express from 'express'
import AppRouter from './routes/index.routes.js'
import { User } from './models/user.js'

export const app = Express()

// For any request the response will formated as json
app.use(Express.json())

app.use('/api', AppRouter)

User.create({
  username: 'gabriel',
  email: 'gabriel@gabriel.com',
  password: 'gabriel123'
})

