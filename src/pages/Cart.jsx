import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
    id: 'mix-back-to-shopping',
    name: 'Voltar à loja',
    onClick: () => setGoToMain(true),
  };

  if(!products) return <div>Loading</div>;
  if(goToMain) return <Navigate to="/main" />;

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
          <h1>Não há produtos no seu carrinho</h1>
        </div>
      }
      <Button {...backToShoppingProps} />
      </div>
    </div>
  );
};


export default Cart;
