import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import CheckoutTable from "../components/CheckoutTable";
import { getLocalStorageKey } from "../services/getKey";

const Cart = () => {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    const itemsOnCart = getLocalStorageKey('mixCheckout');
    if(!products) {
      setProducts(itemsOnCart);
    }
  }, [products]);

  if(!products) return <div>Loading</div>;

  let total = products.reduce((a, { price }) => (a + parseFloat(price)), 0).toFixed(2);
  total = total.split('.');

  return(
    <div>
      {
        products.length > 0 && <CheckoutTable products={products} setProducts={setProducts} />
      }
      {
        products.length === 0 && <h1>Não há produtos no seu carrinho</h1>
      }
    </div>
  );
};


export default Cart;
