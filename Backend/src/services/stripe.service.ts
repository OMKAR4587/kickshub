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
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.stripeSessionId !== session.id) {
      throw new Error("Stripe session does not match order");
    }

    // A repeated webhook must not process the same order twice.
    if (order.status === "PAID") {
      return order;
    }

    if (order.status !== "PENDING") {
      throw new Error("Order is not pending payment");
    }

    // Claim the pending order so concurrent webhook deliveries
    // cannot both perform cart cleanup.
    const updated = await tx.order.updateMany({
      where: {
        id: order.id,
        status: "PENDING",
        stripeSessionId: session.id,
      },
      data: {
        status: "PAID",
      },
    });

    if (updated.count === 0) {
      throw new Error("Order has already been processed");
    }

    const cart = await tx.cart.findUnique({
      where: {
        userId: order.userId,
      },
      select: {
        id: true,
      },
    });

    if (cart) {
      for (const item of order.items) {
        await tx.cartItem.deleteMany({
          where: {
            cartId: cart.id,
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          },
        });
      }
    }

    return tx.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: true,
      },
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
