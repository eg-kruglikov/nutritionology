require('dotenv').config();

const options = {
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
}

const { DB_HOST, DB_NAME, DB_PORT } = process.env
//console.log(process.env);

const dbConnectionURL =
process.env.NODE_ENV === 'production' ? process.env.mongoDBurl : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
// mongodb://localhost:27017/p1w3d3

const serverURL = 'http://localhost:3000'

module.exports = {
  dbConnectionURL,
  options,
  serverURL,
}
