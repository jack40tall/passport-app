import dotenv from 'dotenv'

dotenv.config()

const { SERVER_PORT, SECRET, DB_URL } = process.env

export default { SERVER_PORT, SECRET, DB_URL }