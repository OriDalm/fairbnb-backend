import dotenv from 'dotenv'

dotenv.config()
const password = process.env.SECRET 
export default  {
  dbURL:`mongodb+srv://oridalm:${password}@fairbnb.yw2ugh3.mongodb.net/?retryWrites=true&w=majority`,
  dbName : 'stay_db'
}
