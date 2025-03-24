import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";

export default function ForgetPassword() {
  const [step, setStep] = useState("email"); // "email" → "code" → "newPassword"
  const [userEmail, setUserEmail] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  // Function to handle email submission
  async function handleEmailSubmit(values) {
    setIsLoading(true);
    setApiError("");

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
    
      console.log("API Response:", data); // Log full response to check its structure
    
      if (data.message) { 
        setUserEmail(values.email);
        setStep("code");
      } else {
        setApiError("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error.response);
      setApiError(error.response?.data?.message || "Something went wrong");
    }
    
  }

  // Function to handle reset code submission
  async function handleCodeSubmit(values) {
    setIsLoading(true);
    setApiError("");

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );

      console.log("Code Verification Response:", data);
      if (data.status === "Success") {
        setStep("newPassword");
      } else {
        setApiError("Invalid reset code. Please try again.");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // Function to handle new password submission
  async function handleNewPasswordSubmit(values) {
    setIsLoading(true);
    setApiError("");
  
    try {
      let headers = localStorage.getItem("userToken"); // Get token
  
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        { headers } 
      );
  
      console.log("Password changed:", data);
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong.");
    }
  
    setIsLoading(false);
  }
  
  

  // Formik setup for each step
  const emailFormik = useFormik({
    initialValues: {
       email: "" 
      },
    onSubmit: handleEmailSubmit,
  });

  const codeFormik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: handleCodeSubmit,
  });

  const passwordFormik = useFormik({
    initialValues:{
    currentPassword:"",
    password:"",
    rePassword:""
    },
    onSubmit: handleNewPasswordSubmit,
  });

  return (
    <div className="m-7">
      <h1 className="text-2xl text-emerald-600 font-serif font-bold p-4">
        {step === "email"
          ? "Please Enter Your Email"
          : step === "code"
          ? "Enter Reset Code"
          : "Set New Password"}
      </h1>

      {/* Step 1: Enter Email */}
      {step === "email" && (
        <form onSubmit={emailFormik.handleSubmit}>
          <div className="relative w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={emailFormik.values.email}
              onChange={emailFormik.handleChange}
              className="block py-2.5 px-3 w-full border-2 border-gray-300 focus:border-green-600"
              placeholder="Enter your email"
              required
            />
          </div>

          {apiError && <p className="text-red-600">{apiError}</p>}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Sending..." : "Verify"}
          </button>
        </form>
      )}

      {/* Step 2: Enter Reset Code */}
      {step === "code" && (
        <form onSubmit={codeFormik.handleSubmit}>
          <div className="relative w-full mb-5 group">
            <input
              key="resetCodeInput"
              type="text"
              name="resetCode"
              value={codeFormik.values.resetCode}
              onChange={codeFormik.handleChange}
              className="block py-2.5 px-3 w-full border-2 border-gray-300 focus:border-green-600"
              placeholder="Enter reset code"
              required
            />
          </div>

          {apiError && <p className="text-red-600">{apiError}</p>}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Verifying" : "Submit Code"}
          </button>
        </form>
      )}

      {/* Step 3: Enter New Password */}
      {step === "newPassword" && (
        <form onSubmit={passwordFormik.handleSubmit}>
          <div className="relative w-full mb-5 group">
            <input
              type="password"
              name="newPassword"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              className="block py-2.5 px-3 w-full border-2 border-gray-300 focus:border-green-600"
              placeholder="Enter new password"
              required
            />
          </div>

          {apiError && <p className="text-red-600">{apiError}</p>}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
