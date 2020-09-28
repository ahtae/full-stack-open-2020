require('dotenv').config();

let {PORT, MONGODB_URI, JWT_SECRET} = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET
};
