import React, { useEffect, useState } from "react";
import { getLocalStorageKey } from "../services/getKey";
import Button from "./Button";
import '../css/styles.css';

const GameCard = ({ data }) => {
  const { gameName, image, price, quantity } = data;
  // Propriedades de cada objeto de jogo

  const [isGameInCart, setGameInCart] = useState(false);
  // Estado para observar se o jogo está no carrinho.

  useEffect(() => {
    // Função para ver se o jogo está no carrinho
    const checkout = getLocalStorageKey('mixCheckout');
    const isItemInCart = checkout.find((item) => item.gameName === gameName);
    if (quantity === 0) {
      // Condicional para negar a compra de itens sem estoque
      setGameInCart(true);
    }

    if (isItemInCart) {
      setGameInCart(true);
    }
  }, [isGameInCart, gameName]);

  const addToCartButtonProps = {
    name: 'Adicionar ao carrinho',
    id: 'mix-add-to-cart',
    onClick: () => {
      // Função para adicionar o jogo ao carrinho no local storage
      setGameInCart(true);
      const shoppingCart = getLocalStorageKey('mixCheckout');
      localStorage.setItem('mixCheckout', JSON.stringify([...shoppingCart, data]));
    },
    disabled: isGameInCart,
  };

  return (
    <div className="gameCardContainer">
      <img src={image} alt="Capa do jogo." className="gameImage"/>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'space-between' }}>
        <h1>{gameName}</h1>
        <p>Quantidade em estoque: {quantity};</p>
        <h3>R$: {parseFloat(price).toFixed(2)};</h3>
      </div>
      <Button {...addToCartButtonProps} />
    </div>
  );
};

export default GameCard;
