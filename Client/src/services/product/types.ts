import { Product } from "../../types";

export type GetAllProductResponseType = {
  items: Product[];
  message: string;
  total: number;
  skip: number;
  take: number;
};

export type GetByIdProductResponseType = {
  item: Product;
  message: string;
};

export type ProductRequestPayload = {
  name: string;
  processorId: string; 
  graphicscardId: string; 
  price: number;
  description: string;
  capacityId: string; 
  discount: number;
  categoryId: string; 
  brandId: string; 
  ramId: string; 
  displayId: string; 
  images?: File[];
  showInRecommendation: boolean;
};
