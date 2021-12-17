import React, { useState } from "react";
import Button from "./Button";
import { removeGameFromCart } from "../services/localstorage";
import { Navigate } from "react-router-dom";
import '../css/styles.css';
import { getLocalStorageKey } from "../services/getKey";
import { buyGames } from "../apiIntegration/api";

const CheckoutTable = ({ products, setProducts }) => {
  const [goToLogin, setGoToLogin] = useState(false);
  // Estado para controlar se o usuario deve ser redirecionado para o login

  const [responseMessage, setResponseMessage] = useState(false);
  // Estado para guardar respostas da APi

  const removeItemFromCart = {
    name: 'X',
    id: 'mix-remove-game',
  };

  const handleRemoveClick = (gameName) => {
    // Função para remover um item do carrinho - tanto do estado quanto local storage
    removeGameFromCart(gameName);
    setProducts(products.filter((item) => item.gameName !== gameName));
  };

  const buyButonProps = {
    name: 'Comprar',
    id: 'mix-comprar',
  };

  const handlePurchaseClick = () => {
    // Função que limpa o carrinho, e regireciona para o login quando algo é "comprado"
    let cartItems = getLocalStorageKey('mixCheckout');
    cartItems = cartItems.map(({ gameName, quantity }) => ({ gameName, quantity }));

    buyGames(cartItems).then((r) => setResponseMessage(r.message));

    if (responseMessage === 'Jogos vendidos!') {
      localStorage.setItem('mixCheckout', '[]');
      localStorage.setItem('mixToken', '[]');
      return setGoToLogin(true);
    }
  };

  // Cálculo do total
  let total = products.reduce((a, { price }) => (a + parseFloat(price)), 0).toFixed(2);
  total = total.split('.');

  if(goToLogin) return <Navigate to="/" />;

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
            products.map(({gameName, price}) => (
              <tr key={gameName}>
                <td>{gameName}</td>
                <td>R$ {parseFloat(price).toFixed(2)}</td>
                <td><Button {...removeItemFromCart} onClick={() => handleRemoveClick(gameName)} /></td>
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
