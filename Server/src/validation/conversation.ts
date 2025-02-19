import { Schema } from "express-validator";

export const conversationCreateSchema: Schema = {
  userId: {
    in: ["body"],
    isString: {
      errorMessage: "User ID must be a string",
    },
    optional: true,
  },
  userName: {
    in: ["body"],
    isString: {
      errorMessage: "User name must be a string",
    },
    optional: true,
  },
  userEmail: {
    in: ["body"],
    isString: {
      errorMessage: "User email must be a string",
    },
    optional: true,
  },
};