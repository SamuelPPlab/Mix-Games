const { json } = require('express/lib/response');
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

const subtractFromStock = ({ gameName, quantity }) => {
  connection().then((db) => (
    db.collection(collection).updateOne(
      { gameName },
      { $set: { quantity: parseInt(quantity) - 1 } },
    )
  ))
};

module.exports = {
  subtractFromStock,
  getAllGames,
  addGame,
  findGameByName,
};
