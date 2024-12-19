import { connect } from 'mongoose'

export const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URL, {
      dbName: 'series',
      useNewUrlParser: true,
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}