import { Schema } from "express-validator";

export const getAllRentSchema: Schema = {
  type: {
    in: ["query"],
    matches: {
      options: [/^(recommended|popular)$/],
      errorMessage: "type must be either 'recommended' or 'popular'",
    },
    optional: true,
  },
  take: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  skip: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  search: {
    in: ["query"],
    isString: true,
    optional: true,
  },
  category: {
    in: ["query"],
    optional: true,
  },
  brand: {
    in: ["query"],
    optional: true,
  },
  capacity: {
    in: ["query"],
    optional: true,
  },
  min_price: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  max_price: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
};

export const createRentSchema: Schema = {
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  price: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  capacityId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  brandId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  displayId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  processorId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  graphicscardId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },

  categoryId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  ramId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  currency: {
    in: ["body"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  discount: {
    in: ["body"],
    isNumeric: true,
    optional: true,
  },
  showInRecommendation: {
    in: ["body"],
    isBoolean: true,
    optional: true,
  },
  files: {
    custom: {
      options: (_, { req }) => {
        if (!req.files || req.files.length === 0) {
          throw new Error("Images not uploaded!!");
        }
        return true;
      },
    },
  },
};

export const editRentSchema: Schema = {
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  price: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  capacity: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  brand: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  display: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  processor: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  ram: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  graphicscard: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },

  category: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  currency: {
    in: ["body"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  discount: {
    in: ["body"],
    isNumeric: true,
    optional: true,
  },
  showInRecommendation: {
    in: ["body"],
    isBoolean: true,
    optional: true,
  },
};
