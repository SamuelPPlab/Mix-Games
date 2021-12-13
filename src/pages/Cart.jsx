import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { getLocalStorageKey } from "../services/getKey";
import { removeGameFromCart } from "../services/localstorage";

const Cart = () => {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    const itemsOnCart = getLocalStorageKey('mixCheckout');
    if(!products) {
      setProducts(itemsOnCart);
    }
  }, [products]);

  const removeItemFromCart = {
    name: 'X',
    id: 'mix-remove-game',
  };

  const handleRemoveClick = (game) => {
    removeGameFromCart(game);
    setProducts(products.filter((item) => item.game !== game));
  };

  if(!products) return <div>Loading</div>;

  let total = products.reduce((a, { price }) => (a + parseFloat(price)), 0).toFixed(2);
  total = total.split('.');

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
            products.map(({game, formattedPrice}) => (
              <tr key={game}>
                <td>{game}</td>
                <td>{formattedPrice}</td>
                <td><Button {...removeItemFromCart} onClick={() => handleRemoveClick(game)} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <h3>Total: {`${total[0]},${total[1]}`}</h3>
    </div>
  );
};


export default Cart;
