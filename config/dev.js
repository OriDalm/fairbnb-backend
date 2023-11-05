import dotenv from 'dotenv'

dotenv.config()
const mongoPassword = process.env.MONGO_URL

export default  {
  // dbURL: process.env.MONGO_URL,
  // dbURL: mongoPassword,
  dbURL:  `mongodb+srv://oridalm:${mongoPassword}@fairbnb.yw2ugh3.mongodb.net/?retryWrites=true&w=majority`,
  dbName : 'stay_db'
}
