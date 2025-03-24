import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useCategories() {
    function getcategories (){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let productinfo = useQuery ({
        queryKey:["recentproduct"],
        queryFn :getcategories,
        staleTime:1000 //ctrl 
      })
      return productinfo;
}
