"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    // Ensure both password and token are set before sending request
    if (!password || !token) {
      setError("Password and token are required.");
      return;
    }

    console.log("Sending data:", { password, token });  // Log the data being sent
    
    try {
      const response = await axios.post("/api/users/resetpassword", { password, token });
      console.log("Success:", response.data);
      setSuccess(true);
      // Optionally redirect after successful reset
     router.push("/login");
    } catch (error: any) {
      // Improved error handling with detailed response from backend
      if (error.response) {
        console.error("Backend error:", error.response.data);
        setError(error.response.data.error || "Error resetting password. Please try again.");
      } else {
        console.error("Network or other error:", error.message);
        setError("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    // Extract token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Invalid or expired token.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-lg font-semibold mb-4">Reset Password</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {success ? (
        <div className="text-green-500 mb-4">Password reset successfully! You can now log in.</div>
      ) : (
        <>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <button
            onClick={onSubmit}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}
