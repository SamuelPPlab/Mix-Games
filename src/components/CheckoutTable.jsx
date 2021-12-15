import React, { useState } from "react";
import Button from "./Button";
import { removeGameFromCart } from "../services/localstorage";
import { Navigate, Link } from "react-router-dom";
import '../css/styles.css';

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
    <div id="tableContainer">      
      <table style={{ width: '60vw' }}>
        <thead>
          <tr>
            <th className="tableHeading">Produto</th>
            <th className="tableHeading">Preço</th>
            <th className="tableHeading">Remover Game</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(({game, price}) => (
              <tr key={game}>
                <td>{game}</td>
                <td>R$ {parseFloat(price).toFixed(2)}</td>
                <td><Button {...removeItemFromCart} onClick={() => handleRemoveClick(game)} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <h3 style={{ position: 'relative', textAlign: 'end', fontSize: '2em', width: '50vw' }}>Total: R$ {`${total[0]},${total[1]}`}</h3>
      </div>
      <div style={{ width: '60%', display: 'flex', marginTop: '40px', marginLeft: '140px' }}>
        <Button {...buyButonProps} onClick={handlePurchaseClick} />
      </div>
    </div>
  );
};

export default CheckoutTable;
