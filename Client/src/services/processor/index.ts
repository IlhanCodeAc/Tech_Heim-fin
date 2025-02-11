import axiosInstance from "../axiosInstance";
import { GetAllProcessorResponseType } from "./type";

const getAll = async () => {
  return await axiosInstance.get<GetAllProcessorResponseType>("/processor");
};

const processorService = { getAll };
export default processorService;
