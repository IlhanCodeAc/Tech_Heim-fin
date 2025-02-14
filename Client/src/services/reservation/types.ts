import { CartItem, Product } from "../../types"; // Import CartItem type

// Add Product to Cart
export type AddToCartRequestPayload = {
  product: Product; // Full product details
  quantity: number; // Quantity of the product
  productId:string;

};

export type AddToCartResponseType = {
  message: string; 
  productId:string;
  cart: {
    items: CartItem[]; 
    total: number; 
  };
};

export type RemoveFromCartRequestPayload = {
  productId: string;
};

export type RemoveFromCartResponseType = {
  message: string;
  cart: {
    items: CartItem[]; 
    total: number;
  };
};

export type ClearCartResponseType = {
  message: string;
};

export type GetCartResponseType = {
  message: string; 
  items: CartItem[];
  total: number; 
};
