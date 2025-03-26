import { Request, Response, NextFunction } from "express";
import Cart from "../mongoose/schemas/cart";
import mongoose, { Types } from "mongoose";
import products from "../mongoose/schemas/products";

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const cart = await Cart.findOne({ user: user._id }).populate("items.product");

    if (!cart) {
      res.json({ message: "Cart is empty", items: [] });
      return;
    }

    res.json({
      message: "Cart fetched successfully",
      items: cart.items,
      total: cart.total,
    });
  } catch (err) {
    next(err); 
  }
};

const addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await products.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      cart = new Cart({ user: user._id, items: [] });
    }

    const existingItem = cart.items.find((item) => 
      item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: new Types.ObjectId(productId), quantity, price: product.price, discount: product.discount });
    }

    await cart.save();
    res.json({ message: "Product added to cart successfully", cart });
  } catch (err) {
    next(err); 
  }
};

const removeFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.params;
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product && item.product.toString() === productId
    );

    if (itemIndex === -1) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }

    cart.items.splice(itemIndex, 1);

    cart.total = cart.items.reduce(
      (acc, item) => acc + item.quantity * (item.price - (item.discount || 0)),
      0
    );

    await cart.save();
    res.json({ message: "Product removed from cart successfully", cart });
  } catch (err) {
    next(err);
  }
};

const clearCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.items.splice(0, cart.items.length); // Correctly clears the DocumentArray
    cart.total = 0;

    await cart.save();
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    next(err);
  }
};


export default {
  getAll,
  addToCart,
  removeFromCart,
  clearCart,
};
