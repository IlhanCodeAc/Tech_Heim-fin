import { Router } from "express";
import ramController from "../controllers/ram";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { ramSchema } from "../validation/ram";

const router = Router();

router.get("/", ramController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(ramSchema),
  ramController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(ramSchema),
  ramController.update
);

router.delete("/:id", authorize({ isAdmin: true }), ramController.remove);

export default router;
