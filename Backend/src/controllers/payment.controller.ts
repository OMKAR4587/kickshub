import type { Request, Response } from "express";
import Stripe from "stripe";

import { createCheckoutSession } from "../services/payment.service.js";
import { handleCheckoutSessionCompleted } from "../services/stripe.service.js";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

const stripe = new Stripe(env.stripeSecretKey);

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
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const session = await createCheckoutSession(userId);

    if (!session.url) {
      return res.status(500).json({
        success: false,
        message: "Stripe checkout URL was not created",
      });
    }

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

export async function verifyCheckoutSessionController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const userId = req.user?.userId;
    const sessionId = req.body?.sessionId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      typeof sessionId !== "string" ||
      !sessionId.startsWith("cs_")
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid Stripe session ID is required",
      });
    }

    // Retrieve the actual payment status from Stripe.
    const session =
      await stripe.checkout.sessions.retrieve(sessionId);

    // Ensure the checkout belongs to the authenticated user.
    if (session.metadata?.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "This payment session does not belong to you",
      });
    }

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return res.status(404).json({
        success: false,
        message: "Order reference not found",
      });
    }

    // Verify the session is linked to this user's order.
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
        stripeSessionId: session.id,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Never mark an order as paid unless Stripe confirms payment.
    if (session.payment_status !== "paid") {
      return res.status(409).json({
        success: false,
        message: "Payment is not confirmed yet",
      });
    }

    // Reconcile the order and clear purchased cart items.
    // This also handles a delayed Stripe webhook.
    await handleCheckoutSessionCompleted(session);

    // Return the verified order with its product details.
    const verifiedOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
        stripeSessionId: session.id,
        status: "PAID",
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!verifiedOrder) {
      return res.status(409).json({
        success: false,
        message: "Payment is still being processed",
      });
    }

    return res.status(200).json({
      success: true,
      order: verifiedOrder,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
}
