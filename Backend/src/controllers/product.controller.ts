import type { Request, Response } from "express";
import {
  findAllProducts,
  findProductById,
} from "../services/product.service.js";

export function getProducts(_req: Request, res: Response) {
  res.json({
    success: true,
    count: findAllProducts().length,
    products: findAllProducts(),
  });
}

export function getProductById(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  const product = findProductById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    product,
  });
}
