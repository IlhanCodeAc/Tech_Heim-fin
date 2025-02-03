import { Router } from "express";
import conversationController from "../controllers/conversation";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { conversationCreateSchema } from "../validation/conversation";

const router = Router();

router.get("/", authorize({ isAdmin: true }), conversationController.getAll);

router.get(
  "/:id",
  authorize({ isAdmin: true }),
  conversationController.getById
);

router.get("/user/:userId", conversationController.getByUserId);

router.post(
  "/",
  validateSchema(conversationCreateSchema),
  conversationController.create
);

export default router;
