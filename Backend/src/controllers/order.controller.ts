import type { Request, Response } from "express";
import { createOrder,getOrders } from "../services/order.service.js";

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

export async function createOrderController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);

    const order = await createOrder(userId);

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Failed to create order:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create order";

    if (message === "Cart is empty") {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
}

export async function getOrdersController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = getUserId(req);

    const orders = await getOrders(userId);

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
}