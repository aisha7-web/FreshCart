import axios from "axios";
import React, { createContext } from "react";

export let WishlistContext = createContext();
export default function WishlistContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };

  function addproductTowish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers },
       
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getwishProduct(){
    return axios
    .get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers },
     
    )
    .then((res) => res)
    .catch((err) => err);

  }

  function deletewishProduct(productId){
    return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers },
     
    )
    .then((res) => res)
    .catch((err) => err);

  }

  



  return (
    <WishlistContext.Provider value={{ addproductTowish ,getwishProduct,deletewishProduct }}>
      {props.children}
    </WishlistContext.Provider>
  );
}
