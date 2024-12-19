import Express from 'express'
import AppRouter from './routes/index.routes.js'

export const app = Express()

// For any request the response will formated as json
app.use(Express.json())

app.use('/api', AppRouter)
