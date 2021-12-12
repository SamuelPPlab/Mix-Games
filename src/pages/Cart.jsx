import React, { useEffect, useState } from "react";
import { getLocalStorageKey } from "../services/getKey";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const itemsOnCart = getLocalStorageKey('mixCheckout');
    setProducts(itemsOnCart);
  }, []);
  console.log(products)
  return(
    <div>

    </div>
  );
};


export default Cart;
