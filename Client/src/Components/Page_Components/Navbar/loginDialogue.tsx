import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/auth";
import { Link } from "react-router-dom";

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await authService.login(values);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login Successful:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsOpen(false);
      setErrorMessage("");
      window.location.reload();
    },
    onError: (error: any) => {
      console.error("Login Failed:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => mutation.mutate(values)}
        >
          {() => (
            <Form className="flex flex-col gap-2">
              <div>
                <Field name="email" type="email" placeholder="Email" className="border p-2 rounded w-full" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div>
                <Field name="password" type="password" placeholder="Password" className="border p-2 rounded w-full" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>

              {errorMessage && <div className="text-red-500">{errorMessage}</div>}

              <Button type="submit" className="bg-blue-500 text-white">
                Login
              </Button>

              <div className="text-center mt-2">
              <Link to="/forgot-password" className="text-blue-500 hover:underline" onClick={() => setIsOpen(false)}>
              Forgot password...
              </Link>

              </div>

              <Button type="button" className="bg-gray-500 text-white mt-2" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
