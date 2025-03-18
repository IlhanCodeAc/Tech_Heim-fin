import axiosInstance from "../axiosInstance";
import {
  AddToCartRequestPayload,
  RemoveFromCartRequestPayload,
  GetCartResponseType,
  AddToCartResponseType,
  RemoveFromCartResponseType,
  ClearCartResponseType,
} from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetCartResponseType>("/cart");
};

const addToCart = async (data: AddToCartRequestPayload) => {
  return await axiosInstance.post<AddToCartResponseType>("/cart", data);
};

const removeFromCart = async (data: RemoveFromCartRequestPayload) => {
  return await axiosInstance.delete<RemoveFromCartResponseType>(`/cart/${data.productId}`);
};

const decreaseFromCart = async (data: AddToCartRequestPayload) => {
  return await axiosInstance.post<AddToCartResponseType>("/cart", {
    ...data,
    quantity: -1, 
  });
};


const clearCart = async () => {
  return await axiosInstance.delete<ClearCartResponseType>("/cart/clear");
};

const cartService = { getAll, addToCart, removeFromCart, clearCart, decreaseFromCart };

export default cartService;
