import { getLocalStorageKey } from "./getKey";

export const saveGameData = (game, price, stock, image) => {
  const productsInStock = getLocalStorageKey('gameStock');

  let formattedPrice = parseFloat(price).toFixed(2);
  formattedPrice = formattedPrice.split('.');

  const newGame = {
    game,
    price,
    stock,
    image,
  };

  localStorage.setItem('gameStock', JSON.stringify([...productsInStock, newGame]))
};

export const removeGameFromCart = (game) => {
  let itemsOnCart = getLocalStorageKey('mixCheckout');
  itemsOnCart = itemsOnCart.filter((item) => (item.game !== game));
  localStorage.setItem('mixCheckout', JSON.stringify(itemsOnCart));
};
