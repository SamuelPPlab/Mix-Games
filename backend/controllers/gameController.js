const { Router } = require('express');
const { addGame } = require('../models/gameModel');
const { BAD_REQUEST, SUCCESS } = require('../services/httpStatuses');
const { invalidEntries, noGameName, mustHaveStock, noFreeGame, noImageFound } = require('../services/messages');
const { fieldFinder } = require('../services/validators');

const GameController = new Router();

GameController.post('/create', async (req, res) => {
  const { gameName, quantity, price, image } = req.body;
  const requiredFields = ['gameName', 'quantity', 'price', 'image'];
  const doRequiredFieldsExist = fieldFinder(req.body, requiredFields);

  if (!doRequiredFieldsExist) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  if (gameName === '') {
    return res.status(BAD_REQUEST).json(noGameName);
  }

  if (image === '') {
    return res.status(BAD_REQUEST).json(noImageFound);
  }

  if (quantity === '0') {
    return res.status(BAD_REQUEST).json(mustHaveStock);
  }

  if (price === '0') {
    return res.status(BAD_REQUEST).json(noFreeGame);
  }
  
  await addGame({ gameName, quantity, price, image });
  
  return res.status(SUCCESS).json();
});

module.exports = {
  GameController,
};
