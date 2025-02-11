import axiosInstance from "../axiosInstance";
import { GetAllDisplayResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllDisplayResponseType>("/display");
};

const displayService = { getAll };
export default displayService;
