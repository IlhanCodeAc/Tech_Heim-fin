import express, { Request, Response } from "express";
import { createOrder, getAllOrders, getUserOrders, updateOrderStatus, deleteOrder, getOrderItems } from "../controllers/orders";

const router = express.Router();

router.post("/orders", async (req: Request, res: Response) => {
  try {
    await createOrder(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
});  

router.get("/orders", async (req: Request, res: Response) => {
  try {
    await getAllOrders(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});  

router.get("/orders/user/:userId", async (req: Request, res: Response) => {
  try {
    await getUserOrders(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
}); 

router.put("/orders/:orderId/status", async (req: Request, res: Response) => {
  try {
    await updateOrderStatus(req, res);  
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
});  

router.delete("/orders/:orderId", async (req: Request, res: Response) => {
  try {
    await deleteOrder(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
});  

router.get("/orders/:orderId/items", async (req: Request, res: Response) => {
  try {
    await getOrderItems(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching order items" });
  }
});

export default router;
