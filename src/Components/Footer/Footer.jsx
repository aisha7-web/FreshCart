import React from 'react'
import style from "./Footer.module.css"
import amazon from "../../assets/amazon.jpg";
import card from "../../assets/card.gif";
import store from "../../assets/store.jpg";
export default function Footer() {
  return (
    <div>
<footer className=" bottom-0 left-0 right-0  w-full bg-slate-100 px-4 py-3 border-t border-gray-300">
  <div className="container px-12 my-4">
  <div className=" text-left">
    <h1 className="text-2xl mb-3 ">Get the Fresh Cart app</h1>
    <p className="text-gray-600 mb-3">We will send you a link, open it on your phone to download the app</p>
    </div>
    <div className="flex justify-between">
      <input
        type="text"
        id="base-input"
        placeholder='Email..'
        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm 
        rounded-lg focus:ring-green-500 focus:border-green-500 block w-5/6 p-1.5 "
      />
      <button className='bg-green-700 rounded-md px-10 py-1 text-white'>Share App Link</button>
    </div>
    <hr className='border-solid mt-3 bg-slate-400'></hr>
      <div className="flex justify-between my-4">
        <div className="flex align-content-center gap-3">
          <p>Payment Partner</p>
          <img src={amazon} alt="" className='w-11'  />
          <img src={card} alt="" className='w-12'  />
 </div>
 <div className="flex justify-center align-items-center gap-3">
  <p className='text-gray-500'>Get delevries with FreshCart</p>
  <img src={store} alt="" className='w-12'  />
 </div>


      </div>
      <hr className='border-solid mt-3 bg-slate-400'></hr>

    
  </div>
 
</footer>


    </div>
  )
}
