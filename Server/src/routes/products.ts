import { Router } from "express";
import rentController from "../controllers/products";
import validateSchema from "../middlewares/validator";
import {
  createRentSchema,
  editRentSchema,
  getAllRentSchema,
} from "../validation/products";
import { authorize } from "../middlewares/user";
import upload from "../middlewares/multer";
import productController from "../controllers/products";

const router = Router();

router.get("/", validateSchema(getAllRentSchema), rentController.getAll);

router.get("/:id", productController.getById);

router.post(
  "/",
  authorize({ isAdmin: true }),
  upload.array("images", 8),
  validateSchema(createRentSchema),
  productController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  upload.array("images", 8),
  validateSchema(editRentSchema),
  productController.edit
);

router.delete("/:id", authorize({ isAdmin: true }), productController.remove);

export default router;
