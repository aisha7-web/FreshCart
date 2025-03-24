import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
  const [categories, setCategories] = useState([]);

  // Slider settings with responsiveness
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // Default
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280, // Large screens
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, // Tablets & small laptops
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error("Error fetching categories", err));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="p-4 font-semibold font-serif text-xl text-gray-600 capitalize">
        Shop Popular Categories
      </h1>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[200px] object-cover rounded-md"
              />
              <h4 className="text-center text-gray-700 font-medium mt-2 capitalize">
                {category.name}
              </h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
