import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishDetails, setwishDetails] = useState([]);
  let { userLogin } = useContext(UserContext);

  async function addproductTowish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers: { token: userLogin } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          getwishProduct(); 
        }
        return res;
      })
      .catch((err) => err);
  }

  async function getwishProduct() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: { token: userLogin },
      })
      .then((response) => {
        setwishDetails(response.data.data || []);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setwishDetails([]); // Ensure state is reset if there's an error
      });
  }

  async function deletewishProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: userLogin },
      })
      .then((res) => {
        if (res.data.status === "success") {
          getwishProduct(); // Update wishlist after removing
        }
        return res;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    if (userLogin) {
      getwishProduct();
    }
  }, [userLogin]);

  return (
    <WishlistContext.Provider
      value={{ addproductTowish, getwishProduct, deletewishProduct, wishDetails ,setwishDetails  }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
