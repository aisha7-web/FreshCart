import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [cartId, setcartId] = useState(0);
  const [numberItems , setnumberItems] = useState(0)

  //add product
  function addprotuct(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  
  //getproduct
  function getproducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setnumberItems (res.data.numOfCartItems)
        setcartId(res.data.data._id);
        return res;
      })
      .catch((err) => err);
  }

  //update count
  function updatecount(productId, newcount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newcount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  //remove item
  function Deleteproduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //checkout

  function checkout(cartId, url, formddata) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url }`,
        {
          shippingAddress: formddata,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <CartContext.Provider
      value={{ addprotuct, getproducts, updatecount, Deleteproduct,checkout,cartId,numberItems,setnumberItems }}>
      {props.children}
    </CartContext.Provider>
  );
}
