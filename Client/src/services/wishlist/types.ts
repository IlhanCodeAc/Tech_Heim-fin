import { WishlistItem, Product } from "../../types"; 

export type AddToWishlistRequestPayload = {
  productId: string;
};

export type AddToWishlistResponseType = {
  message: string; 
  productId: string;
  wishlist: {
    items: WishlistItem[]; 
  };
};

export type RemoveFromWishlistRequestPayload = {
  productId: string;
};

export type RemoveFromWishlistResponseType = {
  message: string;
  wishlist: {
    items: WishlistItem[];
  };
};

export type ClearWishlistResponseType = {
  message: string;
};

export type GetWishlistResponseType = {
  message: string; 
  items: WishlistItem[];
};
