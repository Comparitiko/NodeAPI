import { setupApp } from './app.js'
import { connectDB } from './config/database.js'

// Load .env file
process.loadEnvFile('.env')

// Connect to MongoDB
await connectDB()

// Setup the app with the routes
const app = setupApp()

app.listen(3000, () => {
  console.log(`Server working on ${process.env.API_URL}/api`)
})
