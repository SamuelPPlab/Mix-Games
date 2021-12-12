import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { getLocalStorageKey } from "../services/getKey";
import { removeGameFromCart } from "../services/localstorage";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const itemsOnCart = getLocalStorageKey('mixCheckout');
    console.log(itemsOnCart)
    setProducts(itemsOnCart);
  }, [products]);

  const removeItemFromCart = {
    name: 'X',
    id: 'mix-remove-game',
  };

  const handleRemoveClick = (game) => {
    removeGameFromCart(game);
    setProducts(products.filter((item) => item.game !== game));
  };

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Remover Game</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(({game, price}) => (
              <tr key={game}>
                <td>{game}</td>
                <td>{price}</td>
                <Button {...removeItemFromCart} onClick={() => handleRemoveClick(game)} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};


export default Cart;
