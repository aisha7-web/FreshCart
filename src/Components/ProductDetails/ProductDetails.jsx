import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/wishlistContext";


export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [relatedproducts, setrelatedproducts] = useState([]);
  let { addproductTowish } = useContext(WishlistContext);
    const [loadingCart, setLoadingCart] = useState(false);
    const [loadingWishlist, setLoadingWishlist] = useState(false);
    const [currentId, setcurrentId] = useState(0);

  let { addprotuct, numberItems, setnumberItems } = useContext(CartContext);

  let { id, category } = useParams();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  async function addtocart(id) {
    setcurrentId(id);
    setLoadingCart(true);
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

  async function addtowishlist(id) {
    setcurrentId(id);
    setLoadingWishlist(true);
    let response = await addproductTowish(id);
    console.log(response.data);

    if (response.data.status == "success") {
      setnumberItems = numberItems + 1;
      toast.success(response.data.message);
      setLoadingWishlist(false);
    } else {
      toast.error(response.data.message);
      setLoadingWishlist(false);
    }
  }

  function getproduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getrelatedproducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedproducts(related);
      })
      .catch(() => {});
  }
  useEffect(() => {
    getproduct(id);
    getrelatedproducts();
  }, [id, category]);

  return (
    <>
      <div className="row items-center justify-between ">
        <div className="w-full mb-4 md:w-1/4">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img src={src} />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 ">
          <div className=" text-center">
            <h3 className="font-semibold capitalize text-2xl">
              {product?.title}
            </h3>
            <h4 className="text-gray-700 my-4">{product?.description}</h4>
            <h4 className="text-gray-900 my-4">{product?.category.name}</h4>
          </div>

          <div className="flex justify-between p-3 my-5">
            <span>{product?.price} EGP </span>
            <span>
              <i className="fas fa-star text-yellow-300"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
                <button
                  className=" mb-4 btn "
                  onClick={() => addtocart(product.id)}
                >
                  {loadingCart? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
                <button
                  className="text-emerald-500 hover:text-red-700 p-1 btn2 rounded-sm text-lg mb-2"
                  onClick={() => addtowishlist(product.id)}
                >
                  {loadingWishlist? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <i class="fa-solid fa-heart"></i>
                  )}
                </button>
              </div>
        </div>
      </div>

      <div className="row">
        {relatedproducts.length > 0 ? (
          relatedproducts.map((product) => (
            <div key={product.id} className="w-1/2 lg:w-1/6">
              <div className="product">
                <Link
                  to={`/ProductDetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full mx-3 p-3"
                    alt=""
                  />
                  <h3 className=" text-emerald-600">{product.category.name}</h3>
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
                  className=" mb-4 btn "
                  onClick={() => addtocart(product.id)}
                >
                  {loadingCart && currentId == product.id? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
                <button
                  className="text-emerald-500 hover:text-red-700 p-1 btn2 rounded-sm text-lg mb-2"
                  onClick={() => addtowishlist(product.id)}
                >
                  {loadingWishlist && currentId == product.id ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <i class="fa-solid fa-heart"></i>
                  )}
                </button>
              </div>
              </div>
            </div>
          ))
        ) : (
          <span class="loader"></span>
        )}
      </div>
    </>
  );
}
