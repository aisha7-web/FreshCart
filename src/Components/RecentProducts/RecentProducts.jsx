import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

import { UserContext } from "../../Context/UserContext";
import useProduct from "../../Hooks/useProduct";
import { WishlistContext } from "../../Context/wishlistContext";


export default function RecentProducts() {
  let { userLogin } = useContext(UserContext);
  let { data, isError, error, isLoading } = useProduct();
  let { addprotuct, numberItems, setnumberItems  } = useContext(CartContext);
  let { addproductTowish, deletewishProduct, wishDetails, setwishDetails } =
    useContext(WishlistContext);

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  /**********cart********* */
  async function addtocart(id) {
    setCurrentId(id);
    setLoadingCart(true);

    let response = await addprotuct(id);
    if (response.data.status === "success") {
      setnumberItems(numberItems + 1);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    setLoadingCart(false);
  }

 

  async function handleWishlist(productId) {
    setCurrentId(productId);
    setLoadingWishlist(true);

    const productInWishlist = wishDetails?.some((item) => item.id === productId);

    if (productInWishlist) {
      // Remove from wishlist
      let response = await deletewishProduct(productId);
      if (response.data.status === "success") {
        toast.error("Product removed from wishlist");

        // Update UI immediately
        setwishDetails((prev) => prev.filter((item) => item.id !== productId));
      } else {
        toast.error("Try again");
      }
    } else {
      // Add to wishlist
      let response = await addproductTowish(productId);
      if (response.data.status === "success") {
        toast.success(response.data.message);

        // Update UI immediately
        setwishDetails((prev) => [...prev, { id: productId }]);
      } else {
        toast.error(response.data.message);
      }
    }

    setLoadingWishlist(false);
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div className="row mt-4">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="md:w-1/2 w-full lg:w-1/4">
            <div className="product my-2 md:m-3 transition-all duration-300 hover:shadow-md hover:shadow-emerald-400 hover:rounded-lg md:p-2">
              <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
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
                <button className="m-4 btn" onClick={() => addtocart(product.id)}>
                  {loadingCart && currentId === product.id ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>

                <span onClick={() => handleWishlist(product.id)} className="cursor-pointer">
  {loadingWishlist && currentId === product.id ? (
    <i className="fa fa-spinner fa-spin text-2xl text-emerald-600"></i>
  ) : wishDetails?.some((item) => item.id === product.id) ? (
    <i className="fas fa-heart text-2xl pe-3 text-red-600"></i>
  ) : (
    <i className="fas fa-heart text-2xl pe-3"></i>
  )}
</span>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
