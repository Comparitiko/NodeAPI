import { connect } from 'mongoose'

export const connectDB = async () => {
  const { MONGODB_ROOT_USERNAME, MONGODB_ROOT_PASSWORD, MONGO_HOST } = process.env
  try {
    await connect(`mongodb://${MONGODB_ROOT_USERNAME}:${MONGODB_ROOT_PASSWORD}@${MONGO_HOST}`, {
      dbName: 'series'
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
  }
}
