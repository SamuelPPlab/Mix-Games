const connection = require('./connection');

const collection = 'stock';

const addGame = ({ gameName, price, quantity, image }) => (
  connection().then((db) => (
    db.collection(collection).insertOne({ gameName, price, quantity, image })
  ))
);

module.exports = {
  addGame,
};
