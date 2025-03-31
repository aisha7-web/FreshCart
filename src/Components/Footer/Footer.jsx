import React from 'react';
import amazon from "../../assets/amazon.jpg";
import card from "../../assets/card.gif";
import store from "../../assets/store.jpg";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 right-0 w-full bg-slate-100 px-4 py-5 border-t border-gray-300">
      <div className="container mx-auto px-4 md:px-12">
        
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl mb-3">Get the Fresh Cart app</h1>
          <p className="text-gray-600 mb-3">We will send you a link, open it on your phone to download the app</p>
        </div>

        {/* Input and Button Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <input
            type="text"
            placeholder="Email.."
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm 
            rounded-lg focus:ring-green-500 focus:border-green-500 block w-full md:w-5/6 p-2"
          />
          <button className="bg-green-700 rounded-md px-6 py-2 text-white w-full md:w-auto">
            Share App Link
          </button>
        </div>

        <hr className="border-solid mt-5 bg-slate-400"></hr>

        {/* Payment & Delivery Partners */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left my-4 gap-5">
          
          {/* Payment Partners */}
          <div className="flex items-center gap-3">
            <p>Payment Partners:</p>
            <img src={amazon} alt="Amazon" className="w-12 md:w-14" />
            <img src={card} alt="Card Payment" className="w-12 md:w-14" />
          </div>

          {/* Delivery Partners */}
          <div className="flex items-center gap-3">
            <p className="text-gray-500">Get deliveries with FreshCart</p>
            <img src={store} alt="Store" className="w-12 md:w-14" />
          </div>

        </div>

        <hr className="border-solid mt-3 bg-slate-400"></hr>

      </div>
    </footer>
  );
}
