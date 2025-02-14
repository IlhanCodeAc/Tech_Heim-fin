import { Schema } from "express-validator";
import { Types } from "mongoose";

export const createReviewSchema: Schema = {
  productId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    custom: {
      options: (value: string) => Types.ObjectId.isValid(value), 
      errorMessage: "Invalid productId",
    },
  },
  rating: {
    in: ["body"],
    isInt: {
      options: { min: 1, max: 5 },
      errorMessage: "Rating must be an integer between 1 and 5",
    },
    notEmpty: true,
  },
  content: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Content must be a non-empty string",
  },
};
