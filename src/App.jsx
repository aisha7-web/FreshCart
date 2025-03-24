import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import {QueryClient,QueryClientProvider  } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import CheckOut from './Components/CheckOut/CheckOut';
import Allorders from './Components/Allorders/Allorders';
import Wishlist from './Components/Wishlist/Wishlist';
import WishlistContextProvider from './Context/wishlistContext';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';





let query =new QueryClient ()


let x= createHashRouter ([
  {path:"", element:<Layout/>, children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"products", element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"productDetails/:id/:category", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"categories", element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"register", element:<Register/>},
    {path:"login", element:<Login/>},
    {path:"forgetpassword", element:<ForgetPassword/>},
    {path:"checkout", element:<CheckOut/>},
    {path:"allorders", element:<Allorders/>},
    {path:"wishlist", element:<Wishlist/>},
    {path:"*", element:<ProtectedRoute><NotFound/></ProtectedRoute>},
  ]},
  



])
function App() {
 
  return<>
  <UserContextProvider>
    <QueryClientProvider client={query}>
      <CartContextProvider>
        < WishlistContextProvider>
        <RouterProvider router={x}></RouterProvider>
        </WishlistContextProvider>
      
      <Toaster/>
      </CartContextProvider>
     <ReactQueryDevtools/>
    </QueryClientProvider>
   </UserContextProvider>
  
  </>
   
}

export default App
