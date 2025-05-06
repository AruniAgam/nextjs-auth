"use client";

import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      setMessage(response.data.message || "Reset email sent. Please check your inbox.");
    } catch (error: any) {
      if (error.response && error.response.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
     
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
        <input
       className ="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          placeholder="Enter your email"
        />

        <button
          onClick={onSubmit}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Send Reset Link
        </button>
      
    </div>
  );
}
