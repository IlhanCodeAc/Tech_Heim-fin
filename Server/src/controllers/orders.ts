import { Request, Response } from "express";
import Order from "../mongoose/schemas/order";
import mongoose from "mongoose";

export const createOrder = async (req: Request, res: Response) => {
    try {
      const { userId, items, total, currency, paymentMethodId, paymentDetails } = req.body;
  
      console.log("Request body:", req.body); 
  
      if (!userId || !items || !total || !currency) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const order = new Order({
        user: userId,
        items,
        total,
        currency,
        status: "pending",
      });
  
      await order.save();
  
      res.status(201).json({
        message: "Order created successfully",
        orderId: order._id,
      });
    } catch (error) {
      console.error("Error creating order:", error); 
      res.status(500).json({ message: "Error creating order" });
    }
  };
  
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("user", "username email");  
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user", "username email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; 

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
};

export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.product"); 

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ message: "Error fetching order items" });
  }
};

