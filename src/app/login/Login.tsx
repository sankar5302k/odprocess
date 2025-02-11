"use client";
import React, { useState } from "react";
import Appmain from "../app/appmain";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (data.message === "Verified") {
        document.cookie = "isAuthenticated=true; path=/"; // Set authentication cookie
        setIsVerified(true);
      } else {
        alert("Not Verified");
      }
    } catch (error) {
      alert("Error logging in");
    } finally {
      setLoading(false);
    }
  };
  
  if (isVerified) {
    return <Appmain username={username} ></Appmain>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Sri Sairam Institute of Technology
            </h2>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 border-b-2 border-purple-600 pb-2 mb-4">
              OD Availability Checker
            </h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input
                  autoComplete="off"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Username"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">
                  Username
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Password"
                />
                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">
                  Password
                </label>
              </div>
              <div className="relative">
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
