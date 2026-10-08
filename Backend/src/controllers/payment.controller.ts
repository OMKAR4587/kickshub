import type { Request, Response } from "express";

import { createCheckoutSession } from "../services/payment.service.js";

type AuthenticatedRequest = Request & {
  user?: {
    userId: string;
    email: string;
  };
};

export async function createCheckoutSessionController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const session = await createCheckoutSession(req.user.userId);

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Failed to create checkout session:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create checkout session";

    if (message === "Cart is empty") {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create checkout session",
    });
  }
}