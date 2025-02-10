import { Request, Response } from "express";
import Processor from "../mongoose/schemas/processor";

const getAll = async (_req: Request, res: Response) => {
  const data = await Processor.find();

  const items = data.map((item) => ({
    _id: item._id,
    name: item.name,
    count: item.products.length,
    createdAt: item.createdAt,
  }));

  res.json({
    message: "Categories retrieved successfully",
    items,
  });
};

const create = async (req: Request, res: Response) => {
  const { name } = req.matchedData;

  const processor = new Processor({ name });

  await processor.save();

  res.status(201).json({
    message: "Processor created successfully",
    item: processor,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const processor = await Processor.findById(id);

  if (!processor) {
    res.status(404).json({
      message: "Category not found",
    });
    return;
  }

  processor.name = name;

  await processor.save();

  res.json({
    message: "Processor updated successfully",
    item: processor,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const processor = await Processor.findById(id);

  if (!processor) {
    res.status(404).json({
      message: "Category not found",
    });
    return;
  }

  await processor.deleteOne();

  res.json({
    message: "processor deleted successfully",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
