import Express from 'express'
import AppRouter from './routes/index.routes.js'

export const app = Express()

// For any request the response will formated as json
app.use(Express.json())

// Disable the X-Powered-By header
app.disable('x-powered-by')

app.use('/api', AppRouter)

// If the request is not found, return a 404 error
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
