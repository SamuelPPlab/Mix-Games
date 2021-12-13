import React, { useState } from "react";
import Button from "./Button";
import { removeGameFromCart } from "../services/localstorage";
import { Navigate } from "react-router-dom";

const CheckoutTable = ({ products, setProducts }) => {
  const [goToMain, setGoToMain] = useState(false);

  const removeItemFromCart = {
    name: 'X',
    id: 'mix-remove-game',
  };

  const handleRemoveClick = (game) => {
    removeGameFromCart(game);
    setProducts(products.filter((item) => item.game !== game));
  };

  const buyButonProps = {
    name: 'Comprar',
    id: 'mix-comprar',
  };

  const handlePurchaseClick = () => {
    setGoToMain(true);
    localStorage.setItem('mixCheckout', '[]');
  };

  let total = products.reduce((a, { price }) => (a + parseFloat(price)), 0).toFixed(2);
  total = total.split('.');

  if(goToMain) return <Navigate to="/main" />;

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
                <td>{parseFloat(price).toFixed(2)}</td>
                <td><Button {...removeItemFromCart} onClick={() => handleRemoveClick(game)} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <h3>Total: R$ {`${total[0]},${total[1]}`}</h3>
        <Button {...buyButonProps} onClick={handlePurchaseClick} />
      </div>
    </div>
  );
};

export default CheckoutTable;
