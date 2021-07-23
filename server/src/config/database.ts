import mongoose from 'mongoose'
import config from './envconfig'

export interface UserType {
  username: string,
  hash: string,
  salt: string
}

const { DB_URL } = config

const connection = mongoose.connect( DB_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String
})

export const User = mongoose.model<{username: string, hash: string, salt: string}>('User', UserSchema)

export default connection