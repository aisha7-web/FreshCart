import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  let { checkout } = useContext(CartContext);
  let { cartId } = useContext(CartContext);

  /****************formic obj****************** */
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit:()=>
      handleCheckout(cartId, `http://localhost:3000`),
  });

  async function handleCheckout(cartId, url) {
    let{data}= await checkout(cartId, url, formik.values);
    
    window.location.href = data.session.url
  }

  /******************my form********************** */
  return (
    <>
      <div className="h-96 mt-10 overflow-hidden">
        <h1 className="text-xl p-3 font-serif font-bold text-green-700">
          Checkout Now:
        </h1>

        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative w-full mb-5 group">
            <input
              type="text"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              id="details"
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                 border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
              transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your details
            </label>
            {formik.errors.details && formik.touched.details ? (
              <div className="p-4 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.details}</span>
              </div>
            ) : null}
          </div>

          <div className="relative w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              id="phone"
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
              border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
              transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your phone
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.phone}</span>
              </div>
            ) : null}
          </div>

          <div className="relative w-full mb-5 group">
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              id="city"
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
              border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
              transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your city
            </label>
            {formik.errors.city && formik.touched.city ? (
              <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.city}</span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-3 items-center">
            
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
              font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Check out
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
