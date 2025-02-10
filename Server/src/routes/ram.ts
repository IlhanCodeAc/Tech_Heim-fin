import { Router } from "express";
import categoryController from "../controllers/category";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { ramSchema } from "../validation/ram";

const router = Router();

router.get("/", categoryController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(ramSchema),
  categoryController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(ramSchema),
  categoryController.update
);

router.delete("/:id", authorize({ isAdmin: true }), categoryController.remove);

export default router;
