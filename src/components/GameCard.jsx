import React, { useEffect, useState } from "react";
import { getLocalStorageKey } from "../services/getKey";
import Button from "./Button";

const GameCard = ({ data }) => {
  const { game, image, price, stock } = data;

  const [isGameInCart, setGameInCart] = useState(false);

  useEffect(() => {
    const checkout = getLocalStorageKey('mixCheckout');
    const isItemInCart = checkout.find((item) => item.game === game);

    if(isItemInCart) {
      setGameInCart(true);
    }
  }, [isGameInCart]);

  const addToCartButtonProps = {
    name: 'Adicionar ao carrinho',
    id: 'mix-add-to-cart',
    onClick: () => {
      setGameInCart(true);
      const shoppingCart = getLocalStorageKey('mixCheckout');
      localStorage.setItem('mixCheckout', JSON.stringify([...shoppingCart, data]));
    },
    disabled: isGameInCart,
  };

  return <div style={{ width: '300px', height: '400px', margin: '20px' }}>
    <img src={image} alt="Capa do jogo." style={{ width: '300px', height: '190px' }} />
    <h1>{game}</h1>
    <p>Quantidade em estoque: {stock}</p>
    <h3>Preço: {price}</h3>
    <Button {...addToCartButtonProps} />
  </div>
};

export default GameCard;
