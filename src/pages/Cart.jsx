import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import CheckoutTable from "../components/CheckoutTable";
import { getLocalStorageKey } from "../services/getKey";

const Cart = () => {
  const [products, setProducts] = useState(false);
  const [goToMain, setGoToMain] = useState(false);

  useEffect(() => {
    const itemsOnCart = getLocalStorageKey('mixCheckout');
    if(!products) {
      setProducts(itemsOnCart);
    }
  }, [products]);

  const backToShoppingProps = {
    id: 'mix-back-to-shoppig',
    name: 'Voltar à loja',
    onClick: () => setGoToMain(true),
  };

  if(!products) return <div>Loading</div>;
  if(goToMain) return <Navigate to="/main" />;

  return(
    <div id="checkoutContainer">
      {
        products.length > 0 && <CheckoutTable products={products} setProducts={setProducts} />
      }
      {
        products.length === 0 && <div>
          <h1>Não há produtos no seu carrinho</h1>
          <Button {...backToShoppingProps} />
        </div>
      }
    </div>
  );
};


export default Cart;
