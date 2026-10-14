import type { Request, Response } from "express";
import Stripe from "stripe";

import { env } from "../config/env.js";
import {
  handleCheckoutSessionCompleted,
  handleCheckoutSessionExpired,
} from "../services/stripe.service.js";

const stripe = new Stripe(env.stripeSecretKey);

export async function handleStripeWebhookController(
  req: Request,
  res: Response,
) {
  const signature = req.headers["stripe-signature"];

  if (!signature || typeof signature !== "string") {
    return res.status(400).json({
      success: false,
      message: "Missing Stripe signature",
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.stripeWebhookSecret,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid Stripe webhook signature",
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionExpired(session);
        break;
      }

      default:
        // Other Stripe events are intentionally ignored.
        break;
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);

    // Return a failure so Stripe can retry the event.
    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
}
