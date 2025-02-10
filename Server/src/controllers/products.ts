import { Request, Response } from "express";
import Product from "../mongoose/schemas/products";
import Category from "../mongoose/schemas/category";
import Review from "../mongoose/schemas/review";

const getAll = async (req: Request, res: Response) => {
  try {
    const {
      type,
      take = 10,
      skip = 0,
      search,
      category,
      capacity,
      min_price,
      max_price,
      brand,
      processor,
      graphicscard,
    } = req.matchedData;

    const filter: Record<string, any> = {
      $and: [],
      $or: [],
    };

    // Filter by 'recommended' products
    if (type === "recommended") {
      filter.showInRecommendation = true;
    }

    // Search by name or description
    if (search) {
      filter.$or.push(
        { name: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } }
      );
    }

    // Filter by capacity
    if (capacity) {
      const capacityList = typeof capacity === "string" ? [capacity] : capacity;
      filter.capacity = { $in: capacityList };
    }

    // Filter by category
    if (category) {
      const categoryList = typeof category === "string" ? [category] : category;
      filter.category = { $in: categoryList };
    }

    // Filter by min_price and max_price
    if (min_price) {
      filter.$and.push({ price: { $gte: +min_price } });
    }

    if (max_price) {
      filter.$and.push({ price: { $lte: +max_price } });
    }

    // Filter by brand
    if (brand) {
      const brandList = typeof brand === "string" ? [brand] : brand;
      filter.brand = { $in: brandList };
    }

    // Filter by processor
    if (processor) {
      const processorList = typeof processor === "string" ? [processor] : processor;
      filter.processor = { $in: processorList };
    }

    // Filter by graphics card
    if (graphicscard) {
      const graphicsCardList = typeof graphicscard === "string" ? [graphicscard] : graphicscard;
      filter.graphicscard = { $in: graphicsCardList };
    }

    const items = await Product.find(filter)
      .skip(+skip)
      .limit(+take)
      .populate(["category"]);

    const total = await Product.countDocuments(filter);

    // Update the images' URL
    items.forEach((item) => {
      item.images = item.images.map(
        (image) => `http://localhost:3000/public/product/${image}`
      );
    });

    res.json({
      message: "success",
      items,
      total,
      take: +take,
      skip: +skip,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};



const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate(["category"]);

    if (!product) {
      res.status(404).json({
        message: "Not Found",
      });
      return;
    }

    const reviews = await Review.find({
      product: id,
      status: "approved",
    }).populate("author", "name surname");

    product.images = product.images.map(
      (image) => `http://localhost:3000/public/product/${image}`
    );

    res.json({
      message: "success",
      item: {
        ...product.toObject(),
        reviews,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      categoryId,
      processor,
      graphicscard,
      brand,
      capacity,
      price,
      currency,
      discount,
      showInRecommendation = false,
    } = req.matchedData;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        message: "Category Not Found",
      });
      return;
    }

    const images = (req.files as any)?.map((file: any) => file.filename) || [];

    const product = new Product({
      name,
      description,
      category,
      processor,
      graphicscard,
      brand,
      capacity,
      price,
      currency,
      discount,
      images,
      showInRecommendation,
    });
    await product.save();

    category.products.push(product._id);
    await category.save();

    res.status(201).json({
      message: "success",
      item: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.matchedData;

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!product) {
      res.status(404).json({ message: "Not Found" });
      return;
    }

    res.json({
      message: "success",
      item: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        message: "Not Found",
      });
      return;
    }

    res.json({
      message: "success",
      item: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const productController = {
  getAll,
  getById,
  create,
  edit,
  remove,
};

export default productController;
