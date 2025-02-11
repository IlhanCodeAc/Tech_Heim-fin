import { Request, Response } from "express";
import Display from "../mongoose/schemas/display";

const getAll = async (_req: Request, res: Response) => {
  const data = await Display.find();

  const items = data.map((item) => ({
    _id: item._id,
    name: item.name,
    count: item.products.length,
    createdAt: item.createdAt,
  }));

  res.json({
    message: "Display retrieved successfully",
    items,
  });
};

const create = async (req: Request, res: Response) => {
  const { name } = req.matchedData;

  const display = new Display({ name });

  await display.save();

  res.status(201).json({
    message: "Display created successfully",
    item: display,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const display = await Display.findById(id);

  if (!display) {
    res.status(404).json({
      message: "Display not found",
    });
    return;
  }

  display.name = name;

  await display.save();

  res.json({
    message: "Display updated successfully",
    item: display,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const display = await Display.findById(id);

  if (!display) {
    res.status(404).json({
      message: "Display not found",
    });
    return;
  }

  await display.deleteOne();

  res.json({
    message: "Display deleted successfully",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
