import React, { useState } from "react";
import authService from "../../services/auth";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await authService.forgotPassword({ email });
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-4">Enter your email to reset your password</p>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-400 to-purple-600 items-center justify-center">
        <h2 className="text-white text-3xl font-bold">Welcome Back!</h2>
      </div>
    </div>
  );
};

export default ForgotPassword;
