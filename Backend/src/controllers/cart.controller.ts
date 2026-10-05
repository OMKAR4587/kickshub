import type { Request, Response } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../services/cart.service.js";

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

export async function getCartController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);
    const cart = await getCart(userId);

    return res.json({
      success: true,
      cart: cart ?? { items: [] },
    });
  } catch (error) {
    console.error("Failed to fetch cart:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
}

export async function addToCartController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);

    const { productId, size, quantity } = req.body;

    if (
      typeof productId !== "string" ||
      typeof size !== "number" ||
      typeof quantity !== "number" ||
      size <= 0 ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart item",
      });
    }

    const item = await addToCart(
      userId,
      productId,
      size,
      quantity,
    );

    return res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Failed to add to cart:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
    });
  }
}

export async function updateCartItemController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (
      typeof itemId !== "string" ||
      typeof quantity !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart item",
      });
    }

    const item = await updateCartItem(
      userId,
      itemId,
      quantity,
    );

    return res.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Failed to update cart item:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update cart item",
    });
  }
}

export async function removeFromCartController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);
    const { itemId } = req.params;

    if (typeof itemId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid cart item",
      });
    }

    await removeFromCart(userId, itemId);

    return res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error("Failed to remove cart item:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
    });
  }
}

export async function clearCartController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);

    await clearCart(userId);

    return res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    console.error("Failed to clear cart:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
}