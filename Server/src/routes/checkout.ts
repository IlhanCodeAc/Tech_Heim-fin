// routes/checkout.ts
import { Router } from "express";
import { authorize } from "../middlewares/user";
import checkoutController from "../controllers/checkout";

const router = Router();

router.post("/", authorize({}), checkoutController.createCheckoutSession);
router.put("/:orderId", authorize({}), checkoutController.updateOrderStatus);
router.delete("/:orderId", authorize({}), checkoutController.deleteOrder);

export default router;
