import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import useCategories from '../../Hooks/useCategories'
import axios from 'axios'
axios



export default function Categories() {
   const[Categories,setCategories]=useState([])
   const[subCategories,setsubCategories]=useState([])

   function getCatigories (){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res)=>{
        setCategories(res.data.data);
        
      })
      .catch((res)=>{})
    }

    function getsubcategories (){
      axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
      .then((res)=>{
        setsubCategories(res.data.data)
        console.log(res.data.data);
        
        
      })
      .catch((res)=>{})
     
    }

    useEffect(()=>{
      getCatigories(),
      getsubcategories ()
    },[])
    
    return (
    <>
  <div className="row  ">
  {Categories.map((category) => (
    <div key={category.id} className="w-full sm:w-1/2 lg:w-1/3 hover:box">
      <div className="product bg-white m-3 p-4 rounded-lg shadow-md  transition-all duration-500 ease-in-out hover:shadow-md hover:shadow-emerald-400 ">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-[300px] object-cover rounded-md"
        />
        <h4 className="text-center mt-2 font-semibold">{category.name}</h4>
      </div>
    </div>
  ))}
</div>

    
    </>
    )

//    let {data,isError,error,isFetched,isLoading} = useCategories()
    
   
  
//    if (isError){
//      return <h3>{error}</h3>
//   }
//   if (isLoading){
//    return <span class="loader"></span>
//   }
//   return (
//    <>
//   {data.data.data.map((product)=(
//       <div key ={product.id} className="w-full lg:w-1/3 md:w-1/2">
//         <img src={product.image} className='w-full mx-3' alt="" />
//         <h3 className=' text-emerald-600'>{product.category.name}</h3>
//       </div>
//   ))}
//    </>
//   )
 }
