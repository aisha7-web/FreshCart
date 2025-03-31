import React, { useContext, useEffect, useState } from 'react'
import style from "./Wishlist.module.css"
import { WishlistContext } from '../../Context/wishlistContext';
import toast from "react-hot-toast";
import { CartContext } from '../../Context/CartContext';




export default function Wishlist() {
let {getwishProduct,deletewishProduct,wishDetails} = useContext(WishlistContext); //distruct the function and response from the context
// const [wishDetails , setwishDetails] = useState(null) //use state to get any details from the object of the product
let { addprotuct, numberItems, setnumberItems } = useContext(CartContext);

/****************cart****************** */
async function addtocart(id) {
  let response = await addprotuct(id);
  console.log(response.data);

  if (response.data.status == "success") {
    setnumberItems (numberItems + 1)
    toast.success(response.data.message);
    setLoadingCart(false);
  } else {
    toast.error(response.data.message);
    setLoadingCart(true);
  }
}
/*****************wishlist******************** */

async function getproduct() { //function bridge to put it in the use effect
  let response = await getwishProduct();  //main function from wishcontect

  console.log(response.data.data);
 
  if (response.data.status == "success") {
    setwishDetails(response.data.data) //set the object of data in the state
  
  }
}

async function deleteItem(productId) {
  let response = await deletewishProduct(productId);

  console.log(response.data.data);
  if (response.data.status == "success") {
    setwishDetails(response.data.data);
    getproduct(); 
    toast.success("product is removed");
  } else {
    toast.success("Try again ");
  }
}

 useEffect(() => {
    getproduct();
  }, []);

  return (
    <>
    {wishDetails?.length > 0 ? 
    <>
     
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {wishDetails.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4 flex-column items-center justify-items-center">
                  <img
                    src={product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full "
                    alt=""
                    
                  />
                  <button
                  className=" mb-4 btn "
                  onClick={() => addtocart(product.id)}
                >
                 
                    Add To Cart
                  
                </button>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                 {product.price}
                </td>
                <td className="px-6 py-4">
                  <span onClick={()=>deleteItem(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
       
      </div> 
    </>: <h1 className="text-3xl text-emerald-500 font-semibold py-8">There is no Item to show </h1> }
  
    </>
  );
}
