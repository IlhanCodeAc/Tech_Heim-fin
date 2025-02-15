import axiosInstance from "../axiosInstance";
import {
  CreateReviewRequestPayload,
  ChangeStatusRequestPayload,
} from "./types";

const create = async (data: CreateReviewRequestPayload) => {
  return await axiosInstance.post("/review", data);
};

const getAll = async () => {
  return await axiosInstance.get("/review");
};

const changeStatus = async (data: ChangeStatusRequestPayload) => {
  return await axiosInstance.patch(`/review/${data.id}/change-status`, {
    status: data.status,
  });
};

const getByProductId = async (ProductId: string) => {
  try {
    const response = await axiosInstance.get(`/review/${ProductId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews by product ID", error);
    throw error;
  }
};

const reviewService = { create, getAll, changeStatus, getByProductId };

export default reviewService;
