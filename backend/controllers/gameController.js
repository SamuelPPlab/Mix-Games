const { Router } = require('express');
const tokenVerifier = require('../auth/authenticationMiddleware');
const { addGame, findGameByName, getAllGames, subtractFromStock } = require('../models/gameModel');
const { BAD_REQUEST, SUCCESS, CONFLICT, CREATED } = require('../services/httpStatuses');
const { invalidEntries, noGameName, mustHaveStock, noFreeGame, noImageFound, gameAlreadyRegistered, noGamesToSubtract, gameRegistered, gamesSubtracted } = require('../services/messages');
const { fieldFinder } = require('../services/validators');

const GameController = new Router();

GameController.post('/create', tokenVerifier, async (req, res) => {
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

  const isGameRegistered = await findGameByName(gameName);

  if (!isGameRegistered) {
    await addGame({ gameName, quantity, price, image });
  
    return res.status(CREATED).json(gameRegistered);
  }
  
  return res.status(CONFLICT).json(gameAlreadyRegistered);
});

GameController.post('/checkout', async (req, res) => {
  const games = req.body;
  if (!games) {
    return res.status(BAD_REQUEST).json(noGamesToSubtract);
  }

  await Promise.all(games.map((game) => subtractFromStock(game)));

  return res.status(SUCCESS).json(gamesSubtracted);
});

GameController.get('/all', tokenVerifier, async (_req, res) => {
  const allGames = await getAllGames();
  return res.status(SUCCESS).json({ games: allGames });
});

module.exports = {
  GameController,
};
