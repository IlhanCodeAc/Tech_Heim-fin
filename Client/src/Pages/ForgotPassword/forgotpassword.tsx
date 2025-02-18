import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-4">Enter your email to reset your password</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-400 to-purple-600 items-center justify-center">
        <h2 className="text-white text-3xl font-bold">Welcome Back!</h2>
      </div>
    </div>
  );
};

export default ForgotPassword;
