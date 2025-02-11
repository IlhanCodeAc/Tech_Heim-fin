import axiosInstance from "../axiosInstance";
import { GetAllGraphicsCardResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllGraphicsCardResponseType>("/graphicscard");
};

const graphicsCardService = { getAll };
export default graphicsCardService;
