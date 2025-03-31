import React, { useContext , useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {UserContext} from '../../Context/UserContext'



export default function Register() {
  let {userLogin , setuserLogin} = useContext(UserContext)
  let navigate = useNavigate();

  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function handleRegister(value) {
    setisLoading(true)
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value)
      .then((res) => {
        setisLoading(false)
        if (res.data.message == "success"){
          localStorage.setItem("userToken",res.data.token)
          setuserLogin(res.data.token)
          navigate("/");
          
        }

      })
      .catch((res) => {
        setisLoading(false)
        setApiError(res.response.data.message)
        
      });

  
  }
/*******************validation********************** */

    let Validation = yup.object().shape({
     
      email:yup.string().email("not valid email").required("email is required"),
      password:yup.string().min(6,"min length is 6").required("password is required"),
     
    })

/****************formic obj****************** */    
  let formik = useFormik({
    initialValues: {
     email: "",
      password: "",
     
    },
    validationSchema:Validation,
    onSubmit :handleRegister ,
  });

  /******************my form********************** */
  return (
    <>
      <div className="h-96 mt-10 overflow-hidden">
        {ApiError ? (
          <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
            <span className="font-medium">{ApiError}</span>
          </div>
        ) : null}
  
        <h1 className="text-xl p-3 font-serif font-bold text-green-700">
         Login Now:
        </h1>
  
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        
          {/* Email Field */}
          <div className="relative w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                 border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
              transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your Email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div className="p-4 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            ) : null}
          </div>
  
          {/* Password Field */}
          <div className="relative w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              id="password"
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
              border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
              transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your password
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.password}</span>
              </div>
            ) : null}
          </div>
  
  
          {/* Submit Button */}
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
              font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center my-4"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
  
            <Link to={"/Register"}>
              <span className="text-blue-600 underline p-3 ">Don't you have an account? Register Now</span>
            </Link><br></br>
          
          <Link to={"/ForgetPassword"}>
              <span className="text-blue-600 hover:text-black m-5">forget your password ?</span>
            </Link>
        </form>
      </div>
    </>
  );
}
  