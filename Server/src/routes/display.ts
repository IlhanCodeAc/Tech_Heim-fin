import { Router } from "express";
import displayController from "../controllers/display";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { displaySchema } from "../validation/display";

const router = Router();

router.get("/", displayController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(displaySchema),
  displayController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(displaySchema),
  displayController.update
);

router.delete("/:id", authorize({ isAdmin: true }), displayController.remove);

export default router;
