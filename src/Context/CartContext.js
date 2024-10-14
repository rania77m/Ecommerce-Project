import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  function getCartItems() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function addToCart(productId) {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider value={{ getCartItems, addToCart }}>
      {props.children}
    </CartContext.Provider>
  );
}
