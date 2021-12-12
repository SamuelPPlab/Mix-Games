import { getLocalStorageKey } from "./getKey";

export const saveGameData = (game, price, currency, stock, image) => {
  const productsInStock = getLocalStorageKey('gameStock');

  const newGame = {
    game,
    price: `${price} ${currency}`,
    stock,
    image,
  };

  localStorage.setItem('gameStock', JSON.stringify([...productsInStock, newGame]))
};
