import Stripe from "stripe";

import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

const stripe = new Stripe(env.stripeSecretKey);

export async function createCheckoutSession(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    cart.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
          description: `Size: ${item.size}`,
          images: item.product.image ? [item.product.image] : undefined,
        },
        unit_amount: Math.round(Number(item.product.price) * 100),
      },
    }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${env.clientUrl}/checkout?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.clientUrl}/checkout?payment=cancelled`,
    customer_email: (
      await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      })
    )?.email,
    metadata: {
      userId,
    },
  });

  return session;
}