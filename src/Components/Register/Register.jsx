import React, { useContext ,useState } from "react";
import style from "./Register.module.css";
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
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
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
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .min(6, "min length is 6")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password not match")
      .required("rePassword is required"),
    phone: yup
      .string()
      .matches(/^01[1250][0-9]{8}$/, "phone not valid")
      .required("phone is required"), //match make me use regux
  });

  /****************formic obj****************** */
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Validation,
    onSubmit: handleRegister,
  });

  /******************my form********************** */
  return (
    <>
      <div className="mt-10 container">
        {ApiError ? (
          <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
            <span className="font-medium">{ApiError}</span>
          </div>
        ) : null}
  
        <h1 className="text-xl p-3 font-serif font-bold text-green-700">
          Register Now:
        </h1>
  
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          {/* Name Field */}
          <div className="relative w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                 border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
                 transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
                 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your name
            </label>
            {formik.errors.name && formik.touched.name ? (
              <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.name}</span>
              </div>
            ) : null}
          </div>
  
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
  
          {/* Re-Password Field */}
          <div className="relative w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              id="rePassword"
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
              border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
              transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your RePassword
            </label>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.rePassword}</span>
              </div>
            ) : null}
          </div>
  
          {/* Phone Field */}
          <div className="relative w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              id="phone"
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
              border-gray-300 focus:outline-none focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 
              transform -translate-y-6 scale-75 top-3 peer-focus:text-green-600 
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1 z-10"
            >
              Enter your phone
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="p-2 mt-1 text-sm text-red-600 rounded-lg bg-red-100">
                <span className="font-medium">{formik.errors.phone}</span>
              </div>
            ) : null}
          </div>
  
          {/* Submit Button */}
          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
              font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
            </button>
  
            <Link to={"/login"}>
              <span className="text-blue-600 underline">Do you have an account? Login Now</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
  