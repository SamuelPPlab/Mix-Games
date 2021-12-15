const express = require('express');
const UserController = require('./controllers/userController');

const app = express();

const PORT = 3001;

app.use(express.json());

app.use('/users', UserController);

app.listen(PORT);
