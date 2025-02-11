import { Router } from "express";
import capacityController from "../controllers/capacity";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { capacitySchema } from "../validation/capacity";

const router = Router();

router.get("/", capacityController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(capacitySchema),
  capacityController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(capacitySchema),
  capacityController.update
);

router.delete("/:id", authorize({ isAdmin: true }), capacityController.remove);

export default router;
