// Funções de validação

export const emailValidator = (email) => {
  return (/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i.test(email));
};

export const passwordLengthValidator = (password) => {
  const minPasswordLength = 8;
  return password.length >= minPasswordLength;
};

export const passwordMatcher = (password, confirmPassword) => (password === confirmPassword);

export const gameNameValidation = (gameName) => (gameName !== '');

export const numberValidation = (number) => (parseFloat(number) > 0);

