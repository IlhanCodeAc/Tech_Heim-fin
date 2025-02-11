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
  processor: string; 
  graphicscard: string; 
  price: number;
  description: string;
  capacity: string; 
  discount: number;
  categoryId: string; 
  brand: string; 
  ram: string; 
  display: string; 
  images?: File[];
  showInRecommendation: boolean;
};
