import React from 'react'
import style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar'
import Footer from './../Footer/Footer'
import {Outlet} from 'react-router-dom';

export default function Layout() {
  return (   
   <>
   <Navbar/>
   <div className="container mx-auto w-[85%] min-h-screen py-20 lg:py-50"> 
    <Outlet/>
   </div>

   <Footer/>
   </>
  )
}
