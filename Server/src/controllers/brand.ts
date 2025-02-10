import { Request, Response } from "express";
import Brand from "../mongoose/schemas/brand";

const getAll = async (_req: Request, res: Response) => {
  const data = await Brand.find();

  const items = data.map((item) => ({
    _id: item._id,
    name: item.name,
    count: item.products.length,
    createdAt: item.createdAt,
  }));

  res.json({
    message: "Brand retrieved successfully",
    items,
  });
};

const create = async (req: Request, res: Response) => {
  const { name } = req.matchedData;

  const brand = new Brand({ name });

  await brand.save();

  res.status(201).json({
    message: "Brand created successfully",
    item: brand,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    res.status(404).json({
      message: "Brand not found",
    });
    return;
  }

  brand.name = name;

  await brand.save();

  res.json({
    message: "Brand updated successfully",
    item: brand,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    res.status(404).json({
      message: "Brand not found",
    });
    return;
  }

  await brand.deleteOne();

  res.json({
    message: "Brand deleted successfully",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
