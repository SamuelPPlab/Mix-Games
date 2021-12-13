import { getLocalStorageKey } from "./getKey";

export const saveGameData = (game, price, currency, stock, image) => {
  const productsInStock = getLocalStorageKey('gameStock');

  let formattedPrice = parseFloat(price).toFixed(2);
  formattedPrice = formattedPrice.split('.');

  const newGame = {
    game,
    formattedPrice: `${formattedPrice[0]},${formattedPrice[1]} ${currency}`,
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
