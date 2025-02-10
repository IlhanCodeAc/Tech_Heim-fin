import { Request, Response } from "express";
import Graphicscard from "../mongoose/schemas/graphicscard";

const getAll = async (_req: Request, res: Response) => {
  const data = await Graphicscard.find();

  const items = data.map((item) => ({
    _id: item._id,
    name: item.name,
    count: item.products.length,
    createdAt: item.createdAt,
  }));

  res.json({
    message: "Graphics-card retrieved successfully",
    items,
  });
};

const create = async (req: Request, res: Response) => {
  const { name } = req.matchedData;

  const graphicscard = new Graphicscard({ name });

  await graphicscard.save();

  res.status(201).json({
    message: "Graphics-card created successfully",
    item: graphicscard,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const graphicscard = await Graphicscard.findById(id);

  if (!graphicscard) {
    res.status(404).json({
      message: "Graphics-card not found",
    });
    return;
  }

  graphicscard.name = name;

  await graphicscard.save();

  res.json({
    message: "Graphics-card updated successfully",
    item: graphicscard,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const graphicscard = await Graphicscard.findById(id);

  if (!graphicscard) {
    res.status(404).json({
      message: "Category not found",
    });
    return;
  }

  await graphicscard.deleteOne();

  res.json({
    message: "Graphics-card deleted successfully",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
