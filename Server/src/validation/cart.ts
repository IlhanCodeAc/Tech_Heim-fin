import { Schema } from "express-validator";

// Validation for adding an item to the cart
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

// Validation for removing an item from the cart
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

// Validation for clearing the cart (no parameters required)
export const clearCartSchema: Schema = {
  // No parameters needed, so no validation
};
