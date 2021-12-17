import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import CheckoutTable from "../components/CheckoutTable";
import { getLocalStorageKey } from "../services/getKey";

const Cart = () => {
  const [products, setProducts] = useState(false);
  // Estado para guardar os itens adicionados ao carrinho

  const [goToMain, setGoToMain] = useState(false);
  // Estado para dar a opção de voltar para a tela de compra ao usuario

  useEffect(() => {
    // Função para buscar os produtos salvos no carrinho
    const itemsOnCart = getLocalStorageKey('mixCheckout');
    if(!products) {
      setProducts(itemsOnCart);
    }
  }, [products]);

  const backToShoppingProps = {
    id: 'mix-back-to-shopping',
    name: 'Voltar à loja',
    onClick: () => setGoToMain(true),
  };

  if (goToMain) return <Navigate to="/main" />;

  return(
    <div id="checkoutContainer">
      <div>
        <div>
        {
          products.length > 0 && <CheckoutTable products={products} setProducts={setProducts} />
        }
      </div>
      {
        products.length === 0 && <div>
          <h1 style={{ textAlign: 'center', marginLeft: '10%' }}>Não há produtos no seu carrinho</h1>
        </div>
      }
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <Button {...backToShoppingProps} />
      </div>
      </div>
    </div>
  );
};


export default Cart;
