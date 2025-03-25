import axiosInstance from "../axiosInstance";
import { GetPaymentMethodsType, GetPaymentMethodType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetPaymentMethodsType>("/payment-method");
};

const getById = async ({ id }: { id: string }) => {
  return await axiosInstance.get<GetPaymentMethodType>(`/payment-method/${id}`);
};

const create = async (data: {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  isDefault: boolean;
}) => {
  return await axiosInstance.post(`/payment-method`, data);
};

const remove = async ({ id }: { id: string }) => {
  return await axiosInstance.delete(`/payment-method/${id}`);
};

const paymentService = {
  getAll,
  getById,
  create,
  remove,
};

export default paymentService;
