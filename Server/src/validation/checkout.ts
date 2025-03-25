// validation/checkout.ts
import * as yup from "yup";

export const createCheckoutSchema = yup.object({
  body: yup.object({
    paymentMethod: yup.string().required("Payment method is required"),
    items: yup
      .array()
      .of(
        yup.object({
          productId: yup.string().required("Product ID is required"),
          quantity: yup.number().min(1).required("Quantity is required"),
        })
      )
      .required("Items are required"),
    totalAmount: yup.number().min(0).required("Total amount is required"),
  }),
});

export const updateOrderStatusSchema = yup.object({
  body: yup.object({
    status: yup
      .string()
      .oneOf(["pending", "paid", "shipped", "delivered", "cancelled"], "Invalid status")
      .required("Status is required"),
  }),
});

export const deleteOrderSchema = yup.object({
  params: yup.object({
    orderId: yup.string().required("Order ID is required"),
  }),
});
