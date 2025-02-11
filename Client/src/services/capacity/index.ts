import axiosInstance from "../axiosInstance";
import { GetAllCapacityResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllCapacityResponseType>("/capacity");
};

const capacityService = { getAll };
export default capacityService;
