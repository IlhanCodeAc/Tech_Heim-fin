import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/auth";
import Swal from "sweetalert2";

const registerValidationSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  name: z.string().nonempty("Name is required"),
  surname: z.string().nonempty("Surname is required"),
  address: z.string().nonempty("Address is required"),
  number: z.string().nonempty("Number is required"),
});

type RegisterFormValues = z.infer<typeof registerValidationSchema>;

const RegisterDialog = () => {
  const [isOpen, setIsOpen] = useState(false);  

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidationSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      const response = await authService.register(values as any);
      if (!response) {
        throw new Error("Server did not return a response");
      }
      return response;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
      });
      reset(); 
      setIsOpen(false); 
    },
    onError: (error: any) => {
      if (error.response && error.response.data.message === "User already exists with this email") {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'A user with this email already exists.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Something went wrong. Please try again.',
        });
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(mutation.mutate as any)} className="flex flex-col gap-2">
          <input {...register("name")} placeholder="Name" className="border p-2 rounded" />
          {errors.name && <div className="text-red-500">{errors.name.message}</div>}

          <input {...register("surname")} placeholder="Surname" className="border p-2 rounded" />
          {errors.surname && <div className="text-red-500">{errors.surname.message}</div>}

          <input {...register("email")} type="email" placeholder="Email" className="border p-2 rounded" />
          {errors.email && <div className="text-red-500">{errors.email.message}</div>}

          <input {...register("password")} type="password" placeholder="Password" className="border p-2 rounded" />
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}

          <input {...register("address")} placeholder="Address" className="border p-2 rounded" />
          {errors.address && <div className="text-red-500">{errors.address.message}</div>}

          <input {...register("number")} placeholder="Number" className="border p-2 rounded" />
          {errors.number && <div className="text-red-500">{errors.number.message}</div>}

          <Button type="submit" className="bg-blue-500 text-white" disabled={mutation.isPending}>
            {mutation.isPending ? "Registering..." : "Register"}
          </Button>
          <Button type="button" className="bg-gray-500 text-white mt-2" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;