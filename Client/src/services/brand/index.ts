import axiosInstance from "../axiosInstance";
import { GetAllBrandResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllBrandResponseType>("/brand");
};

const brandService = { getAll };
export default brandService;
