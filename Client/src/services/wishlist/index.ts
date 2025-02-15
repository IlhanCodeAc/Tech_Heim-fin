import axiosInstance from "../axiosInstance";
import {
  AddToWishlistRequestPayload,
  RemoveFromWishlistRequestPayload,
  GetWishlistResponseType,
  AddToWishlistResponseType,
  RemoveFromWishlistResponseType,
  ClearWishlistResponseType,
} from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetWishlistResponseType>("/wishlist");
};

const addToWishlist = async (data: AddToWishlistRequestPayload) => {
  return await axiosInstance.post<AddToWishlistResponseType>("/wishlist", data);
};

const removeFromWishlist = async (data: RemoveFromWishlistRequestPayload) => {
  return await axiosInstance.delete<RemoveFromWishlistResponseType>(`/wishlist/${data.productId}`);
};

const clearWishlist = async () => {
  return await axiosInstance.delete<ClearWishlistResponseType>("/wishlist/clear");
};

const wishlistService = { getAll, addToWishlist, removeFromWishlist, clearWishlist };

export default wishlistService;
