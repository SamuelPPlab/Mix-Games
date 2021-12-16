const invalidEntries = {
  message: 'Invalid entries. Try again.',
};

const emailAlreadyExists = {
  message: 'Email already registered',
};

const mustFillAllFields = {
  message: 'All fields must be filled',
};

const wrongPassword = {
  message: 'Senha incorreta.',
};

const invalidToken = {
  message: 'jwt malformed',
};

const recipeNotFound = {
  message: 'recipe not found',
};

const noToken = {
  message: 'missing auth token',
};

const notYours = {
  message: 'you cannot edit a recipe that was not created by you',
};

const adminCreatesAdmin = {
  message: 'Only admins can register new admins',
};

const userNotRegistered = {
  message: 'Usuário não registrado.',
};

const noGameName = {
  message: 'O nome do jogo não pode ser vazio.',
};

const mustHaveStock = {
  message: 'Você precisa passar uma quantidade maior que zero.',
};

const noFreeGame = {
  message: 'O jogo não pode ser grátis.',
};

const noImageFound = {
  message: 'Digite o URL da imagem.',
};

const gameAlreadyRegistered = {
  message: 'Esse jogo já está registrado.',
};

const noGamesToSubtract = {
  message: 'Você tem que enviar pelo menos um jogo para ter o estoque subtraído.',
};

module.exports = {
  noGamesToSubtract,
  gameAlreadyRegistered,
  noImageFound,
  noFreeGame,
  mustHaveStock,
  noGameName,
  wrongPassword,
  userNotRegistered,
  invalidEntries,
  emailAlreadyExists,
  invalidToken,
  recipeNotFound,
  noToken,
  mustFillAllFields,
  notYours,
  adminCreatesAdmin,
};
