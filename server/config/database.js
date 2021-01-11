require('dotenv').config();

const uri = process.env.DATABASE_URI;
const config = {
  dbName: process.env.DATABASE_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = {
  uri,
  config
};
