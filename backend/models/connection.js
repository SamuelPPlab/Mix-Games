const { MongoClient } = require('mongodb');

const MONGO_DB_URL_WINDOWS = 'mongodb://localhost:27017/mix-games';
const MONGO_DB_URL_LINUX = 'mongodb://mongodb:27017/mix-games';
const DB_NAME = 'mix-games';

const connection = () => (
  MongoClient.connect(MONGO_DB_URL_WINDOWS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
);

module.exports = connection;
