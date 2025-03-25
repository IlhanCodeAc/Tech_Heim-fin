import { Router } from "express";
import paymentController from "../controllers/payment";
import { authorize } from "../middlewares/user";

const router = Router();

router.post("/", authorize({}), paymentController.addPaymentMethod);
router.get("/", authorize({}), paymentController.getPaymentMethods);
router.delete("/:paymentId", authorize({}), paymentController.removePaymentMethod);

export default router;
