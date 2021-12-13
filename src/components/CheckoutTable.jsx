import React from "react";
import Button from "./Button";
import { removeGameFromCart } from "../services/localstorage";

const CheckoutTable = ({ products }) => {
  const removeItemFromCart = {
    name: 'X',
    id: 'mix-remove-game',
  };

  const handleRemoveClick = (game) => {
    removeGameFromCart(game);
    setProducts(products.filter((item) => item.game !== game));
  };

  return(
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
  );
};

export default CheckoutTable;
