import { Router } from "express";
import graphicscardController from "../controllers/graphicscard";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { graphicscardSchema } from "../validation/graphicscard";

const router = Router();

router.get("/", graphicscardController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(graphicscardSchema),
  graphicscardController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(graphicscardSchema),
  graphicscardController.update
);

router.delete("/:id", authorize({ isAdmin: true }), graphicscardController.remove);

export default router;
