import { Router } from "express";
import brandController from "../controllers/brand";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { brandSchema } from "../validation/brand";

const router = Router();

router.get("/", brandController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(brandSchema),
  brandController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(brandSchema),
  brandController.update
);

router.delete("/:id", authorize({ isAdmin: true }), brandController.remove);

export default router;
