import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import Wishlist from "../mongoose/schemas/wishlist";
import Product from "../mongoose/schemas/products";

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const wishlist = await Wishlist.findOne({ user: user._id }).populate("items.product");

    if (!wishlist) {
      res.json({ message: "Wishlist is empty", items: [] });
      return;
    }

    res.json({
      message: "Wishlist fetched successfully",
      items: wishlist.items,
    });
  } catch (err) {
    next(err);
  }
};

const addToWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    let wishlist = await Wishlist.findOne({ user: user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: user._id, items: [] });
    }

    const existingItem = wishlist.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      res.status(400).json({ message: "Product already in wishlist" });
      return;
    }

    wishlist.items.push({ product: new Types.ObjectId(productId) });
    await wishlist.save();
    res.json({ message: "Product added to wishlist successfully", wishlist });
  } catch (err) {
    next(err);
  }
};

const removeFromWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    const wishlist = await Wishlist.findOne({ user: user._id });
    if (!wishlist) {
      res.status(404).json({ message: "Wishlist not found" });
      return;
    }

    const itemIndex = wishlist.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex === -1) {
      res.status(404).json({ message: "Product not found in wishlist" });
      return;
    }

    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();
    res.json({ message: "Product removed from wishlist successfully", wishlist });
  } catch (err) {
    next(err);
  }
};

const clearWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await Wishlist.findOneAndDelete({ user: user._id });
    res.json({ message: "Wishlist cleared successfully" });
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
