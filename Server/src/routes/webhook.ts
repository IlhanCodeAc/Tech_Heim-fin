import express, { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe("sk_test_51Q4m4bG7y3d14HH5NTYI4YNO7RMVNxO7EBhmE1JgRi0nXkAqCgjLC3ucq6grZx547oxfMAz6bdcJ0Bo6YazBfMkm00udpqYhlV" as string, {
    apiVersion: "2025-01-27.acacia",
});
router.post("/", express.raw({ type: "application/json" }), async (req: Request, res: Response): Promise<void> => {
    try {
        const sig = req.headers["stripe-signature"];
        if (!sig) {
            res.status(400).send("Missing stripe signature");
            return;
        }

        const event = await stripe.webhooks.constructEvent(req.body, sig,"whsec_5xT0kilFrana93m379Rkre5B9mVsM2bg"!);

        console.log("Received event:", event);

        res.status(200).json({ received: true });
    } catch (error: any) {
        console.error("Webhook error:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});


export default router;