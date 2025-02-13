import axiosInstance from "../axiosInstance";
import {
  ProductRequestPayload,
  GetAllProductResponseType,
  GetByIdProductResponseType,
} from "./types";

const getAll = async (
  pageParams?: { take?: number; skip?: number; type?: "recommended" | "popular" },
  searchParamsStr?: string
) => {
  const searchParams = new URLSearchParams(searchParamsStr);
  if (pageParams?.take) searchParams.append("take", pageParams.take.toString());
  if (pageParams?.skip) searchParams.append("skip", pageParams.skip.toString());
  if (pageParams?.type) searchParams.append("type", pageParams.type);

  return await axiosInstance.get<GetAllProductResponseType>(
    `/Product?${searchParams.toString()}`
  );
};

const getById = async (id: string) => {
  return await axiosInstance.get<GetByIdProductResponseType>(`/Product/${id}`);
};
const create = async (formDataToSend: FormData) => {
  // Ensure that all necessary fields are included
  formDataToSend.append("name", formDataToSend.get("name")?.toString() || "");
  formDataToSend.append("graphicscard", formDataToSend.get("graphicscard")?.toString() || "");
  formDataToSend.append("brand", formDataToSend.get("brand")?.toString() || "");
  formDataToSend.append("price", formDataToSend.get("price")?.toString() || "0");
  formDataToSend.append("description", formDataToSend.get("description")?.toString() || "");
  formDataToSend.append("capacity", formDataToSend.get("capacity")?.toString() || "");
  formDataToSend.append("discount", formDataToSend.get("discount")?.toString() || "0");
  formDataToSend.append("category", formDataToSend.get("category")?.toString() || "");
  formDataToSend.append("processor", formDataToSend.get("processor")?.toString() || "");
  formDataToSend.append("ram", formDataToSend.get("ram")?.toString() || "");
  formDataToSend.append("display", formDataToSend.get("display")?.toString() || "");
  formDataToSend.append("showInRecommendation", formDataToSend.get("showInRecommendation") === "true" ? "true" : "false");

  try {
    const response = await axiosInstance.post("/Product", formDataToSend);
    return response;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error;
  }
};


const edit = async (data: ProductRequestPayload & { id?: string }) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("graphicscard", data.graphicscard);
  formData.append("brand", data.brand);
  formData.append("price", data.price.toString());
  formData.append("description", data.description);
  formData.append("capacity", data.capacity.toString());
  formData.append("discount", data.discount.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("processor", data.processor);
  if (data.images)
    Array.from(data.images).forEach((image) => {
      formData.append(`images`, image);
    });
  formData.append("showInRecommendation", data.showInRecommendation.toString());

  return await axiosInstance.put(`/Product/${data.id}`, formData);
};

const productService = { getAll, create, edit, getById };
export default productService;