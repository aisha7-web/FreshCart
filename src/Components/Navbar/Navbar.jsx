import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import logo from "../../assets/freshcart-logo.svg";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for mobile menu
import { useLocation } from "react-router-dom";


export default function Navbar() {
  let { numberItems ,setnumberItems } = useContext(CartContext);
  let { userLogin,setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  function SignOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  function removenumber() {
    localStorage.removeItem("numberItems");
    setnumberItems(null)

  }

  return (
    <nav className="border-gray-200 fixed top-0 right-0 left-0 bg-slate-100 z-20 shadow-md">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        {/* Logo and Hamburger Icon */}
        <div className="flex md:items-center justify-between gap-5">
          <Link to="/">
            <img src={logo} className="h-8" alt="Logo" />
          </Link>
          <button
            className="lg:hidden text-gray-600 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-5 text-slate-500">
  {userLogin && (
    <>
      <li>
        <Link
          to="/"
          className={`hover:text-emerald-700  p-2 rounded-md ${
            location.pathname === "/" ? "text-emerald-700 font-semibold " : ""
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/cart"
          className={`relative hover:text-emerald-700   p-1 rounded-md ${
            location.pathname === "/cart" ? "text-emerald-700 font-semibold " : ""
          }`}
        >
          Cart
          <div className="absolute top-[-10px] right-[-10px] size-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs">
            {numberItems}
          </div>
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          className={`hover:text-emerald-700  p-1 rounded-md ${
            location.pathname === "/products" ? "text-emerald-700 font-semibold " : ""
          }`}
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/categories"
          className={`hover:text-emerald-700  p-1 rounded-md ${
            location.pathname === "/categories" ? "text-emerald-700 font-semibold " : ""
          }`}
        >
          Categories
        </Link>
      </li>
      <li>
        <Link
          to="/brands"
          className={`hover:text-emerald-700  p-1 rounded-md ${
            location.pathname === "/brands" ? "text-emerald-700 font-semibold " : ""
          }`}
        >
          Brands
        </Link>
      </li>
      <li>
        <Link
          to="/wishlist"
          className={`hover:text-emerald-700  p-1 rounded-md ${
            location.pathname === "/wishlist" ? "text-emerald-700 font-semibold " : ""
          }`}
        >
          Wishlist
        </Link>
      </li>
    </>
  )}
</ul>
        {/* Social & Auth Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex gap-3 text-slate-500 text-lg ">
            <li className="cursor-pointer hover:text-black">
              <i className="fab fa-facebook "></i>
            </li>
            <li className="cursor-pointer hover:text-black">
              <i className="fab fa-instagram"></i>
            </li>
            <li className="cursor-pointer hover:text-black">
              <i className="fab fa-youtube"></i>
            </li>
            <li className="cursor-pointer hover:text-black">
              <i className="fab fa-twitter"></i>
            </li>
            <li className="cursor-pointer hover:text-black">
              <i className="fab fa-tiktok"></i>
            </li>
            <li className="cursor-pointer hover:text-black">
              <i className="fab fa-linkedin"></i>
            </li>
          </ul>

          <ul className="flex gap-4">
            {userLogin != null ? (
            <li className="text-slate-500 cursor-pointer" onClick={() => { SignOut(); removenumber(); }}>
            Sign Out
          </li>
          
            ) : (
              <>
                <li className="text-slate-500">
                  <Link to="login">Login</Link>
                </li>
                <li className="text-slate-500">
                  <Link to="register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 p-5`}
      >
        <button
          className="text-2xl text-gray-600 absolute top-5 right-5"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>
        <ul className="flex flex-col gap-5 mt-10 text-slate-500">
          {userLogin && (
            <>
              <li>
                <Link to="" onClick={() => setMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link to="cart" className="relative" onClick={() => setMenuOpen(false)}>
                  Cart
                  <div className="absolute top-[-5px] right-[-5px] size-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs">
                    {numberItems}
                  </div>
                </Link>
              </li>
              <li>
                <Link to="products" onClick={() => setMenuOpen(false)}>Products</Link>
              </li>
              <li>
                <Link to="categories" onClick={() => setMenuOpen(false)}>Categories</Link>
              </li>
              <li>
                <Link to="brands" onClick={() => setMenuOpen(false)}>Brands</Link>
              </li>
              <li>
                <Link to="wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
              </li>
            </>
          )}
          <li className="border-t pt-3">
            {userLogin != null ? (
             <span className="text-slate-500 cursor-pointer" onClick={() => { SignOut(); removenumber(); }}>
             Sign Out
           </span>
           
            ) : (
              <>
                <Link to="login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
