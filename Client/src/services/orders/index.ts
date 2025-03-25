import { toast } from "sonner";
import axiosInstance from "../axiosInstance";
import { GetOrdersType, OrderType, CreateOrderData, UpdateOrderStatusData } from "./types"; // Importing the types

const getAllOrders = async () => {
  return await axiosInstance.get<GetOrdersType>("/order/orders");
};

const getUserOrders = async (userId: string) => {
  return await axiosInstance.get<GetOrdersType>(`/order/orders/user/${userId}`);
};

const createOrder = async (data: CreateOrderData) => {
  try {
    const response = await axiosInstance.post("/order/orders", data);
    console.log("Order created successfully:", response.data);
    return response;
  } catch (error:any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      toast.error(`Error: ${error.response.status} - ${error.response.data.message || "Unknown error"}`);
    } else if (error.request) {
      console.error("Error Request:", error.request);
      toast.error("No response from server.");
    } else {
      console.error("General Error:", error.message);
      toast.error("An error occurred while processing your order.");
    }
  }
};

const updateOrderStatus = async (orderId: string, statusData: UpdateOrderStatusData) => {
  return await axiosInstance.put(`/order/orders/${orderId}/status`, statusData);
};

const deleteOrder = async (orderId: string) => {
  return await axiosInstance.delete(`/order/orders/${orderId}`);
};

const getOrderItems = async (orderId: string) => {
  return await axiosInstance.get(`/order/orders/${orderId}/items`);
};

const orderService = {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderItems, 
};

export default orderService;
