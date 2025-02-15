import { Request, Response } from "express";
import Review from "../mongoose/schemas/review";
import Reservation from "../mongoose/schemas/cart";
import Rent from "../mongoose/schemas/products";
import products from "../mongoose/schemas/products";

const getAll = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({}).populate("author").populate("rent");

    res.status(200).json({
      message: "Reviews fetched successfully",
      items: reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const { productId, content, rating } = req.matchedData;

    const product = await products.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const review = await Review.create({
      author: user!._id,
      product: productId,
      content,
      rating,
    });

    product.reviews.push(review._id); 
    await product.save();

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};




// const changeStatus = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.matchedData;

//     const review = await Review.findById(id);

//     if (!review) {
//       res.status(404).json({ message: "Review not found" });
//       return;
//     }

//     review.status = status;
//     await review.save();

//     res.status(200).json({
//       message: "Review status updated successfully",
//       review,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    
    const reviews = await Review.find({
      product: productId,
    }).populate("author");

    res.status(200).json({
      message: "Reviews fetched successfully",
      items: reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getAll,
  create,
  // changeStatus,
  getByProductId,
};
