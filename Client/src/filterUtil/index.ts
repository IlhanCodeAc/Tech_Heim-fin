import productService from "../services/product";
import { Product } from "../types";

interface FilterParams {
  graphics_card?: string;
  processor?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  category?: string;
  capacity?: string;
  ram?: string;
}

export const fetchFilteredProducts = async (filters: FilterParams): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await productService.getAll({}, params.toString());
    return response.data?.items || [];
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return [];
  }
};
