import React from 'react';
import style from "./MainSlider.module.css";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/blog-img-2.jpeg"
import slide5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";





export default function MainSlider() {
   
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
   
  };
  
 
    
  return (
     <>
    
    <div className="row">
      <div className="w-full md:w-3/4 ">
      <div className="slider-container">
      <Slider {...settings}>
      <img src={slide1} alt="" className='w-full h-[400px] ' />
      <img src={slide4} alt="" className='w-full h-[400px] ' />
      <img src={slide5} alt="" className='w-full h-[400px] ' />
      </Slider>
      </div>
      
    
      
      </div>
      <div className="w-full flex  md:w-1/4 md:flex-col ">
      <img src={slide2} alt="" className='w-1/2 md:w-full h-[200px]'  />
      <img src={slide3} alt="" className='w-1/2 md:w-full h-[200px]'  />
      </div>
    </div>
    </>
  )
}