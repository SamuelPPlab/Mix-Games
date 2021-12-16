const { Router } = require('express');
const { createUser, findUserByEmail } = require('../models/userModel');
const { fieldFinder, isEmailRegistered, emailValidator } = require('../services/validators');
const { BAD_REQUEST, CONFLICT, CREATED, SUCCESS } = require('../services/httpStatuses');
const { invalidEntries, emailAlreadyExists, userNotRegistered, wrongPassword } = require('../services/messages');
const tokenCreator = require('../auth/tokenCreator');

const UserController = new Router();

UserController.post('/create', async (req, res) => {
  const { email, password, userName } = req.body;
  const requiredFields = ['userName', 'password', 'email'];
  const doRequiredFieldsExist = fieldFinder(req.body, requiredFields);
  const isEmailValid = emailValidator(email);

  if (!doRequiredFieldsExist || !isEmailValid) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  const emailExists = await isEmailRegistered(email);

  if (emailExists) {
    return res.status(CONFLICT).json(emailAlreadyExists);
  }

  const { insertedId } = await createUser(userName, email, password);
  const user = { id: insertedId, userName, email, password };
  const token = tokenCreator(user);

  return res.status(CREATED).json({ token });
});

UserController.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userRegistered = await findUserByEmail(email);
  
  if (!userRegistered) {
    return res.status(BAD_REQUEST).json(userNotRegistered);
  }

  if (userRegistered.password !== password) {
    return res.status(BAD_REQUEST).json(wrongPassword);
  }

  const { _id: id } = userRegistered;

  const token = tokenCreator({ id, email, password });
  return res.status(SUCCESS).json({ token });
});

module.exports = UserController;
