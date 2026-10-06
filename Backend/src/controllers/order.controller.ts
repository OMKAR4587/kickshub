import type { Request, Response } from "express";
import { createOrder } from "../services/order.service.js";

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