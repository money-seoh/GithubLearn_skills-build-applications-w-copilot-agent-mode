import mongoose from 'mongoose'

export const connectionString = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

export async function connectDatabase(uri = connectionString) {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  await mongoose.connect(uri)
  console.log('Connected to octofit_db')
  return mongoose.connection
}

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

export default mongoose.connection
