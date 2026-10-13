import Stripe from "stripe";

import { prisma } from "../lib/prisma.js";

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status !== "paid") {
    return;
  }

  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new Error("Stripe session is missing orderId metadata");
  }

  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.stripeSessionId !== session.id) {
      throw new Error("Stripe session does not match order");
    }

    // A retry for an already-paid order is safe.
    if (order.status === "PAID") {
      return order;
    }

    if (order.status !== "PENDING") {
      throw new Error("Order is not pending payment");
    }

    return tx.order.update({
      where: { id: order.id },
      data: { status: "PAID" },
    });
  });
}

export async function handleCheckoutSessionExpired(
  session: Stripe.Checkout.Session,
) {
  return prisma.order.updateMany({
    where: {
      stripeSessionId: session.id,
      status: "PENDING",
    },
    data: {
      status: "CANCELLED",
    },
  });
}
