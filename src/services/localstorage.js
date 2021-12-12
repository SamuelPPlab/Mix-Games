import { getLocalStorageKey } from "./getKey";

export const saveGameData = (game, price, currency, stock, image) => {
  const productsInStock = getLocalStorageKey('gameStock');

  let formattedPrice = parseFloat(price).toFixed(2);
  formattedPrice = formattedPrice.split('.');

  const newGame = {
    game,
    price: `${formattedPrice[0]},${formattedPrice[1]} ${currency}`,
    stock,
    image,
  };

  localStorage.setItem('gameStock', JSON.stringify([...productsInStock, newGame]))
};
