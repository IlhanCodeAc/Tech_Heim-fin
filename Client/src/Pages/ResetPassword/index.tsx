import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import authService from "../../services/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); 

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Reset Password Request:", { token, password });
      const result = passwordSchema.safeParse({ password, confirmPassword });

      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }

      if (!token) {
        throw new Error("Invalid or missing token");
      }

      return authService.resetPassword({ token, password });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Password Reset Successfully",
        text: "Your password has been reset. You can now log in with your new password.",
      }).then(() => {
        navigate("/"); 
      });
    },
    onError: (error: any) => {
      console.error("Reset Password Error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
          <p className="text-gray-600 mb-4">
            Enter a new password for your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-400 to-purple-600 items-center justify-center">
        <h2 className="text-white text-3xl font-bold">Secure Your Account</h2>
      </div>
    </div>
  );
};

export default ResetPassword;
