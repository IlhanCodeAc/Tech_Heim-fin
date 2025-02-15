import { Router } from "express";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import {
  addToWishlistSchema,
  removeFromWishlistSchema,
  clearWishlistSchema
} from "../validation/wishlist";
import wishlistController from "../controllers/wishlist";

const router = Router();

router.get("/", authorize({}), wishlistController.getAll);

router.post(
  "/",
  authorize({}),
  validateSchema(addToWishlistSchema),
  wishlistController.addToWishlist
);

router.delete(
  "/:productId",
  authorize({}),
  validateSchema(removeFromWishlistSchema),
  wishlistController.removeFromWishlist
);

router.delete(
  "/clear",
  authorize({}),
  validateSchema(clearWishlistSchema),
  wishlistController.clearWishlist
);

export default router;
