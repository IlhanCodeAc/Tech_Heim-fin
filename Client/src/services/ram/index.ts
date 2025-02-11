import axiosInstance from "../axiosInstance";
import { GetAllRamResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllRamResponseType>("/ram");
};

const ramService = { getAll };
export default ramService;
