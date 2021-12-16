const express = require('express');
const { GameController } = require('./controllers/gameController');
const UserController = require('./controllers/userController');
const cors = require('cors');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors({ origin: true }));

app.use('/users', UserController);
app.use('/games', GameController);

app.listen(PORT);
