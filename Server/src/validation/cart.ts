import { Schema } from "express-validator";

export const addToCartSchema: Schema = {
  productId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: {
      errorMessage: "Product ID must be a valid MongoDB ObjectId",
    },
    errorMessage: "Product ID is required",
  },
  quantity: {
    in: ["body"],
    isInt: {
      options: { min: 1 },
      errorMessage: "Quantity must be a positive integer",
    },
    notEmpty: true,
    errorMessage: "Quantity is required",
  },
};

export const removeFromCartSchema: Schema = {
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

export const clearCartSchema: Schema = {
};
