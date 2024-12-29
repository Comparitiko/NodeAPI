import { app } from './app.js'
import { connectDB } from './config/database.js'

// Load .env file
process.loadEnvFile('.env')

// Connect to MongoDB
await connectDB()

app.listen(3000, () => {
  console.log(`Server working on ${process.env.HOST_URL}/api`)
})
