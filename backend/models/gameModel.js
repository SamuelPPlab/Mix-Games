const connection = require('./connection');

const collection = 'stock';

const addGame = ({ gameName, price, quantity, image }) => (
  connection().then((db) => (
    db.collection(collection).insertOne({ gameName, price, quantity, image })
  ))
);

const findGameByName = (gameName) => (
  connection().then((db) => (
    db.collection(collection).findOne({ gameName })
  ))
);

const getAllGames = () => (
  connection().then((db) => (
    db.collection(collection).find().toArray()
  ))
);

module.exports = {
  getAllGames,
  addGame,
  findGameByName,
};
