import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";


export let CartContext = createContext();
export default function CartContextProvider(props) {
   let { userLogin} = useContext(UserContext);

  //use states
  const [cartId, setcartId] = useState(0);
  const [numberItems , setnumberItems] = useState(0)
 

  //add product
  function addprotuct(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers :{token:userLogin}  },
      )
      .then((res) => res)
      .catch((err) => err);
  }

///////////////////////cart////////////////////// 
  //getproduct
  function getproducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`,
         {
           headers :{token:userLogin}
          })
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
        {  headers :{token:userLogin} }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  //remove item
  function Deleteproduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers :{token:userLogin}
      })
      .then((res) => res)
      .catch((err) => err);
  }

  //clear cart 
 
  function Clearcart() {
   return axios
   .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: userLogin },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  

  //checkout

  async function checkout(cartId, url, formddata) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url }`,
        {
          shippingAddress: formddata,
        },
        { headers :{token:userLogin} }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
   getproducts();
  }, [userLogin]);

  return (
    <CartContext.Provider
      value={{ addprotuct, getproducts, updatecount, Deleteproduct,checkout,cartId,numberItems,setnumberItems,Clearcart }}>
      {props.children}
    </CartContext.Provider>
  );
}
