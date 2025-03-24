import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Brands() {
  const[Brand,setBrand]=useState([])
   const[subBrand,setsubBrand]=useState([])

   function getCatigories (){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res)=>{
        setBrand(res.data.data);
        
      })
      .catch((res)=>{})
    }

    function getsubBrand (brandId){
      axios.get(`https://ecommerce.routemisr.com/api/v1/subBrand/${brandId}`)
      .then((res)=>{
        setsubBrand(res.data.data)
        console.log(res.data.data);
        
        
      })
      .catch((res)=>{})
     
    }

    useEffect(()=>{
      getCatigories()
      getsubBrand ()
    },[])
    
    return (
    <>
  <div className="row  ">
  {Brand.map((brand) => (
    <div key={brand.id} className="w-full sm:w-1/2 lg:w-1/4 hover:box">
    
      <div className="product bg-white m-3 p-4 rounded-lg shadow-md  transition-all duration-500 ease-in-out hover:shadow-md hover:shadow-emerald-400 "
       >
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full  rounded-md"
        />
        <h4 className="text-center mt-2 font-semibold">{brand.name}</h4>
      </div>
      
      
    </div>
  ))}
</div>

    
    </>
    )
}
