import { Router } from "express";
import processor from "../controllers/processor";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { processorSchema } from "../validation/processor";

const router = Router();

router.get("/", processor.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(processorSchema),
  processor.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(processorSchema),
  processor.update
);

router.delete("/:id", authorize({ isAdmin: true }), processor.remove);

export default router;
