import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getproducts, updatecount, Deleteproduct, numberItems, setnumberItems ,Clearcart} =
    useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function getcartItems() {
    setisLoading(true)
    let response = await getproducts();

    console.log(response.data);
    if (response.data.status == "success") {
      setcartDetails(response.data.data);
    }
  }

  async function updateproduct(id, count) {
    let response = await updatecount(id, count);

    console.log(response.data);
    if (response.data.status == "success") {
      setcartDetails(response.data.data);
      toast.success("product updated successfully");
    } else {
      toast.success("Try again ");
    }
  }

  async function deleteItem(productId) {
    let response = await Deleteproduct(productId);

    console.log(response.data.data);
    if (response.data.status == "success") {
      setcartDetails(response.data.data);
      setnumberItems(numberItems - 1);
      toast.success("product is removed");
    } else {
      toast.success("Try again ");
    }
  }

  async function clearItems (){
    let response = await Clearcart();
    console.log("clearcart")
    if (response.data.message == "success") {
      setcartDetails(response.data.data);
      setnumberItems(0);
      
      
    }
  }

  useEffect(() => {
    getcartItems();
  }, []);

  return (
    <>
    
      {cartDetails?.products.length > 0 ? (
        <>
          <h2 className="text-xl text-emerald-600 font-bold font-serif capitalize p-4">
            Total Price : {cartDetails?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          

<tbody className="block md:table-row-group w-full">
  {cartDetails?.products.map((product) => (
    <tr
      key={product.product.id}
      className="bg-white border-b border-gray-200 hover:bg-gray-50 block md:table-row w-full  md:items-center"
    >
      <td className="p-4 w-full md:w-1/5 flex justify-center md:table-cell">
        <img
          src={product.product.imageCover}
          className="w-full h-auto md:w-[80%] mx-auto"
          alt="Product"
        />
      </td>

      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center md:text-left md:table-cell">
        {product.product.title}
      </td>

      <td className="px-6 py-4 flex md:table-cell">
        <div className="flex items-center">
          <button
            onClick={() => updateproduct(product.product.id, product.count - 1)}
            className="inline-flex items-center  p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
            type="button"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>
          <span>{product.count}</span>
          <button
            onClick={() => updateproduct(product.product.id, product.count + 1)}
            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
            type="button"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>

      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center md:text-left md:table-cell">
        {product.price * product.count}
      </td>

      <td className="px-6 py-4 text-center md:text-left md:table-cell">
        <span
          onClick={() => deleteItem(product.product.id)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
        >
          Remove
        </span>
      </td>
    </tr>
  ))}
</tbody>


            </table>
            <button className="btn" onClick={clearItems}>Clear</button>
            <Link to="/checkout">
              <button className="btn capitalize my-3">Check Out</button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-emerald-500 font-semibold py-8">
          There is no Item to show{" "}
        </h1>
      )}
    </>
  );
}
