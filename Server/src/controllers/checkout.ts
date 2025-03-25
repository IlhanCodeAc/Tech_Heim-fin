// controllers/checkout.ts
import { Request, Response, NextFunction } from "express";
import Order from "../mongoose/schemas/order";
import Cart from "../mongoose/schemas/cart";

const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const cart = await Cart.findOne({ user: user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    const order = new Order({
      user: user._id,
      items: cart.items,
      total: cart.total,
      status: "pending",
      paymentMethod: req.body.paymentMethod,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: user._id });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export default {
  createCheckoutSession,
  updateOrderStatus,
  deleteOrder,
};