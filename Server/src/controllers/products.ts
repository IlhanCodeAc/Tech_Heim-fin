import { Request, Response } from "express";
import Product from "../mongoose/schemas/products";
import Category from "../mongoose/schemas/category";
import Review from "../mongoose/schemas/review";
import Brand from "../mongoose/schemas/brand";
import Display from "../mongoose/schemas/display";
import GraphicsCard from "../mongoose/schemas/graphicscard";
import Capacity from "../mongoose/schemas/capacity";
import Ram from "../mongoose/schemas/ram";
import Processor from "../mongoose/schemas/processor";
import mongoose from "mongoose";

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
      ram,
      display,
    } = req.matchedData;

    const filter: Record<string, any> = {};

    if (type === "recommended") {
      filter.showInRecommendation = true;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ];
    }

    const convertToObjectId = (id: any) =>
      mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;

    if (category) {
      const categoryList = Array.isArray(category) ? category : [category];
      filter.category = { $in: categoryList.map(convertToObjectId) };
    }

    if (capacity) {
      const capacityList = Array.isArray(capacity) ? capacity : [capacity];
      filter.capacity = { $in: capacityList.map(convertToObjectId) };
    }

    if (brand) {
      const brandList = Array.isArray(brand) ? brand : [brand];
      filter.brand = { $in: brandList.map(convertToObjectId) };
    }

    if (processor) {
      const processorList = Array.isArray(processor) ? processor : [processor];
      filter.processor = { $in: processorList.map(convertToObjectId) };
    }

    if (graphicscard) {
      const graphicsCardList = Array.isArray(graphicscard) ? graphicscard : [graphicscard];
      filter.graphicscard = { $in: graphicsCardList.map(convertToObjectId) };
    }

    if (ram) {
      const ramList = Array.isArray(ram) ? ram : [ram];
      filter.ram = { $in: ramList.map(convertToObjectId) };
    }

    if (display) {
      const displayList = Array.isArray(display) ? display : [display];
      filter.display = { $in: displayList.map(convertToObjectId) };
    }

    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = parseFloat(min_price as string);
      if (max_price) filter.price.$lte = parseFloat(max_price as string);
    }

    console.log("🔎 Received Filters:", req.matchedData);
    console.log("✅ MongoDB Query Filter:", JSON.stringify(filter, null, 2));

    const items = await Product.find(filter)
      .skip(+skip)
      .limit(+take)
      .populate(["category", "brand", "graphicscard", "processor", "capacity", "ram", "display"]);

    console.log("🔍 Fetched Products:", items.length);

    const total = await Product.countDocuments(filter);

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
    console.error("❌ Error in getAll:", err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};



const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate(["category", "brand", "graphicscard", "processor", "capacity"]);


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
      processorId,
      graphicscardId,
      brandId,
      capacityId,
      ramId,
      displayId,
      price,
      // currency,
      discount,
      showInRecommendation = false,
    } = req.matchedData;

    const category = await Category.findById(categoryId);
    const processor = await Processor.findById(processorId);
    const graphicscard = await GraphicsCard.findById(graphicscardId);
    const brand = await Brand.findById(brandId);
    const capacity = await Capacity.findById(capacityId);
    const ram = await Ram.findById(ramId);
    const display = await Display.findById(displayId);

    if (!category || !processor || !graphicscard || !brand || !capacity || !ram || !display) {
      res.status(404).json({
        message: "One or more referenced entities not found",
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
      ram,
      display,
      price,
      // currency,
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
