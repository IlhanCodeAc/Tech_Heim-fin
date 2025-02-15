import { Schema } from "express-validator";

export const addToWishlistSchema: Schema = {
  productId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: {
      errorMessage: "Product ID must be a valid MongoDB ObjectId",
    },
    errorMessage: "Product ID is required",
  },
};

export const removeFromWishlistSchema: Schema = {
  productId: {
    in: ["params"],
    isString: true,
    notEmpty: true,
    isMongoId: {
      errorMessage: "Product ID must be a valid MongoDB ObjectId",
    },
    errorMessage: "Product ID is required",
  },
};

export const clearWishlistSchema: Schema = {
};
