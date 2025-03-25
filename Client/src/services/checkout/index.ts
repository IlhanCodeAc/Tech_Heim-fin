import axiosInstance from "../axiosInstance";
import { GetCheckoutsType, GetCheckoutType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetCheckoutsType>("/checkout");
};

const getById = async ({ id }: { id: string }) => {
  return await axiosInstance.get<GetCheckoutType>(`/checkout/${id}`);

};

const create = async (data: {
  userId: string;
  amount: number;
  paymentMethodId: string;
  paymentDetails: {
    cardNumber: string;
    cvv: string;
    expiryDate: string;
    address: string;
  };
}) => {
    return await axiosInstance.post("/checkout", data);

};

const updateStatus = async ({ id, status }: { id: string; status: "pending" | "completed" | "failed" }) => {
    return await axiosInstance.put(`/checkout/${id}`, { status });

};

const remove = async ({ id }: { id: string }) => {
    return await axiosInstance.delete(`/checkout/${id}`);

};

const checkoutService = {
  getAll,
  getById,
  create,
  updateStatus,
  remove,
};

export default checkoutService;
