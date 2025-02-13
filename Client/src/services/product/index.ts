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
const create = async (data: ProductRequestPayload) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("graphicscardId", data.graphicscardId);
  formData.append("brandId", data.brandId);
  formData.append("displayId", data.displayId);
  formData.append("processorId", data.processorId);
  formData.append("ramId", data.ramId);
  formData.append("price", data.price.toString());
  formData.append("description", data.description);
  formData.append("capacityId", data.capacityId);
  formData.append("discount", data.discount.toString());
  formData.append("categoryId", data.categoryId);
  if (data.images?.length) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  formData.append("showInRecommendation", data.showInRecommendation.toString());

  return await axiosInstance.post("/product", formData);
};
}
const edit = async (data: ProductRequestPayload & { id?: string }) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("graphicscard", data.graphicscardId);
  formData.append("brand", data.brandId);
  formData.append("price", data.price.toString());
  formData.append("description", data.description);
  formData.append("capacity", data.capacityId.toString());
  formData.append("discount", data.discount.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("processor", data.processorId);
  if (data.images)
    Array.from(data.images).forEach((image) => {
      formData.append(`images`, image);
    });
  formData.append("showInRecommendation", data.showInRecommendation.toString());

  return await axiosInstance.put(`/Product/${data.id}`, formData);
};

const productService = { getAll, create, edit, getById };
export default productService;