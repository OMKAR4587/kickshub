import type { Request, Response } from "express";
import Stripe from "stripe";

import {
  handleCheckoutSessionCompleted,
} from "../services/stripe.service.js";

import { env } from "../config/env.js";

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
    console.error(
      "Stripe webhook signature verification failed:",
      error,
    );

    return res.status(400).json({
      success: false,
      message: "Invalid Stripe signature",
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      await handleCheckoutSessionCompleted(session);
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Failed to process Stripe webhook:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
}