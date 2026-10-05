import type { Request, Response } from "express";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlist.service.js";

type AuthenticatedRequest = Request & {
  user?: {
    userId: string;
    email: string;
  };
};

function getUserId(req: AuthenticatedRequest) {
  if (!req.user?.userId) {
    throw new Error("Unauthorized");
  }

  return req.user.userId;
}

export async function getWishlistController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);

    const wishlist = await getWishlist(userId);

    return res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
}

export async function addToWishlistController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);
    const { productId } = req.body;

    if (typeof productId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const item = await addToWishlist(
      userId,
      productId,
    );

    return res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Failed to add wishlist item:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add item to wishlist",
    });
  }
}

export async function removeFromWishlistController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);
    const { productId } = req.params;

    if (typeof productId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    await removeFromWishlist(
      userId,
      productId,
    );

    return res.json({
      success: true,
      message: "Item removed from wishlist",
    });
  } catch (error) {
    console.error(
      "Failed to remove wishlist item:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to remove item from wishlist",
    });
  }
}