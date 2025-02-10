import { Request, Response } from "express";
import Capacity from "../mongoose/schemas/capacity";

const getAll = async (_req: Request, res: Response) => {
  const data = await Capacity.find();

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

  const capacity = new Capacity({ name });

  await capacity.save();

  res.status(201).json({
    message: "Capacity created successfully",
    item: capacity,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const capacity = await Capacity.findById(id);

  if (!capacity) {
    res.status(404).json({
      message: "Capacity not found",
    });
    return;
  }

  capacity.name = name;

  await capacity.save();

  res.json({
    message: "Capacity updated successfully",
    item: capacity,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const capacity = await Capacity.findById(id);

  if (!capacity) {
    res.status(404).json({
      message: "Capacity not found",
    });
    return;
  }

  await capacity.deleteOne();

  res.json({
    message: "Capacity deleted successfully",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
