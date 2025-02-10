import { Request, Response } from "express";
import Ram from "../mongoose/schemas/ram";

const getAll = async (_req: Request, res: Response) => {
  const data = await Ram.find();

  const items = data.map((item) => ({
    _id: item._id,
    name: item.name,
    count: item.products.length,
    createdAt: item.createdAt,
  }));

  res.json({
    message: "Rams retrieved successfully",
    items,
  });
};

const create = async (req: Request, res: Response) => {
  const { name } = req.matchedData;

  const ram = new Ram({ name });

  await ram.save();

  res.status(201).json({
    message: "Ram created successfully",
    item: ram,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const ram = await Ram.findById(id);

  if (!ram) {
    res.status(404).json({
      message: "Ram not found",
    });
    return;
  }

  ram.name = name;

  await ram.save();

  res.json({
    message: "Ram updated successfully",
    item: ram,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const ram = await Ram.findById(id);

  if (!ram) {
    res.status(404).json({
      message: "Ram not found",
    });
    return;
  }

  await ram.deleteOne();

  res.json({
    message: "Ram deleted successfully",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
