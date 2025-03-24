import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProduct from "../../Hooks/useProduct";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/wishlistContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  let { data, isError, error, isLoading } = useProduct();
  let { addprotuct, numberItems, setnumberItems } = useContext(CartContext);
  let { addproductTowish, deletewishProduct } = useContext(WishlistContext);

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [wishlistState, setWishlistState] = useState(() => {
    // Load wishlist from localStorage on first render
    return JSON.parse(localStorage.getItem("wishlistState")) || {};
  });

  // Save wishlist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlistState", JSON.stringify(wishlistState));
  }, [wishlistState]);

  async function addtocart(id) {
    setCurrentId(id);
    setLoadingCart(true);

    let response = await addprotuct(id);
    console.log(response.data);

    if (response.data.status === "success") {
      setnumberItems(numberItems + 1);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    setLoadingCart(false);
  }

  async function addtowish(id) {
    setCurrentId(id);
    setLoadingWishlist(true);

    let response = await addproductTowish(id);
    console.log(response.data);

    if (response.data.status === "success") {
      setWishlistState((prevState) => ({
        ...prevState,
        [id]: true, // Mark as added to wishlist
      }));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    setLoadingWishlist(false);
  }

  async function deleteItem(productId) {
    let response = await deletewishProduct(productId);
    console.log(response.data);

    if (response.data.status === "success") {
      setWishlistState((prevState) => {
        const updatedWishlist = { ...prevState };
        delete updatedWishlist[productId]; // Remove from wishlist
        return updatedWishlist;
      });
      toast.error("Product removed from wishlist");
    } else {
      toast.error("Try again");
    }
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return <span className="loader"></span>;
  }

  return (
    <>
      <div className="row mt-4">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="md:w-1/2 w-full lg:w-1/4">
            <div className="product my-2 md:m-3 transition-all duration-300 hover:shadow-md hover:shadow-emerald-400 hover:rounded-lg md:p-2">
              <Link
                to={`/ProductDetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className="text-emerald-600">{product.category.name}</h3>
                <h3 className="mb-3 font-semibold">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between p-3">
                  <span>{product.price} EGP </span>
                  <span>
                    <i className="fas fa-star text-yellow-300"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              <div className="flex justify-between items-center gap-2">
                <button
                  className="mb-4 btn"
                  onClick={() => addtocart(product.id)}
                >
                  {loadingCart && currentId === product.id ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
                <button
                  className={`mb-2 p-1 btn2 text-xl transition-colors duration-300 
    ${wishlistState[product.id] ? "text-red-500" : "text-emerald-500"}`}
                  onClick={() => {
                    if (wishlistState[product.id]) {
                      deleteItem(product.id); // Remove from wishlist
                    } else {
                      addtowish(product.id); // Add to wishlist
                    }

                    setWishlistState((prevState) => ({
                      ...prevState,
                      [product.id]: !prevState[product.id], // Toggle color
                    }));
                  }}
                >
                  {loadingWishlist && currentId === product.id ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-heart"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
