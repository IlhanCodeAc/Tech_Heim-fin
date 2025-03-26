import { Router } from "express";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import {
  addToCartSchema,
  removeFromCartSchema,
  clearCartSchema
} from "../validation/cart"; 
import cartController from "../controllers/cart";

const router = Router();

router.get("/", authorize({}), cartController.getAll);

router.post(
  "/",
  authorize({}),
  validateSchema(addToCartSchema), 
  cartController.addToCart
);

router.delete(
  "/:productId",
  authorize({}),
  validateSchema(removeFromCartSchema),
  cartController.removeFromCart
);

router.delete(
  "/",
  authorize({}),
  validateSchema(clearCartSchema), 
  cartController.clearCart
);

export default router;
