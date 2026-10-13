import Stripe from "stripe";

import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

const stripe = new Stripe(env.stripeSecretKey);

export async function createCheckoutSession(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const items = cart.items;

  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      status: "PENDING",
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price,
        })),
      },
    },
  });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
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
      })),
      success_url: `${env.clientUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${env.clientUrl}/checkout?payment=cancelled`,
      customer_email: user?.email,
      metadata: {
        orderId: order.id,
        userId,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return session;
  } catch (error) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });

    throw error;
  }
}
