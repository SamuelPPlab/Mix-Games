const connection = require('./connection');

const collection = 'users';

const createUser = (name, email, password) => (
  connection().then((db) => (
    db.collection(collection).insertOne({ name, email, password })
  ))
);

const findUserByEmail = (email) => (
  connection().then((db) => (
    db.collection(collection).findOne({ email })
  ))
);

module.exports = {
  createUser,
  findUserByEmail,
};
